using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class Restaurant : Service
    {
        public string Description { get; set; }
        public string Adress { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Meals { get; set; }
        public string PhoneNumber { get; set; }
        public string CreatorName { get; set; }

        [ForeignKey("Creator")]
        public int CreatorId { get; set; }
        public virtual AppUser Creator { get; set; }
    }
}