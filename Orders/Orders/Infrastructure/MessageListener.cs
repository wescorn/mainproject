using EasyNetQ;
using Newtonsoft.Json;
using Orders.Data;
using Orders.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Diagnostics;
using System.Text;
using OpenTelemetry.Context.Propagation;
using Serilog;

namespace Orders.Infrastructure
{
    public class MessageListener
    {
        IServiceProvider provider;

        public MessageListener(IServiceProvider provider)
        {
            this.provider = provider;
        }


        public void Start()
        {
            ConnectionFactory connectionFactory = new ConnectionFactory
            {
                HostName = "rabbitmq",
                UserName = "guest",
                Password = "guest",
            };

            using ( var connection = connectionFactory.CreateConnection())
            using ( var channel = connection.CreateModel())
            {
                channel.ExchangeDeclare("OrderExchange", ExchangeType.Topic, durable: true);
                channel.QueueDeclare(queue: "OrderPrintQueue",
                     durable: true,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null
                );

                channel.QueueDeclare(queue: "OrderStatusChangedQueue",
                     durable: true,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null
                );

                channel.BasicQos(0, 1, false);

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, ea) =>
                {
                    if (ea.RoutingKey == "generate")
                    {
                        string traceId = Encoding.UTF8.GetString((byte[])ea.BasicProperties.Headers["x-b3-traceid"]);
                        string spanId = Encoding.UTF8.GetString((byte[])ea.BasicProperties.Headers["x-b3-spanid"]);
                        var parentContext = new ActivityContext(ActivityTraceId.CreateFromString(traceId), ActivitySpanId.CreateFromString(spanId), ActivityTraceFlags.Recorded, "", true);
                        using (var activity1 = Monitoring.ActivitySource.StartActivity("Received PDF Gen request in C# (MachineName: " + System.Environment.MachineName + ")", ActivityKind.Consumer, parentContext))
                        {
                            Log.Logger.Information("Received a PDF Generate message, and just started a new Span!(Machine: {Machine})", System.Environment.MachineName);
                            using (var activity2 = Monitoring.ActivitySource.StartActivity("Generating PDF!", ActivityKind.Consumer))
                            {
                                Log.Logger.Information("About to process the message and generate the PDF! (Machine: {Machine})", System.Environment.MachineName);
                                var body = ea.Body.ToArray();
                                var message = Encoding.UTF8.GetString(body);
                                var json = JsonConvert.DeserializeObject<GetOrderMessage>(message);
                                HandleOrderPdfs(json);
                            }
                        }
                    }
                    else if (ea.RoutingKey == "changed")
                    {
                        var body = ea.Body.ToArray();
                        var message = Encoding.UTF8.GetString(body);
                        var json = JsonConvert.DeserializeObject<OrderDto>(message);

                        provider.GetService<IOrderRepository>().OrderStatusChange(json);
                    }
                    else
                    {
                        // Code for handling other routing keys
                    }

                    channel.BasicAck(ea.DeliveryTag, false);
                };
                channel.BasicConsume(queue: "OrderPrintQueue",
                                     autoAck: false,
                                     consumer: consumer);
                channel.BasicConsume(queue: "OrderStatusChangedQueue",
                                     autoAck: false,
                                     consumer: consumer);

                channel.QueueBind(queue: "OrderPrintQueue",
                exchange: "OrderExchange",
                routingKey: "generate");
                channel.QueueBind(queue: "OrderStatusChangedQueue",
                exchange: "OrderExchange",
                routingKey: "changed");

                // Block the thread so that it will not exit and stop subscribing.
                lock (this)
                {
                    Monitor.Wait(this);
                }
            }
            
        }

        private void HandleOrderPdfs(GetOrderMessage message)
        {
            using (var scope = provider.CreateScope())
            {
                var services = scope.ServiceProvider;
                var orderRepos = services.GetService<IRepository<Order>>();

                var order = orderRepos.Get(message.id);

                PdfGenerator pdfGenerator = new PdfGenerator();
                pdfGenerator.Generate(order);
            }
        }
    }
}
