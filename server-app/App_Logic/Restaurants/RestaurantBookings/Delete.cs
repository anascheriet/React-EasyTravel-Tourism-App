using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;

namespace server_app.App_Logic.Restaurants.RestaurantBookings
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

                var restaurantB = await _context.RestaurantBookings.FindAsync(request.id);
                
                 if (restaurantB == null)
                    throw new RestException(HttpStatusCode.NotFound, new { restaurantB = "Restaurant Booking Not Found" });
                
                _context.Remove(restaurantB);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}