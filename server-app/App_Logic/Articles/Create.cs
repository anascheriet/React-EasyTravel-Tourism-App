using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using server_app.Data;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.App_Logic.Articles
{
    public class Create
    {
        public class Command : Service, IRequest
        {
            public string Body { get; set; }
            public string CreatorName { get; set; }
            public int CreatorId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _useAccessor;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor useAccessor)
            {
                _useAccessor = useAccessor;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_useAccessor.GetCurrentUsername());

                var article = new Article
                {
                    Body = request.Body,
                    CreatorId = user != null ? user.Id : request.CreatorId,
                    CreatorName = user != null ? user.UserName : request.CreatorName,
                };
                _context.Articles.Add(article);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}