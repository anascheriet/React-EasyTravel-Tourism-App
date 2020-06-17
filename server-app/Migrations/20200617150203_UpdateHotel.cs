using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class UpdateHotel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaxPeople",
                table: "Hotels",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Rooms",
                table: "Hotels",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxPeople",
                table: "Hotels");

            migrationBuilder.DropColumn(
                name: "Rooms",
                table: "Hotels");
        }
    }
}
