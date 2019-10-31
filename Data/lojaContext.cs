using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace loja.Models
{
    public class lojaContext : DbContext
    {
        public lojaContext (DbContextOptions<lojaContext> options)
            : base(options)
        {
        }

        public DbSet<loja.Models.User> User { get; set; }
    }
}
