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

namespace server_app.App_Logic.Flights
{
    public class ListByAdmin
    {


        public class Query : IRequest<List<Flight>>
        {
            public string name { set; get; }
        }

        public class Handler : IRequestHandler<Query, List<Flight>>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _useAccessor;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor useAccessor)
            {
                _useAccessor = useAccessor;
                _userManager = userManager;
                _context = context;
            }

            public async Task<List<Flight>> Handle(Query request, CancellationToken cancellationToken)
            {
                var AdminFlights = await _context.Flights.Where(x => x.CreatorName == request.name).ToListAsync();
                return AdminFlights;
            }
        }

    }
}