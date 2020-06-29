using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Articles
{
    public class Edit
    {
        public class Command : Service, IRequest
        {
            public string Body { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var article = await _context.Articles.FindAsync(request.id);
                if (article == null)
                    throw new RestException(HttpStatusCode.NotFound, new { article = "article Not Found" });

                article.Name = request.Name ?? article.Name;
                article.Body = request.Body ?? article.Body;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}