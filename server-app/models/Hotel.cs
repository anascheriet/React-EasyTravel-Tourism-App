using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class Hotel : Service
    {
        public string Adress { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Price { get; set; }
        public string Package{ get; set; }
        public string CreatorName { get; set; }
        public string Rooms { get; set; }
        public string People { get; set; }

        [ForeignKey("Creator")]
        public int CreatorId { get; set; }
        public virtual AppUser Creator { get; set; }
    } 
}