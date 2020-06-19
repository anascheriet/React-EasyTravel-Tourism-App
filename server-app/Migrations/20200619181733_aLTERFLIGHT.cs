using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class aLTERFLIGHT : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReturnDepartingTime",
                table: "Flights",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReturnDepartingTime",
                table: "Flights");
        }
    }
}
