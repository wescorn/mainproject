using Orders.Models;

namespace Orders.Data
{
    public interface IOrderRepository : IRepository<Order>
    {
        public OrderDto OrderStatusChange(OrderDto order);
    }
}
