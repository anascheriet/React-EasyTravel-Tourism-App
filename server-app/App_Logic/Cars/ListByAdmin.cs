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

namespace server_app.App_Logic.Cars
{
    public class ListByAdmin
    {


        public class Query : IRequest<List<Car>>
        {
            public string name { set;get; }
        }

        public class Handler : IRequestHandler<Query, List<Car>>
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

            public async Task<List<Car>> Handle(Query request, CancellationToken cancellationToken)
            {
                var AdminCars = await _context.Cars.Where(x => x.CreatorName == request.name).ToListAsync();
                return AdminCars;
            }
        }

    }
}