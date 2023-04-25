using Orders.Models;

namespace Orders.Data
{
    public class DbInitializer : IDbInitializer
    {
        public void Initialize(OrdersContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            // Look for any Orders
            if (context.Orders.Any())
            {
                return;   // DB has been seeded
            }

            List<Order> orders = new List<Order>
            {
                new Order {
                    OrderLines = new List<OrderLine>{
                        new OrderLine { ProductId = 1, Quantity = 2 }
                    } 
                },
                new Order {
                    OrderLines = new List<OrderLine>{
                        new OrderLine { ProductId = 2, Quantity = 4 },
                        new OrderLine { ProductId = 2, Quantity = 4 }
                    }
                }
            };

            context.Orders.AddRange(orders);
            context.SaveChanges();
        }
    }
}
