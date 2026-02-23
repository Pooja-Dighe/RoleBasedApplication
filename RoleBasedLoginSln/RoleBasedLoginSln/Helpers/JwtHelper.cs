using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using RoleBasedLoginSln.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RoleBasedLoginSln.Helpers
{
    public static class JwtHelper
    {
       public static string GenerateTokens(User user,IConfiguration config)
        {
            var claims = new[]
            {
               // new Claim(ClaimTypes.Name, user.Email),
                //new Claim(ClaimTypes.Role, user.Role)
                new Claim("email", user.Email),
                new Claim("role", user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));   //Signs the token, Prevents tampering,Must match the key used in authentication middleware

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
