using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;
using server_app.models;


namespace server_app.App_Logic.Restaurants
{
    public class Details
    {


        public class Query : IRequest<Restaurant>
        {
            public Guid Id;
        }

        public class Handler : IRequestHandler<Query, Restaurant>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Restaurant> Handle(Query request, CancellationToken cancellationToken)
            {
                var restaurant = await _context.Restaurants.FindAsync(request.Id);

                if (restaurant == null)
                    throw new RestException(HttpStatusCode.NotFound, new { restaurant = "Restaurant Not Found" });

                return restaurant;
            }
        }

    }
}