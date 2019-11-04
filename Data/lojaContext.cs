using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using loja.Models;

namespace loja.Models
{
    public class lojaContext : DbContext
    {
        public lojaContext (DbContextOptions<lojaContext> options)
            : base(options)
        {
        }

        public DbSet<loja.Models.User> User { get; set; }

        public DbSet<loja.Models.Employee> Employee { get; set; }

        public DbSet<loja.Models.Category> Category { get; set; }
    }
}
