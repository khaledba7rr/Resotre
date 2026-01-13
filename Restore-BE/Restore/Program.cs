using Microsoft.EntityFrameworkCore;
using Restore.Data;
using Restore_BE.Models.Contracts;
using Restore_BE.Repositories;
using Restore_BE.Repositories.IRepositories;
using Restore_BE.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

builder.Services.AddScoped<ICommonResponse, CommonResponse>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddDbContext<RestoreDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // ✅ THIS WAS MISSING
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
