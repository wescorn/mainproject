using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using Orders.Infrastructure;
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
            return db.Orders.Include(o => o.order_lines).FirstOrDefault(o => o.id == id);
        }

        public IEnumerable<Order> GetAll()
        {
            return db.Orders.Include(o => o.order_lines).ToList();
        }

        public void Edit(Order entity)
        {
            db.Entry(entity).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Remove(int id)
        {
            var order = db.Orders.FirstOrDefault(p => p.id == id);
            db.Orders.Remove(order);
            db.SaveChanges();
        }

        public void OrderStatusChange(OrderDto order)
        {
            var idParam = new MySqlParameter("@id", order.id);
            var statusParam = new MySqlParameter("@status", order.status);

            int rowsAffected = db.Database.ExecuteSqlRaw("CALL OrderStatusChange(@id, @status)", idParam, statusParam);

            if (rowsAffected > 0 && order.status == "delivered")
            {
                var messsagePublisher = new MessagePublisher();

                messsagePublisher.OrderStatusChanged(order);
            }
        }
    }
}
