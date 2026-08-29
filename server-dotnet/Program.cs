var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5080");
builder.Services.AddControllers();
builder.Services.AddCors(options => options.AddPolicy("Ecommerce", policy =>
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
app.UseCors("Ecommerce");
app.MapControllers();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok", service = "ava-surface-ecommerce" }));

app.Run();
