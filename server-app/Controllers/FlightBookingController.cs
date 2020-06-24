using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_app.App_Logic.Flights.Flight_Bookings;
using server_app.models;

namespace server_app.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class FlightBookingController : ControllerBase
    {
        private readonly IMediator _mediator;
        public FlightBookingController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<List<FlightBooking>>> List(string name)
        {
            return await _mediator.Send(new List.Query { name = name });
        }

    }
}