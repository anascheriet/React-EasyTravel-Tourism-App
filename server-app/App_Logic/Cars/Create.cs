using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using server_app.Data;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.App_logic.Cars
{
    public class Create
    {
        public class Command : Service, IRequest
        {
            public string Description { get; set; }
            public string Price { get; set; }
            public string Options { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public int CreatorId {get;set;}
            public string CreatorName {get; set;}
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Price).NotEmpty();
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Options).NotEmpty();
                RuleFor(x => x.Country).NotEmpty();
                RuleFor(x => x.City).NotEmpty();

            }
        }

        public class Handler : IRequestHandler<Command>
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

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_useAccessor.GetCurrentUsername());
                var car = new Car
                {
                    id = request.id,
                    Name = request.Name,
                    Description = request.Description,
                    Price = Int32.Parse(request.Price),
                    Options = request.Options + " Options",
                    Country = request.Country,
                    City = request.City,
                    CreatorId = user != null ? user.Id : request.CreatorId,
                    CreatorName =user != null ? user.UserName : request.CreatorName,
                };

                _context.Cars.Add(car);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}