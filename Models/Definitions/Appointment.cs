
namespace SportBin.Models.Definitions
{
    public class Appointment : BaseEntity
    {
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string PhoneNumber { get; set; } = "";
        public DateTime Date { get; set; }
        public string Description { get; set; } = "";
        public bool? IsApproved { get; set; } = null;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
