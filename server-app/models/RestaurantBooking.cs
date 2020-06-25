using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_app.models
{
    public class RestaurantBooking
    {
        public int RestaurantBookingId { get; set; }

         public string ClientName { get; set; }
        public string MealTime { get; set; }
        public string People { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public virtual Restaurant Product { get; set; }

        public DateTime BookingDate { get; set; }
        public DateTime MealDate { get; set; }
    }
}