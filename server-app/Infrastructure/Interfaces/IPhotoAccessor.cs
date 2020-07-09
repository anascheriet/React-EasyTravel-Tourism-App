using Microsoft.AspNetCore.Http;
using server_app.App_Logic.Photos;

namespace server_app.Infrastructure.Photos
{
    public interface IPhotoAccessor
    {
         PhotoUploadResult AddPhoto(IFormFile file);
         string DeletePhoto(string publicId);
    }
}