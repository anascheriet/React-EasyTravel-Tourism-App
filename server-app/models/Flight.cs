using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class Flight : Service
    {
        public DateTime DepartingDate { get; set; }
        public DateTime? ReturningDate { get; set; }
        public string DepartingDepartingTime { get; set; }
        public string DepartingArrivingTime { get; set; }
        public string DepartingCountry { get; set; }
        public string DepartingCity { get; set; }
        //public string CombinedDepLocation {get;set;}
        //public string CombinedDestination { get; set; }
        public string DestinationCountry { get; set; }
        public string DestinationCity { get; set; }
        public string ReturnDepartingTime { get; set; }
        public string ReturnArrivingTime { get; set; }
        public string Type { get; set; }
        public int Price { get; set; }
        public string CreatorName { get; set; }

        [ForeignKey("Creator")]
        public int CreatorId { get; set; }
        public virtual AppUser Creator { get; set; }
    }
}