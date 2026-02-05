namespace Restore_BE.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public required string UserId { get; set; }
    }
}