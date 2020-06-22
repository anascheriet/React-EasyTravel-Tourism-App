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
            public string ReturningDate { get; set; }
            public string DepartingDepartingTime { get; set; }
            public string DepartingArrivingTime { get; set; }
            public string DepartingCountry { get; set; }
            public string DepartingCity { get; set; }
            public string DestinationCountry { get; set; }
            public string DestinationCity { get; set; }
            public string ReturnDepartingTime { get; set; }
            public string ReturnArrivingTime { get; set; }
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
                DateTime? returningDateParsed = DateTime.Parse(request.ReturningDate);
                DateTime? departingDateParsed = DateTime.Parse(request.DepartingDate);


                flight.Name = request.Name ?? flight.Name;
                flight.Type = request.Type ?? flight.Type;
                
                flight.Price = request.Price ?? flight.Price;

                flight.DepartingCountry = request.DepartingCountry ?? flight.DepartingCountry;
                flight.DepartingCity = request.DepartingCity ?? flight.DepartingCity;
                flight.DepartingDepartingTime = request.DepartingDepartingTime ?? flight.DepartingDepartingTime;
                flight.DepartingArrivingTime = request.DepartingArrivingTime ?? flight.DepartingArrivingTime;
                flight.DepartingDate = departingDateParsed ?? flight.DepartingDate;

                flight.DestinationCountry = request.DestinationCountry ?? flight.DestinationCountry;
                flight.DestinationCity = request.DestinationCity ?? flight.DestinationCity;



                flight.ReturnDepartingTime = request.ReturnDepartingTime ?? flight.ReturnDepartingTime;
                flight.ReturnArrivingTime = request.ReturnArrivingTime ?? flight.ReturnArrivingTime;
                flight.ReturningDate = returningDateParsed ?? flight.ReturningDate;

                flight.CombinedDestination = flight.DestinationCity + ", " + flight.DestinationCountry;
                flight.CombinedDepLocation = flight.DepartingCity + ", " + flight.DepartingCountry;




 
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}