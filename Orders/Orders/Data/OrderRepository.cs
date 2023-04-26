using Microsoft.EntityFrameworkCore;
using Orders.Models;

namespace Orders.Data
{
    public class OrderRepository : IOrderRepository
    {
        private readonly OrdersContext db;

        public OrderRepository(OrdersContext context)
        {
            db = context;
        }
        public Order Add(Order entity)
        {
            var newOrder = db.Orders.Add(entity).Entity;
            db.SaveChanges();
            return newOrder;
        }

        public Order Get(int id)
        {
            return db.Orders.Include(o => o.OrderLines).FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Order> GetAll()
        {
            return db.Orders.Include(o => o.OrderLines).ToList();
        }
    }
}
