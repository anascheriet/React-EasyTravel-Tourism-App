using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using server_app.Data;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.App_Logic.Users
{
    public class CurrentUser
    {


        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _useAccessor;
            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor useAccessor)
            {
                _useAccessor = useAccessor;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;

            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_useAccessor.GetCurrentUsername());
                
                return new User
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Status = user.Status,
                    Id = user.Id,
                    Token = _jwtGenerator.CreatToken(user)
                };
            }
        }

    }
}