using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Activities.ActivityBookings
{
    public class List
    {


        public class Query : IRequest<List<ActivityBooking>>
        {
            public string name { set; get; }
        }

        public class Handler : IRequestHandler<Query, List<ActivityBooking>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ActivityBooking>> Handle(Query request, CancellationToken cancellationToken)
            {
                var clientActivities = await _context.ActivityBookings.Where(x => x.ClientName == request.name).ToListAsync();

                return clientActivities;
            }
        }

    }
}