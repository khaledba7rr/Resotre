using Restore.Models;

namespace Restore_BE.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public required Cart Cart { get; set; }
        public required Product Product { get; set; }

    }
}
