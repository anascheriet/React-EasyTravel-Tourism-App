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

namespace server_app.App_Logic.Hotels
{
    public class ListByAdmin
    {


        public class Query : IRequest<List<Hotel>>
        {
            public string name { set; get; }
        }

        public class Handler : IRequestHandler<Query, List<Hotel>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _useAccessor;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor useAccessor)
            {
                _userManager = userManager;
                _useAccessor = useAccessor;
                _context = context;
            }

            public async Task<List<Hotel>> Handle(Query request, CancellationToken cancellationToken)
            {
                var AdminHotels = await _context.Hotels.Where(x => x.CreatorName == request.name).ToListAsync();
                return AdminHotels;
            }
        }

    }
}