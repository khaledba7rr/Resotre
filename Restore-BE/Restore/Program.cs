using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Restore.Data;
using Restore_BE.Data;
using Restore_BE.Models;
using Restore_BE.Models.Contracts;
using Restore_BE.Repositories;
using Restore_BE.Repositories.IRepositories;
using Restore_BE.Services;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

var MyAllowSpecificOrigins = "AllowReactApp";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddScoped<ICommonResponse, CommonResponse>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddDbContext<RestoreDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentityCore<AppUser>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
})

.AddEntityFrameworkStores<AppDbContext>()
.AddApiEndpoints();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
