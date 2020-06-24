using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_app.App_Logic.Activities.ActivityBookings;
using server_app.models;

namespace server_app.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class ActivityBookingController
    {
        private readonly IMediator _mediator;
        public ActivityBookingController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<List<ActivityBooking>>> List(string name)
        {
            return await _mediator.Send(new List.Query { name = name });
        }

    }
}