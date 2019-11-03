using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loja.Models
{
    public class Employee : User
    {
        public DateTime StartDate { get; set; }
        public String Position { get; set; }
    }
}
