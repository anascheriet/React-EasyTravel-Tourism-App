using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using server_app.models;

namespace server_app.Data
{
    public class Seed
    {
        
        public static void SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            // if (!userManager.Users.Any())
            // {
            //     var users = new List<AppUser>
            //     {
            //         new AppUser
            //         {
            //             DisplayName= "Anas",
            //             UserName= "anas",
            //             Email="anas@live.fr",
            //             Status="Admin"
            //         },
            //         new AppUser
            //         {
            //             DisplayName= "bob",
            //             UserName= "bob",
            //             Email="bob@live.fr",
            //             Status="Admin"
            //         }
            //     };
            //     foreach (var user in users)
            //     {
            //         await userManager.CreateAsync(user, "Pa$$w0rd");
            //     }
            // }

            // if (!context.Cars.Any())
            // {
            //     var cars = new List<Car>
            //     {
            //         new Car {
            //             Name = "Audi A8",
            //             Description = "Brand New Car",
            //             Price = 900,
            //             Options = "Full Options",
            //             Country = "Morocco",
            //             City = "Rabat"
            //         },
            //         new Car {
            //             Name = "BMW S5",
            //             Description = "Black",
            //             Price = 700,
            //             Options = "Basic Options",
            //             Country = "Morocco",
            //             City = "Agadir"
            //         },
            //         new Car {
            //             Name = "Mercedes AMG",
            //             Description = "White",
            //             Price = 750,
            //             Options = "Basic Options",
            //             Country = "France",
            //             City = "Paris"
            //         }
            //     };
            //     context.Cars.AddRange(cars);
            //     context.SaveChanges();
            // }
        }
    }
}