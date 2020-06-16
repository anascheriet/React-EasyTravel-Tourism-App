using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;
using server_app.models;

namespace server_app.App_logic.Cars
{
    public class Delete
    {
                public class Command : Service, IRequest
        {
            //
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var car = await _context.Cars.FindAsync(request.id);

                if(car==null)
                  throw new RestException(HttpStatusCode.NotFound, new {car= "Car Not Found"});

                  _context.Remove(car);
                  
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}