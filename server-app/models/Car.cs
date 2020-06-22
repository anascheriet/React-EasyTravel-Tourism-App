using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class Car : Service
    {
        public string Description { get; set; }
        public string Price { get; set; }
        public string Options { get; set; }
        public string Country  { get; set; }
        public string City { get; set; }
         public string CreatorName { get; set; }

        [ForeignKey("Creator")]
        public int CreatorId { get; set; }
        public virtual AppUser Creator { get; set; }


    }
}