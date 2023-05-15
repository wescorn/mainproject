using Microsoft.EntityFrameworkCore;
using Orders.Models;

namespace Orders.Data
{
    public class OrdersContext : DbContext
    {
        public OrdersContext(DbContextOptions<OrdersContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<Order>().ToTable("Orders");
        }

        public DbSet<Order> Orders { get; set; }
    }
}
