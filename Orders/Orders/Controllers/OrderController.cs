using Microsoft.AspNetCore.Mvc;
using Orders.Data;
using Orders.Infrastructure;
using Orders.Models;
using Serilog;
using System.Net.Security;

namespace Orders.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : Controller
    {
        IOrderRepository repository;
        IMessagePublisher messagePublisher;

        List<Order> all_orders;

        public OrderController(IRepository<Order> repos, IMessagePublisher publisher)
        {
            repository = repos as IOrderRepository;
            messagePublisher = publisher;

            //Just for testing
            all_orders = new List<Order>
            {
                new Order { id = 1, status = "transit", order_lines = new List<OrderLine> { new OrderLine { order_id = 1, product_id = 1, quantity = 2 } } },
                new Order { id = 2, status = "transit", order_lines = new List<OrderLine> { new OrderLine { order_id = 2, product_id = 2, quantity = 2 }, new OrderLine { order_id = 2, product_id = 3, quantity = 1 } } },
                new Order { id = 3, status = "transit", order_lines = new List<OrderLine> { new OrderLine { order_id = 3, product_id = 2, quantity = 4 }, new OrderLine { order_id = 3, product_id = 1, quantity = 2 } } },
                new Order { id = 4, status = "transit", order_lines = new List<OrderLine> { new OrderLine { order_id = 4, product_id = 3, quantity = 1 } } }
            };
        }

        //GET Order
        [HttpGet]
        public IEnumerable<Order> GetOrders()
        {
            return repository.GetAll();
        }

        // GET order/5
        [HttpGet("{id}", Name = "GetOrder")]
        public IActionResult GetOrder(int id)
        {
            Log.Debug("Received a PDF Generate message, directly in ordercontroller! (Machine: {Machine})", System.Environment.MachineName);
            Console.WriteLine("THIS SURE WORKS");
            var item = repository.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            PdfGenerator pdfGenerator = new PdfGenerator();
            pdfGenerator.Generate(item);

            return Ok();
        }

        [HttpPost]
        public Task<ActionResult<OrderDto>> PostOrder(OrderDto orderDto)
        {
            var order = new Order {
                //id = orderDto.id
            };

            var newOrder = repository.Add(order);

            return Task.FromResult<ActionResult<OrderDto>>(
                new CreatedAtActionResult(nameof(GetOrder), 
                                "Order", 
                                new { id = newOrder.id }, 
                                OrderToDTO(newOrder)));
        }
        
        private static OrderDto OrderToDTO(Order order) => new OrderDto
        {
            id = order.id,
            order_lines = order.order_lines?.Select(ol => new OrderLineDto
            {
                id = ol.id,
                order_id = ol.order_id,
                product_id = ol.product_id,
                quantity = ol.quantity
            }).ToList()
        };

        //Successfully generates a PDF in the pdf folder, mapped from the docker-container to ../pdf
        [HttpGet("test2")]
        public IActionResult test2()
        {
            int id = 2;
            Order order = all_orders.Find(o => o.id == id) ?? all_orders.First();
            PdfGenerator pdfGenerator = new PdfGenerator();
            pdfGenerator.Generate(order);
            return Json(all_orders);
        }
    }
}
