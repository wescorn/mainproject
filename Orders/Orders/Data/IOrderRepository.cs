using Orders.Models;

namespace Orders.Data
{
    public interface IOrderRepository : IRepository<Order>
    {
        public void OrderStatusChange(OrderDto order);
    }
}
