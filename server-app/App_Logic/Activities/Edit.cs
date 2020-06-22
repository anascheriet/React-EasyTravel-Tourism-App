using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Activities
{
    public class Edit
    {
        public class Command : Service, IRequest
        {
            public string Description { get; set; }
            public string Price { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string Adress { get; set; }
            public string Package { get; set; }
            public string Duration { get; set; }
            public string CreatorName { get; set; }
            public int CreatorId { get; set; }
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

                var activity = await _context.Activities.FindAsync(request.id);
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Activity Not Found" });

                // int? priceParsed = Int32.Parse(request.Price);
                if(request.Price != "") {activity.Price = Int32.Parse(request.Price); }

                activity.Name = request.Name ?? activity.Name;
                activity.Description = request.Description ?? activity.Description;
                //activity.Price = priceParsed ?? activity.Price; //problem here when not updating the price value
                activity.Package = request.Package ?? activity.Package;
                activity.Duration = request.Duration ?? activity.Duration;
                activity.Country = request.Country ?? activity.Country;
                activity.City = request.City ?? activity.City;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}