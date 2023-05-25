using Newtonsoft.Json;
using Orders.Models;
using RabbitMQ.Client;
using System.Text;

namespace Orders.Infrastructure
{
    public class MessagePublisher : IMessagePublisher
    {
        private const string UName = "guest";
        private const string PWD = "guest";
        private const string HName = "rabbitmq";

        /*
         * Publish Order Status Changed to change product stocks
         */
        public void OrderStatusChanged(OrderDto order)
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
            var json = JsonConvert.SerializeObject(order);
            byte[] messagebuffer = Encoding.UTF8.GetBytes(json);
            model.BasicPublish("OrderExchange", "changed", properties, messagebuffer);
        }
    }
}
