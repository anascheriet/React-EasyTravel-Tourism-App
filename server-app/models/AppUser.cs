using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace server_app.models
{
    public class AppUser : IdentityUser<int>
    {
        
        public string DisplayName { get; set; }
        public string Status { get; set; }
        public virtual ICollection<Car> CarsCreated { get; set; }
        public virtual ICollection<CarBooking> carBookings{get;set;}
    }
}