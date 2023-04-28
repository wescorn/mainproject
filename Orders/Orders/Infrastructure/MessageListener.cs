using EasyNetQ;
using Newtonsoft.Json;
using Orders.Data;
using Orders.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Diagnostics;
using System.Text;

namespace Orders.Infrastructure
{
    public class MessageListener : DefaultBasicConsumer
    {
        IServiceProvider provider;
        private readonly IModel _channel;
        string connectionString;
        IBus bus;

        public MessageListener(IServiceProvider provider, string connectionString)
        {
            this.provider = provider;
            this.connectionString = connectionString;
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
