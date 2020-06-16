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
        public DbSet<CarBooking> CarBookings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}