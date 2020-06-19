using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class aLTERFLIGHT2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReturnArrivingTime",
                table: "Flights",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReturnArrivingTime",
                table: "Flights");
        }
    }
}
