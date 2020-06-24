using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Restaurants
{
    public class Delete
    {
        public class Command : Service, IRequest
        {
            //props
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
                var restaurant = await _context.Restaurants.FindAsync(request.id);

                if (restaurant == null)
                    throw new RestException(HttpStatusCode.NotFound, new { hotel = "Restaurant Not Found" });

                _context.Remove(restaurant);


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}