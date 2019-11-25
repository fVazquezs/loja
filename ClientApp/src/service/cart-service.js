export class CartService {
    constructor() {
        this.cart = [];
    }

    addToCart(product, quantity) {
        var add = true;
        this.cart.map(productInCart => {
            if (productInCart.product.id === product.id)
                add = false;
        })
        if (add)
            this.cart.push({ product, quantity })
    }

    removeItem(product){
        this.cart = this.cart.filter(productInCart => {
            return productInCart.product.id !== product.product.id
        })
    }

    totalCartPrice(){
        var price = 0;
        this.cart.map(product => price += product.product.price * product.quantity)
        return price;
    }

    getCart() {
        return this.cart;
    }
}