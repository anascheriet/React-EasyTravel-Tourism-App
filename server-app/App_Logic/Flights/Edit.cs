using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Flights
{
    public class Edit
    {
        public class Command : Service, IRequest
        {

            public string DepartingDate { get; set; }
            public string ArrivingDate { get; set; }
            public string DepartingTime { get; set; }
            public string ArrivingTime { get; set; }
            public string DepartingCountry { get; set; }
            public string DepartingCity { get; set; }
            public string ArrivingCountry { get; set; }
            public string ArrivingCity { get; set; }
            public string Type { get; set; }
            public string Price { get; set; }
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
                var flight = await _context.Flights.FindAsync(request.id);
                if (flight == null)
                    throw new RestException(HttpStatusCode.NotFound, new { hotel = "Hotel Not Found" });


                int? priceParsed = Int32.Parse(request.Price);
                DateTime? arrivingDateParsed = DateTime.Parse(request.ArrivingDate);
                DateTime? departingDateParsed = DateTime.Parse(request.DepartingDate);


                flight.Name = request.Name ?? flight.Name;
                flight.Type = request.Type ?? flight.Type;
                
                flight.Price = priceParsed ?? flight.Price;

                flight.DepartingCountry = request.DepartingCountry ?? flight.DepartingCountry;
                flight.DepartingCity = request.DepartingCity ?? flight.DepartingCity;
                flight.DepartingTime = request.DepartingTime ?? flight.DepartingTime;
                flight.DepartingDate = departingDateParsed ?? flight.DepartingDate;

                flight.ArrivingCountry = request.ArrivingCountry ?? flight.ArrivingCountry;
                flight.ArrivingCity = request.ArrivingCity ?? flight.ArrivingCity;
                flight.ArrivingTime = request.ArrivingTime ?? flight.ArrivingTime;
                flight.ArrivingDate = arrivingDateParsed ?? flight.ArrivingDate;





                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}