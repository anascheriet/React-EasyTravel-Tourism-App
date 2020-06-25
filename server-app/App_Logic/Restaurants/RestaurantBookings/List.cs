using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Restaurants.RestaurantBookings
{
    public class List
    {


        public class Query : IRequest<List<RestaurantBooking>>
        {
            public string name { set; get; }
        }

        public class Handler : IRequestHandler<Query, List<RestaurantBooking>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<RestaurantBooking>> Handle(Query request, CancellationToken cancellationToken)
            {
                var clientRestaurants = await _context.RestaurantBookings.Where(x => x.ClientName == request.name).ToListAsync();

                return clientRestaurants;
            }
        }

    }
}