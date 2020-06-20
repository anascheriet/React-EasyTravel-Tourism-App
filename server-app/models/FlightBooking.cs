using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class FlightBooking
    {
        public int FlightBookingId { get; set; }

        public string ClientName { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public virtual Flight Product { get; set; }
        public DateTime BookingDate { get; set; }
        public string Adults { get; set; }
        public string Kids { get; set; }

    }
}