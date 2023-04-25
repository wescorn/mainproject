using Microsoft.EntityFrameworkCore;
using Orders.Models;

namespace Orders.Data
{
    public class OrdersContext : DbContext
    {
        public OrdersContext(DbContextOptions<OrdersContext> options) : base(options) { }

        public DbSet<Order> Orders { get; set; }
    }
}
