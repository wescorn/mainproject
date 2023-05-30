using System;
using System.Collections.Generic;

namespace Orders.Models
{
    public class OrderDto
    {
        public int id { get; set; }
        public string status { get; set; }
        public List<OrderLineDto>? order_lines { get; set; }
    }

    public class OrderLineDto
    {
        public int id { get; set; }
        public int order_id { get; set; }
        public int product_id { get; set; }
        public int quantity { get; set; }
    }
}
