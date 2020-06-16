using server_app.models;

namespace server_app.Infrastructure.Interfaces
{
    public interface IJwtGenerator
    {
         string CreatToken(AppUser user);
    }
}