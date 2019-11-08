using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace loja.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public ICollection<ProductPurchase> Product_Purchase { get; set; }

    }

    public class ProductPurchase
    {
        [Key, Column(Order = 0)]
        public int PurchaseId { get; set; }
        [ForeignKey("PurchaseId")]
        public virtual Purchase Purchase { get; set; }
        [Key, Column(Order = 1)]
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
        public int Quantity { get; set; }
    }
}
