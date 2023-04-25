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

        public OrderController(IRepository<Order> repos, IMessagePublisher publisher)
        {
            repository = repos as IOrderRepository;
            messagePublisher = publisher;
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

            PdfGenerator pdfGenerator = new PdfGenerator(messagePublisher);
            pdfGenerator.Generate(item);

            return Ok();
        }

        public IEnumerable<Order> GetOrders()
        {
            return repository.GetAll();
        }    
    }
}
