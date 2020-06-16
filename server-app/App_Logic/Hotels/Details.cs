using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Hotels
{
    public class Details
    {


        public class Query : IRequest<Hotel>
        {
            public Guid Id;
        }

        public class Handler : IRequestHandler<Query, Hotel>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Hotel> Handle(Query request, CancellationToken cancellationToken)
            {
                var hotel = await _context.Hotels.FindAsync(request.Id);

                if (hotel == null)
                    throw new RestException(HttpStatusCode.NotFound, new { hotel = "Hotel Not Found" });

                return hotel;
            }
        }

    }
}