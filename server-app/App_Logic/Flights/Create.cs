using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using server_app.Data;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.App_Logic.Flights
{
    public class Create
    {
        public class Command : Service, IRequest
        {
            public string DepartingDate { get; set; }
            public string ArrivingDate { get; set; }
            public string DepartingTime { get; set; }
            public string ArrivingTime { get; set; }
            public string DepartingCountry { get; set; }
            public string DepartingCity { get; set; }
            public string ArrivingCountry { get; set; }
            public string ArrivingCity { get; set; }
            public string Type { get; set; }
            public string Price { get; set; }
            public string CreatorName { get; set; }
            public int CreatorId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.DepartingCity).NotEmpty();
                RuleFor(x => x.DepartingCountry).NotEmpty();
                RuleFor(x => x.DepartingTime).NotEmpty();
                RuleFor(x => x.Type).NotEmpty();
                RuleFor(x => x.Price).NotEmpty();
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

                var flight = new Flight
                {
                    id = request.id,
                    Name = request.Name,
                    DepartingCountry = request.DepartingCountry,
                    DepartingCity = request.DepartingCity,
                    DepartingDate = DateTime.Parse(request.DepartingDate),
                    DepartingTime = request.DepartingTime,
                    ArrivingCountry = request.ArrivingCountry,
                    ArrivingCity = request.ArrivingCity,
                    ArrivingDate = DateTime.Parse(request.ArrivingDate),
                    ArrivingTime = request.ArrivingTime,
                    Type = request.Type,
                    Price = Int32.Parse(request.Price),
                    CreatorId = user != null ? user.Id : request.CreatorId,
                    CreatorName = user != null ? user.UserName : request.CreatorName,
                };
                _context.Flights.Add(flight);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}