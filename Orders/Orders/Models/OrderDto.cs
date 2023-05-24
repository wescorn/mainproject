using System;
using System.Collections.Generic;

namespace Orders.Models
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public List<OrderLineDto>? OrderLines { get; set; }
    }

    public class OrderLineDto
    {
        public int id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
