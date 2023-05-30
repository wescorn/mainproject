using Orders.Models;

namespace Orders.Data
{
    public class DbInitializer : IDbInitializer
    {
        public void Initialize(OrdersContext context)
        {
            //context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            // Look for any Orders
            if (context.Orders.Any())
            {
                return;   // DB has been seeded
            }

            List<Order> orders = new List<Order>
            {
                new Order {
                    status = "CREATED",
                    order_lines = new List<OrderLine>{
                        new OrderLine { product_id = 1, quantity = 2 } }
                },
                new Order {
                    status = "CREATED",
                    order_lines = new List<OrderLine>{
                        new OrderLine { product_id = 2, quantity = 3 } }
                }
            };

            context.Orders.AddRange(orders);
            context.SaveChanges();
        }
    }
}
