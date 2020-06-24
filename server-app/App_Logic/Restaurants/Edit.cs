using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Restaurants
{
    public class Edit
    {
        public class Command : Service, IRequest
        {
            public string Adress { get; set; }
            public string Description { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string Meals { get; set; }
            public string PhoneNumber { get; set; }
            public string People { get; set; }
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
                    throw new RestException(HttpStatusCode.NotFound, new { restaurant = "Restaurant Not Found" });

                restaurant.Name = request.Name ?? restaurant.Name;
                restaurant.Description = request.Description ?? restaurant.Description;
                restaurant.Meals = request.Meals ?? restaurant.Meals;
                restaurant.Country = request.Country ?? restaurant.Country;
                restaurant.City = request.City ?? restaurant.City;
                restaurant.Adress = request.Adress ?? restaurant.Adress;
                restaurant.People = request.People ?? restaurant.People;
                restaurant.PhoneNumber = request.PhoneNumber ?? restaurant.PhoneNumber;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}