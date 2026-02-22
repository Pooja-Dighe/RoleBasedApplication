using Microsoft.EntityFrameworkCore;
using RoleBasedLoginSln.Models;
using System.Runtime.CompilerServices;

namespace RoleBasedLoginSln.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) { }   // parameter passed to constructor which contains Database provider (SQL Server, SQLite, etc.) Connection string Logging settingsLazy loading options

        public DbSet<User> Users { get; set; }
    }
}
