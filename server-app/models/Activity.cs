using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class Activity : Service
    {
        public string Country { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public int Price {get;set;}
        public string Adress { get; set; }
        public string Package { get; set; }
        public string Duration { get; set; }
        public string CreatorName { get; set; }

        [ForeignKey("Creator")]
        public int CreatorId { get; set; }
        public virtual AppUser Creator { get; set; }
    }
}