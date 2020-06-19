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
            public string ReturningDate { get; set; }
            public string DepartingDepartingTime { get; set; }
            public string DepartingArrivingTime { get; set; }
            public string DepartingCountry { get; set; }
            public string DepartingCity { get; set; }
            public string DestinationCountry { get; set; }
            public string DestinationCity { get; set; }
            public string ReturnDepartingTime { get; set; }
            public string ReturnArrivingTime { get; set; }
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
                RuleFor(x => x.DepartingDepartingTime).NotEmpty();
                RuleFor(x => x.DepartingArrivingTime).NotEmpty();
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
                    DepartingDepartingTime = request.DepartingDepartingTime,
                    DepartingArrivingTime = request.DepartingArrivingTime,
                    DestinationCountry = request.DestinationCountry,
                    DestinationCity = request.DestinationCity,
                    ReturningDate = request.ReturningDate == null ? DateTime.MinValue : DateTime.Parse(request.ReturningDate),
                    ReturnDepartingTime = request.ReturnDepartingTime,
                    ReturnArrivingTime = request.ReturnArrivingTime,
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