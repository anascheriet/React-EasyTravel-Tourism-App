using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Hotels.Hotel_Bookings
{
    public class List
    {


        public class Query : IRequest<List<HotelBooking>>
        {
            public string name { set; get; }
        }

        public class Handler : IRequestHandler<Query, List<HotelBooking>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<HotelBooking>> Handle(Query request, CancellationToken cancellationToken)
            {
                var clientHotels = await _context.HotelBookings.Where(x => x.ClientName == request.name).ToListAsync();

                return clientHotels;
            }
        }

    }
}