using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using server_app.Data;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.App_Logic.Restaurants
{
    public class Create
    {
        public class Command : Service, IRequest
        {
            public string Adress { get; set; }
            public string Description { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string PhoneNumber { get; set; }
            public int CreatorId { get; set; }
            public string CreatorName { get; set; }
            public string Meals { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Adress).NotEmpty();
                RuleFor(x => x.Country).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Meals).NotEmpty();
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

                var restaurant = new Restaurant
                {
                    id = request.id,
                    Name = request.Name,
                    Country = request.Country,
                    City = request.City,
                    Description = request.Description,
                    Adress = request.Adress,
                    Meals = request.Meals,
                    PhoneNumber = request.PhoneNumber,
                    CreatorId = user != null ? user.Id : request.CreatorId,
                    CreatorName = user != null ? user.UserName : request.CreatorName,
                };

                _context.Restaurants.Add(restaurant);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}