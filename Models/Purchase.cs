using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace loja.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public ICollection<ProductPurchase> Product_Purchase { get; set; }

    }

    public class ProductPurchase
    {
        public int PurchaseId { get; set; }
        [ForeignKey("PurchaseId")]
        public virtual Purchase Purchase { get; set; }
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product{ get; set; }
    }
}
