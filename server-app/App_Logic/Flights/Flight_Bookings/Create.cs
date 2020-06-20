using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using server_app.Data;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.App_Logic.Flights.Flight_Bookings
{
    public class Create
    {
        public class Command : IRequest
        {
            public int flightBookingid { get; set; }
            public string ClientName { get; set; }
            public string ProductId { get; set; }
            public DateTime BookingDate { get; set; }
            public string adults { get; set; }
            public string kids { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.adults).NotEmpty();
                RuleFor(x => x.kids).NotEmpty();
                RuleFor(x => x.ProductId).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _context = context;
                _userManager = userManager;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                var booking = new FlightBooking
                {
                    FlightBookingId = request.flightBookingid,
                    BookingDate = DateTime.Now,
                    ProductId = Guid.Parse(request.ProductId),
                    ClientName = user != null ? user.UserName : request.ClientName,
                    Kids = request.kids,
                    Adults = request.adults,
                };

                _context.FlightBookings.Add(booking);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}