using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class FlightBooking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FlightBookings",
                columns: table => new
                {
                    FlightBookingId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ClientName = table.Column<string>(nullable: true),
                    ProductId = table.Column<Guid>(nullable: false),
                    BookingDate = table.Column<DateTime>(nullable: false),
                    Adults = table.Column<string>(nullable: true),
                    Kids = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightBookings", x => x.FlightBookingId);
                    table.ForeignKey(
                        name: "FK_FlightBookings_Flights_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Flights",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightBookings_ProductId",
                table: "FlightBookings",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightBookings");
        }
    }
}
