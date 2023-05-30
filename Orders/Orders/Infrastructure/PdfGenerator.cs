using Orders.Models;
using System.CodeDom.Compiler;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;

namespace Orders.Infrastructure
{
    public class PdfGenerator
    {
        /*
        IMessagePublisher messagePublisher;

        public PdfGenerator(IMessagePublisher messagePublisher)
        {
            this.messagePublisher = messagePublisher;
        }
        */
        public void Generate(Order order)
        {
            // Create a new PDF document
            PdfDocument pdf = new PdfDocument(new PdfWriter("/orders/pdfs/order_"+order.id+".pdf"));
            Document document = new Document(pdf);

            // Add some content to the PDF
            Paragraph heading = new Paragraph("Order ID: "+ (order.id));
            Paragraph status = new Paragraph("Order Status: " + (order.status));
            document.Add(heading);
            document.Add(status);

            foreach (OrderLine orderline in order.order_lines)
            {
                Paragraph p = new Paragraph("Product: " + orderline.product_id + "\t"+"Quantity: "+orderline.quantity);
                document.Add(p);
            }

            // Save the PDF file to disk
            pdf.Close();
        }
    }
}
