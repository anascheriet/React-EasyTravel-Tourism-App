using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class Article : Service
    {
        public string Body { get; set; }
        public string CreatorName { get; set; }

        [ForeignKey("Creator")]
        public int CreatorId { get; set; }
        public virtual AppUser Creator { get; set; }
    }
}