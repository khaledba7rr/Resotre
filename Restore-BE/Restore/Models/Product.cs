using Restore_BE.Models.Entities;

namespace Restore.Models
{
    public class Product : IEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required decimal Price { get; set; }
        public required string Type { get; set; }
        public required string Brand { get; set; }
        public int QuantityInStock { get; set; }
        public required string PictureUrl { get; set; }

    }
}
