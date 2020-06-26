using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using server_app.App_Logic.Errors;
using server_app.Data;
using server_app.models;

namespace server_app.App_Logic.Articles
{
    public class Details
    {


        public class Query : IRequest<Article>
        {
            public Guid Id;
        }

        public class Handler : IRequestHandler<Query, Article>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Article> Handle(Query request, CancellationToken cancellationToken)
            {
                var article = await _context.Articles.FindAsync(request.Id);

                if (article == null)
                    throw new RestException(HttpStatusCode.NotFound, new { article = "Article Not Found" });

                return article;
            }
        }
    }
}