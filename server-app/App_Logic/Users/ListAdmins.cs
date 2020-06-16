using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Users
{
    public class ListAdmins
    {
        
        
                public class Query : IRequest<List<AppUser>> { }
        
                public class Handler : IRequestHandler<Query, List<AppUser>>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                        _context = context;
                    }
        
                    public async Task<List<AppUser>> Handle(Query request, CancellationToken cancellationToken)
                    {
                        var admins = await _context.Users.Where(x => x.Status == "Admin").ToListAsync();
                        return admins;
                    }
                }
    }
}