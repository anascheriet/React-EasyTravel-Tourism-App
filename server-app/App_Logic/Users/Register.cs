using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.Data;
using server_app.models;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using server_app.Infrastructure.Interfaces;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using server_app.App_Logic.Errors;
using System.Net;
using server_app.App_Logic.Validators;
using server_app.Utility;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace server_app.App_Logic.Users
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Status { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Rules();
            }

        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly RoleManager<AppRole> _roleManager;
            private readonly IUserAccessor _useAccessor;
            private readonly DataContext _db;
            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, RoleManager<AppRole> roleManager, IUserAccessor useAccessor, DataContext db)
            {
                _db = db;
                _useAccessor = useAccessor;
                _roleManager = roleManager;
                _context = context;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {

                var roles = new List<AppRole>
                {
                new AppRole{Name= "SudoAdmin"},
                new AppRole{Name= "Admin"},
                new AppRole{Name = "Client"}
                };

                foreach (var role in roles)
                {
                    await _roleManager.CreateAsync(role);
                }

                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

                if (await _context.Users.Where(x => x.UserName == request.UserName).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Username = "Username already exists" });


                var connectedUser = _useAccessor.GetCurrentUsername() != null;

                Boolean roleShouldBeSudoAdmin =_db.Users.ToList().Count == 0;//the first ever created user will be of role SudoAdmin

                Boolean roleShouldBeAdmin = connectedUser;//the user creating admin accounts should be logged in

                var user = new AppUser
                {
                    UserName = request.UserName,
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    Status = roleShouldBeSudoAdmin ? "SudoAdmin" : roleShouldBeAdmin ? "Admin" : "Client"
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    if (user.Status == "SudoAdmin")
                    {
                        await _userManager.AddToRoleAsync(user, roles[0].Name);
                    }
                    else if (user.Status == "Admin")
                    {
                        await _userManager.AddToRoleAsync(user, roles[1].Name);
                    }
                    else
                    {
                        await _userManager.AddToRoleAsync(user, roles[2].Name);
                    }

                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Username = user.UserName,
                        Token = _jwtGenerator.CreatToken(user)
                    };

                }


                throw new System.Exception("Problem creating user");
            }
        }
    }
}