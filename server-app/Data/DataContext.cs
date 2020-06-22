using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server_app.models;

namespace server_app.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<FlightBooking> FlightBookings { get; set; }
        public DbSet<CarBooking> CarBookings { get; set; }
        public DbSet<HotelBooking> HotelBookings { get; set; }
        public DbSet<ActivityBooking> ActivityBookings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}