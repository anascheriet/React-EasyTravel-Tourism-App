using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using server_app.Data;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.App_Logic.Hotels
{
    public class Create
    {
        public class Command : Service, IRequest
        {
            public string Adresse { get; set; }
            public string Description { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string Price { get; set; }
            public string hasParking { get; set; }
            public string hasPool { get; set; }
            public string hasSpa { get; set; }
            public string hasGym { get; set; }
            public string CreatorName { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Adresse).NotEmpty();
                RuleFor(x => x.Country).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Price).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                var hotel = new Hotel
                {
                    id = request.id,
                    Name = request.Name,
                    Country = request.Country,
                    City = request.City,
                    Description = request.Description,
                    Adresse = request.Adresse,
                    Price = Int32.Parse(request.Price),
                    hasParking = bool.Parse(request.hasParking),
                    hasPool = bool.Parse(request.hasPool),
                    hasSpa = bool.Parse(request.hasSpa),
                    hasGym = bool.Parse(request.hasGym),
                    CreatorName = user != null ? user.UserName : request.CreatorName,
                };

                _context.Hotels.Add(hotel);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}