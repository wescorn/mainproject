using EasyNetQ;

namespace Orders.Infrastructure
{
    public class MessagePublisher : IMessagePublisher, IDisposable
    {
        IBus bus;

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
            

            //bus.PubSub.Publish(message, topic);
        }
    }
}
