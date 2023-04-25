using iTextSharp.text;
using iTextSharp.text.pdf;
using Orders.Models;
using System.CodeDom.Compiler;

namespace Orders.Infrastructure
{
    public class PdfGenerator
    {
        IMessagePublisher messagePublisher;

        public PdfGenerator(IMessagePublisher messagePublisher)
        {
            this.messagePublisher = messagePublisher;
        }

        public void Generate(Order order)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                Document document = new Document();
                PdfWriter write = PdfWriter.GetInstance(document, ms);
                document.Open();
                // insert data into document
                document.Close();

                byte[] pdfBytes = ms.ToArray();
            }
        }
    }
}
