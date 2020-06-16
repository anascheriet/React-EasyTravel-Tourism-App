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
    public class Details
    {
        public class Query : IRequest<Car>
        {
            public Guid Id;
        }

        public class Handler : IRequestHandler<Query, Car>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Car> Handle(Query request, CancellationToken cancellationToken)
            {
                var car = await _context.Cars.FindAsync(request.Id);

                if (car == null)
                    throw new RestException(HttpStatusCode.NotFound, new { car = "Car Not Found" });

                return car;
            }
        }
    }
}