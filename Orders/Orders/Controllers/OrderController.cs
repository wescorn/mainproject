using Microsoft.AspNetCore.Mvc;
using Orders.Data;
using Orders.Infrastructure;
using Orders.Models;
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
                new Order { Id = 1, OrderLines = new List<OrderLine> { new OrderLine { OrderId = 1, ProductId = 1, Quantity = 2 } } },
                new Order { Id = 2, OrderLines = new List<OrderLine> { new OrderLine { OrderId = 2, ProductId = 2, Quantity = 2 }, new OrderLine { OrderId = 2, ProductId = 3, Quantity = 1 } } },
                new Order { Id = 3, OrderLines = new List<OrderLine> { new OrderLine { OrderId = 3, ProductId = 2, Quantity = 4 }, new OrderLine { OrderId = 3, ProductId = 1, Quantity = 2 } } },
                new Order { Id = 4, OrderLines = new List<OrderLine> { new OrderLine { OrderId = 4, ProductId = 3, Quantity = 1 } } }
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

            var item = repository.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            PdfGenerator pdfGenerator = new PdfGenerator();
            pdfGenerator.Generate(item);

            return Ok();
        }



        [HttpGet("test")]
        public IActionResult test()
        {
            return Json(all_orders);
        }

        //Successfully generates a PDF in the pdf folder, mapped from the docker-container to ../pdf
        [HttpGet("test2")]
        public IActionResult test2()
        {
            int id = 2;
            Order order = all_orders.Find(o => o.Id == id) ?? all_orders.First();
            PdfGenerator pdfGenerator = new PdfGenerator();
            pdfGenerator.Generate(order);
            return Json(all_orders);
        }
    }
}
