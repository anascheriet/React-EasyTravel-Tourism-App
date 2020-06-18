using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Flights
{
    public class List
    {


        public class Query : IRequest<List<Flight>> { }

        public class Handler : IRequestHandler<Query, List<Flight>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Flight>> Handle(Query request, CancellationToken cancellationToken)
            {
                var flights = await _context.Flights.ToListAsync();
                return flights;
            }
        }

    }
}