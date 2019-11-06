using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace loja.Models
{
    public class Client : User
    {
        public String CEP { get; set; }
        public String Street { get; set; }
        public String Number { get; set; }
        public String District { get; set; }
        public String City { get; set; }
        public String State { get; set; }
        public String Complement { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
