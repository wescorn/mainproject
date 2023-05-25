using Orders.Models;

namespace Orders.Infrastructure
{
    public interface IMessagePublisher
    {
        void OrderStatusChanged(OrderDto order);
    }
}
