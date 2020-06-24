using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server_app.Data;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.App_Logic.Flights.Flight_Bookings
{
    public class List
    {


        public class Query : IRequest<List<FlightBooking>> { 
            public string name { set; get; }
        }

        public class Handler : IRequestHandler<Query, List<FlightBooking>>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _userManager = userManager;
                _context = context;
            }

            public async Task<List<FlightBooking>> Handle(Query request, CancellationToken cancellationToken)
            {
                // var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                var clientFlights = await _context.FlightBookings.Where(x => x.ClientName == request.name).ToListAsync();

                return clientFlights;
            }
        }

    }
}