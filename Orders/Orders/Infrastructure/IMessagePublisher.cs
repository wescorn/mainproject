namespace Orders.Infrastructure
{
    public interface IMessagePublisher
    {
        void PublishOrder(int id, string topic);
    }
}
