using AzureAdDemo.Extenstions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Linq;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using TodoBackend.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// OpenID Connect Konfiguration
var oidcConfig = builder.Configuration.GetSection("OpenIDConnectSettings");
if (oidcConfig.Exists())
{
    builder.ConfigureOpenIdAuthentication(oidcConfig);
}
else
{
    Console.WriteLine($"[INFO] No OpenIDConnectSettings provided in appsettings.json. We use guest as username.");
    if (builder.Environment.IsDevelopment())
    {
        builder.Services.AddAuthentication("GuestScheme")
            .AddScheme<AuthenticationSchemeOptions, GuestAuthenticationHandler>("GuestScheme", null);
    }
}

// JWT Bearer Authentifizierung für Azure AD
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = builder.Configuration["AzureAd:Instance"] + builder.Configuration["AzureAd:TenantId"];
    options.Audience = builder.Configuration["AzureAd:ClientId"];
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true
    };
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DrivingExamContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("Default"),
        o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SingleQuery)));

// CORS für Entwicklung
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowDevserver",
            builder => builder
                .SetIsOriginAllowed(origin => true)
                .AllowAnyHeader().AllowAnyMethod().AllowCredentials());
    });
}

var app = builder.Build();

// Datenbank initialisieren
using (var scope = app.Services.CreateScope())
{
    using (var db = scope.ServiceProvider.GetRequiredService<DrivingExamContext>())
    {
        db.Initialize(deleteDatabase: app.Environment.IsDevelopment());
        db.Seed();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowDevserver");
}

// app.UseHttpsRedirection();
app.UseCookiePolicy();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
// app.UseStaticFiles();

app.Start();
var color = Console.ForegroundColor;
Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine("+-------------+");
Console.WriteLine("| API started |");
Console.WriteLine("+-------------+");
Console.WriteLine($"Visit swagger running on {app.Urls.First(u => u.StartsWith("https"))}/swagger\n");
Console.ForegroundColor = color;
app.WaitForShutdown();