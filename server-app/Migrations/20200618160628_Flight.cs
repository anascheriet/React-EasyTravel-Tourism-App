using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class Flight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Flights",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    DepartingDate = table.Column<DateTime>(nullable: false),
                    ArrivingDate = table.Column<DateTime>(nullable: true),
                    DepartingTime = table.Column<string>(nullable: true),
                    ArrivingTime = table.Column<string>(nullable: true),
                    DepartingCounytry = table.Column<string>(nullable: true),
                    DeaprtingCity = table.Column<string>(nullable: true),
                    ArrivingCountry = table.Column<string>(nullable: true),
                    ArrivingCity = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false),
                    CreatorName = table.Column<string>(nullable: true),
                    CreatorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flights", x => x.id);
                    table.ForeignKey(
                        name: "FK_Flights_AspNetUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Flights_CreatorId",
                table: "Flights",
                column: "CreatorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Flights");
        }
    }
}
