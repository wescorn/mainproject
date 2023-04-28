using EasyNetQ;
using RabbitMQ.Client;
using System.Text;

namespace Orders.Infrastructure
{
    public class MessagePublisher : IMessagePublisher, IDisposable
    {
        IBus bus;
        private const string UName = "guest";
        private const string PWD = "guest";
        private const string HName = "rabbitmq";

        public MessagePublisher(string connectionString)
        {
            bus = RabbitHutch.CreateBus(connectionString);
        }

        public void Dispose()
        {
            bus.Dispose();
        }

        public void PublishOrder(int id, string topic)
        {
            //Main entry point to the RabbitMQ .NET AMQP client
            var connectionFactory = new ConnectionFactory()
            {
                UserName = UName,
                Password = PWD,
                HostName = HName
            };
            var connection = connectionFactory.CreateConnection();
            var model = connection.CreateModel();
            var properties = model.CreateBasicProperties();
            properties.Persistent = false;
            byte[] messagebuffer = Encoding.Default.GetBytes("Direct Message");
            model.BasicPublish("request.exchange", "directexchange_key", properties, messagebuffer);
            

            //bus.PubSub.Publish(id, topic);
        }
    }
}
