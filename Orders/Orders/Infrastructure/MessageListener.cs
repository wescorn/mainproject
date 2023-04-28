using EasyNetQ;
using Orders.Data;
using Orders.Models;
using RabbitMQ.Client;
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

        public MessageListener(IServiceProvider provider, string connectionString, IModel channel)
        {
            this.provider = provider;
            this.connectionString = connectionString;
            _channel = channel;
        }


        public void Start()
        {
            /*
            using (bus = RabbitHutch.CreateBus(connectionString))
            {
                bus.PubSub.Subscribe<GetOrderMessage>("GIVE ME PDFS", HandleOrderPdfs, x => x.WithTopic("generate"));

                // Block the thread so that it will not exit and stop subscribing.
                lock (this)
                {
                    Monitor.Wait(this);
                }
            }
            */
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
