using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server_app.App_Logic.Users;
using server_app.Infrastructure.Interfaces;
using server_app.models;

namespace server_app.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UsersController(IMediator mediator, UserManager<AppUser> userManager, IUserAccessor useAccessor)
        {
            _mediator = mediator;
        }

        [HttpGet("admins")]
        public async Task<ActionResult<List<AppUser>>> ListAdmins()
        {
            return await _mediator.Send(new ListAdmins.Query());
        }

        [HttpGet("sudoadmins")]
        public async Task<ActionResult<List<AppUser>>> ListSudoAdmins()
        {
            return await _mediator.Send(new ListSudoAdmins.Query());
        }




        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await _mediator.Send(query);
        }


        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await _mediator.Send(command);
        }

    
        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await _mediator.Send(new CurrentUser.Query());
        }


    }
}