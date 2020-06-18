using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class Flight : Service
    {
        public DateTime DepartingDate { get; set; }
        public DateTime? ArrivingDate { get; set; }
        public string DepartingTime { get; set; }
        public string ArrivingTime { get; set; }
        public string DepartingCountry { get; set; }
        public string DepartingCity { get; set; }
        public string ArrivingCountry { get; set; }
        public string ArrivingCity { get; set; }
        public string Type { get; set; }
        public int Price { get; set; }
        public string CreatorName { get; set; }

        [ForeignKey("Creator")]
        public int CreatorId { get; set; }
        public virtual AppUser Creator { get; set; }
    }
}