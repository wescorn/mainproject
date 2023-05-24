using System;
using System.Collections.Generic;

namespace Orders.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public IList<OrderLine>? OrderLines { get; set; }
    }

    public class OrderLine
    {
        public int id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
