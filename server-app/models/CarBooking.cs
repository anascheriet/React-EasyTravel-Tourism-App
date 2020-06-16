using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class CarBooking
    {
        public int CarBookingId { get; set; }

        public string ClientName { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public virtual Car Product { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime StartingFromDate { get; set; }
        public DateTime EndingDate { get; set; }
        //public int TotalPrice {get;set;}


    }
}