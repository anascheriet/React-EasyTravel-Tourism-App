using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using server_app.Data;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.App_Logic.Activities.ActivityBookings
{
    public class Create
    {
        public class Command : IRequest
        {
            public int ActivityBookingId { get; set; }
            public string ClientName { get; set; }
            public string ProductId { get; set; }
            public DateTime BookingDate { get; set; }
            public string ActivityDate { get; set; }
            public string Adults { get; set; }
            public string Kids { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _userManager = userManager;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                var booking = new ActivityBooking
                {
                    ActivityBookingId = request.ActivityBookingId,
                    BookingDate = DateTime.Now,
                    ProductId = Guid.Parse(request.ProductId),
                    ClientName = user != null ? user.UserName : request.ClientName,
                    ActivityDate = DateTime.Parse(request.ActivityDate),
                    Adults = request.Adults,
                    Kids = request.Kids
                };

                _context.ActivityBookings.Add(booking);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}