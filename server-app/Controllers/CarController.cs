using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_app.App_logic.Cars;
using server_app.App_Logic.Cars;
using server_app.models;

namespace server_app.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CarsController(IMediator mediator)
        {
            _mediator = mediator;
        }

      
        [HttpGet]
        public async Task<ActionResult<List<Car>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        
        [HttpGet("adminCars/{name}")]
        public async Task<ActionResult<List<Car>>> ListByAdmin(string name)
        {
            return await _mediator.Send(new ListByAdmin.Query { name = name });
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }

       
        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await _mediator.Send(command);
        }


       
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.id = id;
            return await _mediator.Send(command);
        }


        
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command { id = id });
        }

    }
}
