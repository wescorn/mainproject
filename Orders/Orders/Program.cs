using Microsoft.EntityFrameworkCore;
using Orders.Data;
using Orders.Infrastructure;
using Orders.Models;
using RabbitMQ.Client;

var builder = WebApplication.CreateBuilder(args);

//RabbitMQ
string cloudAMQPConnectionString = "host=rabbitmq";

// Add services to the container.

builder.Services.AddDbContext<OrdersContext>(opt => opt.UseMySQL("Server=mysqldb;Database=orders;Uid=root;Pwd=admin"));//TODO Make Connection string

// Register repositories for dependency injection
builder.Services.AddScoped<IRepository<Order>, OrderRepository>();

// Register database initializer for dependency injection
builder.Services.AddTransient<IDbInitializer, DbInitializer>();

// Register MessagePublisher (a messaging gateway) for dependency injection
builder.Services.AddSingleton<IMessagePublisher>(new MessagePublisher(cloudAMQPConnectionString));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Initialize the database.
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetService<OrdersContext>();
    var dbInitializer = services.GetService<IDbInitializer>();
    dbInitializer.Initialize(dbContext);
}


// Create a message listener in a separate thread.
Task.Factory.StartNew(() => new MessageListener(app.Services).Start());
//MessageListener listener = new MessageListener(app.Services, cloudAMQPConnectionString, channel);
//channel.BasicConsume("request.queue", false, listener);


// Create a message listener in a separate thread.
//Task.Factory.StartNew(() =>
//    new MessageListener(app.Services, cloudAMQPConnectionString, channel).Start());

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
