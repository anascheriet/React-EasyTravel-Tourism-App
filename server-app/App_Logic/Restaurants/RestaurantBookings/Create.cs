using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using server_app.Data;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.App_Logic.Restaurants.RestaurantBookings
{
    public class Create
    {
        public class Command : IRequest
        {
            public int RestaurantBookingId { get; set; }
            public string ClientName { get; set; }
            public string ProductId { get; set; }
            public DateTime BookingDate { get; set; }
            public string MealDate { get; set; }
            public string MealTime { get; set; }
            public string People { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                 var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                 var booking = new RestaurantBooking
                {
                    RestaurantBookingId = request.RestaurantBookingId,
                    BookingDate = DateTime.Now,
                    ProductId = Guid.Parse(request.ProductId),
                    ClientName = user != null ? user.UserName : request.ClientName,
                    MealDate = DateTime.Parse(request.MealDate),
                    People = request.People,
                    MealTime = request.MealTime
                };

                _context.RestaurantBookings.Add(booking);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}