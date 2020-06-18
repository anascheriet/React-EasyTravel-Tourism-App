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
    public class Details
    {


        public class Query : IRequest<Flight>
        {
            public Guid Id;
        }

        public class Handler : IRequestHandler<Query, Flight>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Flight> Handle(Query request, CancellationToken cancellationToken)
            {
                var flight = await _context.Flights.FindAsync(request.Id);

                if (flight == null)
                    throw new RestException(HttpStatusCode.NotFound, new { flight = "Car Not Found" });

                return flight;
            }
        }

    }
}