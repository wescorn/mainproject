using EasyNetQ;
using Orders.Data;
using Orders.Models;
using RabbitMQ.Client;

namespace Orders.Infrastructure
{
    public class MessageListener
    {
        IServiceProvider provider;
        string connectionString;
        IBus bus;

        public MessageListener(IServiceProvider provider, string connectionString)
        {
            this.provider = provider;
            this.connectionString = connectionString;
        }


        public void Start()
        {
            using (bus = RabbitHutch.CreateBus(connectionString))
            {
                bus.PubSub.Subscribe<GetOrderMessage>("GIVE ME PDFS", HandleOrderPdfs);

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

                var order = orderRepos.Get(message.Id);

                PdfGenerator pdfGenerator = new PdfGenerator();
                pdfGenerator.Generate(order);
            }
        }
    }
}
