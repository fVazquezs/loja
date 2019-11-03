using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace loja.Migrations
{
    public partial class employee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Position",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "User",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Position",
                table: "User");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "User");
        }
    }
}
