using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class ActivityBooking
    {
        public int ActivityBookingId { get; set; }

        public string ClientName { get; set; }
        public string Adults { get; set; }
        public string Kids { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public virtual Activity Product { get; set; }

        public DateTime BookingDate { get; set; }
        public DateTime ActivityDate { get; set; }
    }
}