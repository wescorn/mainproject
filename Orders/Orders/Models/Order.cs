using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Orders.Models
{
    [Table("orders")]
    public class Order
    {
        public int id { get; set; }
        public string status { get; set; }
        public IList<OrderLine>? order_lines { get; set; }
    }

    [Table("order_lines")]
    public class OrderLine
    {
        public int id { get; set; }
        public int order_id { get; set; }
        public int product_id { get; set; }
        public int quantity { get; set; }
    }
}
