namespace Orders.Infrastructure
{
    public interface IMessagePublisher
    {
        void OrderStatusChanged(string topic);
    }
}
