using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using server_app.models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using server_app.Data;

namespace server_app.App_logic.Cars
{
    public class List
    {
        public class Query : IRequest<List<Car>> { }

        public class Handler : IRequestHandler<Query, List<Car>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Car>> Handle(Query request, CancellationToken cancellationToken)
            {
                var cars = await _context.Cars.ToListAsync();
                return cars;
            }
        }
    }
}