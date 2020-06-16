using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using server_app.App_Logic.Errors;
using server_app.Data;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.App_Logic.Hotels
{
    public class Edit
    {
        public class Command : Service, IRequest
        {
            public string Adress { get; set; }
            public string Description { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string Price { get; set; }
            public string hasParking { get; set; }
            public string hasPool { get; set; }
            public string hasSpa { get; set; }
            public string hasGym { get; set; }
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
                var hotel = await _context.Hotels.FindAsync(request.id);

                if (hotel == null)
                    throw new RestException(HttpStatusCode.NotFound, new { hotel = "Hotel Not Found" });

                int? priceParsed = Int32.Parse(request.Price);
                bool? hasParkingParsed = bool.Parse(request.hasParking);
                bool? hasSpaParsed = bool.Parse(request.hasSpa);
                bool? hasGymParsed = bool.Parse(request.hasGym);
                bool? hasPoolParsed = bool.Parse(request.hasPool);

                hotel.Name = request.Name ?? hotel.Name;
                hotel.Description = request.Description ?? hotel.Description;
                hotel.Price = priceParsed ?? hotel.Price;
                hotel.Country = request.Country ?? hotel.Country;
                hotel.City = request.City ?? hotel.City;
                hotel.Adress = request.Adress ?? hotel.Adress;
                hotel.hasParking = hasParkingParsed ?? hotel.hasParking;
                hotel.hasPool = hasPoolParsed ?? hotel.hasPool;
                hotel.hasGym = hasGymParsed ?? hotel.hasGym;
                hotel.hasSpa = hasSpaParsed ?? hotel.hasSpa;



                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}