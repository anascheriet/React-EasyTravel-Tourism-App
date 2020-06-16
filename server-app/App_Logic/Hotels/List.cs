using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Hotels
{
    public class List
    {


        public class Query : IRequest<List<Hotel>> { }

        public class Handler : IRequestHandler<Query, List<Hotel>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Hotel>> Handle(Query request, CancellationToken cancellationToken)
            {
                var hotels = await _context.Hotels.ToListAsync();
                return hotels;
            }
        }

    }
}