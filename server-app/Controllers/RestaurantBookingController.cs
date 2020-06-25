using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_app.App_Logic.Restaurants.RestaurantBookings;
using server_app.models;

namespace server_app.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class RestaurantBookingController
    {
        private readonly IMediator _mediator;
        public RestaurantBookingController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<List<RestaurantBooking>>> List(string name)
        {
            return await _mediator.Send(new List.Query { name = name });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await _mediator.Send(new Delete.Command { id = id });
        }
    }
}