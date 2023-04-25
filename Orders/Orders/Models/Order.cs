namespace Orders.Models
{
    public class Order
    {
        public int Id { get; set; }
        public IList<OrderLine> OrderLines { get; set; }
    }
}
