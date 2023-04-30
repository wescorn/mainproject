using EasyNetQ;
using Newtonsoft.Json;
using OpenTracing;
using OpenTracing.Util;
using OpenTracing.Mock;
using OpenTracing.Noop;
using OpenTracing.Propagation;
using OpenTracing.Tag;
using Orders.Data;
using Orders.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Diagnostics;
using System.Text;
using zipkin4net;
using zipkin4net.Tracers.Zipkin;
using zipkin4net.Transport.Http;

namespace Orders.Infrastructure
{
    public class MessageListener : DefaultBasicConsumer
    {
        IServiceProvider provider;
        private readonly IModel _channel;
        string connectionString;
        IBus bus;
        OpenTracing.ITracer tracer;

        public MessageListener(IServiceProvider provider, string connectionString)
        {
            this.provider = provider;
            this.connectionString = connectionString;
            // Set up the tracer
            var tracer = GlobalTracer.Instance;

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
                channel.ExchangeDeclare("OrderExchange", ExchangeType.Topic, durable:true);
                channel.QueueDeclare(queue: "OrderPrintQueue",
                     durable: true,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null
                );

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, ea) =>
                {
                    var traceIdBytes = (byte[]) ea.BasicProperties.Headers["x-b3-traceid"];
                    var spanIdBytes = (byte[])ea.BasicProperties.Headers["x-b3-spanid"];
                    var traceId = Encoding.UTF8.GetString(traceIdBytes);
                    var spanId = Encoding.UTF8.GetString(spanIdBytes);

                    //var extractedContext = tracer.Extract(BuiltinFormats.HttpHeaders, ea.BasicProperties.Headers);

                    /*
                    tracer.BuildSpan("Pdf Generation");
                    var span = tracer.ActiveSpan;


                    IScope scope = tracer.ScopeManager.Active;
                    if (scope != null)
                    {
                        scope.Span.Log("...");
                    }
                    */

                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    var json = JsonConvert.DeserializeObject<GetOrderMessage>(message);
                    Console.WriteLine("Received message: {0}", json.Id);
                    HandleOrderPdfs(json);
                };
                channel.BasicConsume(queue: "OrderPrintQueue",
                                     autoAck: true,
                                     consumer: consumer);
                channel.QueueBind(queue: "OrderPrintQueue",
                exchange: "OrderExchange",
                routingKey: "generate");

                // Block the thread so that it will not exit and stop subscribing.
                lock (this)
                {
                    Monitor.Wait(this);
                }
            }
            
        }

        public override void HandleBasicDeliver(string consumerTag, ulong deliveryTag, bool redelivered, string exchange, string routingKey, IBasicProperties properties, ReadOnlyMemory<byte> body)
        {
            using (var scope = provider.CreateScope())
            {
                var services = scope.ServiceProvider;
                var orderRepos = services.GetService<IRepository<Order>>();

                var order = orderRepos.Get(int.Parse(Encoding.UTF8.GetString(body.ToArray())));

                PdfGenerator pdfGenerator = new PdfGenerator();
                pdfGenerator.Generate(order);
                _channel.BasicAck(deliveryTag, false);
            }
        }

        private void HandleOrderPdfs(GetOrderMessage message)
        {
            using (var scope = provider.CreateScope())
            {
                var services = scope.ServiceProvider;
                var orderRepos = services.GetService<IRepository<Order>>();

                var order = orderRepos.Get(message.Id);

                PdfGenerator pdfGenerator = new PdfGenerator();
                pdfGenerator.Generate(order);
                //_channel.BasicAck()
            }
        }
    }
}
