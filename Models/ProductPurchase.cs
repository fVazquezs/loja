using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace loja.Models
{
    public class ProductPurchase
    {
        [Key, Column(Order = 0)]
        public int PurchaseId { get; set; }
        [ForeignKey("PurchaseId")]
        [Key, Column(Order = 1)]
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
        public int Quantity { get; set; }
    }
}
