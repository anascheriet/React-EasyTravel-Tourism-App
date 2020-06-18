using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;
using server_app.models;

namespace server_app.App_logic.Cars
{
    public class Edit
    {

        public class Command : Service, IRequest
        {
            public string Description { get; set; }
            public string Options { get; set; }
            public string Price { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
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
                var car = await _context.Cars.FindAsync(request.id);
                if (car == null)
                    throw new RestException(HttpStatusCode.NotFound, new { car = "Car Not Found" });

                int? priceParsed = Int32.Parse(request.Price);

                car.Name = request.Name ?? car.Name;
                car.Description = request.Description ?? car.Description;
                car.Price = priceParsed ?? car.Price; //problem here when not updating the price value
                car.Options = request.Options ?? car.Options;
                car.Country = request.Country ?? car.Country;
                car.City = request.City ?? car.City;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}