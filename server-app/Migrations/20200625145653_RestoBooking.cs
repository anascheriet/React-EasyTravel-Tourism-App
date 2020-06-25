using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class RestoBooking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RestaurantBookings",
                columns: table => new
                {
                    RestaurantBookingId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ClientName = table.Column<string>(nullable: true),
                    MealTime = table.Column<string>(nullable: true),
                    People = table.Column<string>(nullable: true),
                    ProductId = table.Column<Guid>(nullable: false),
                    BookingDate = table.Column<DateTime>(nullable: false),
                    MealDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestaurantBookings", x => x.RestaurantBookingId);
                    table.ForeignKey(
                        name: "FK_RestaurantBookings_Restaurants_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Restaurants",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantBookings_ProductId",
                table: "RestaurantBookings",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RestaurantBookings");
        }
    }
}
