using API_BetterLife.Models;
using API_BetterLife.Services;
using API_BetterLife;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuração do CORS
builder.Services.AddCors(options =>
{
    //options.AddPolicy("AllowSpecificOrigin", builder =>
    //    builder
    //        .WithOrigins(
    //            "http://localhost:4200",
    //            "https://www.victoramaro.com.br",
    //            "https://www.betterlife.app.br",
    //            "https://www.dev.betterlife.app.br"
    //        )
    //        .AllowAnyHeader()
    //        .AllowAnyMethod());
    options.AddPolicy("AllowSpecificOrigin", builder =>
       builder
           .SetIsOriginAllowed(origin =>
           {
               // Permitir todos os subdomínios de betterlife.app.br
               return origin.EndsWith(".betterlife.app.br")
               || origin == "https://www.betterlife.app.br"
               || origin == "https://betterlife.app.br"
               || origin == "http://localhost:4200"
               ;
           })
           .AllowAnyHeader()
           .AllowAnyMethod());
});


// Configuração de banco de dados e outros serviços
var connectionString = builder.Configuration.GetConnectionString("CONEXAO_BD");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers(options =>
{
    options.RespectBrowserAcceptHeader = true;
}).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.DictionaryKeyPolicy = null;
    options.JsonSerializerOptions.WriteIndented = true;
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

builder.Services.AddScoped<IUtilService, UtilService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseHttpsRedirection();

// Mover a configuração de CORS para antes de `UseAuthorization`
app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/error");
}

app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<ExceptionMiddleware>();

app.Run();
