using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;


namespace server_app.App_Logic.Flights.Flight_Bookings
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int id;
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var flightB = await _context.FlightBookings.FindAsync(request.id);

                if (flightB == null)
                    throw new RestException(HttpStatusCode.NotFound, new { flightB = "Flight Booking Not Found" });

                _context.Remove(flightB);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}