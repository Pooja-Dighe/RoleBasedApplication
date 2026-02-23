using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoleBasedLoginSln.Data;
using RoleBasedLoginSln.DTOs;
using RoleBasedLoginSln.Helpers;
using RoleBasedLoginSln.Models;

namespace RoleBasedLoginSln.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        public AuthController(DataContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var validRole = new[]
            {
                RoleConstants.Principal,
                RoleConstants.Teacher,
                RoleConstants.Admin
                };

            if (!validRole.Contains(registerDto.Role))
            {
                return BadRequest("Invalid Role");
            }

            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return BadRequest("User already exists!");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            var user = new User {
                Email = registerDto.Email,
                PasswordHash = hashedPassword,
                Role = registerDto.Role
            };

            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(new { message = "User registered" });
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var loginuser = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if (loginuser == null) {
                return Unauthorized("User not found");
            }

            bool isvalid = BCrypt.Net.BCrypt.Verify(loginDto.Password,loginuser.PasswordHash);
            if (!isvalid)
            {
                return Unauthorized("Invalid Password");
            }

            var token = JwtHelper.GenerateTokens(loginuser, _config);

            return Ok(new { token,
                loginuser.Email,
                loginuser.PasswordHash
            });
        }


        [Authorize(Roles =RoleConstants.Admin)]
        [HttpGet("admin-data")]
        public IActionResult AdminData()
        {
            return Ok("Admin-Page");
        }

        [Authorize(Roles = RoleConstants.Principal)]
        [HttpGet("principal-data")]
        public IActionResult PrincipalData()
        {
            return Ok("Principal-Page");
        }


        [Authorize(Roles = RoleConstants.Teacher)]
        [HttpGet("Teacher-data")]
        public IActionResult TeacherData()
        {
            return Ok("Teacher-Page");
        }
    }
}
