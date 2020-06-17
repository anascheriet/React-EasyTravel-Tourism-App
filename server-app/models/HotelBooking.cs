using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class HotelBooking
    {
        public int HotelBookingId { get; set; }

        public string ClientName { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public virtual Hotel Product { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime StartingFromDate { get; set; }
        public DateTime EndingDate { get; set; }

    }
}