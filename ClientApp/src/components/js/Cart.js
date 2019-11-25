import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import '../css/Cart.css';
import { EntityDataService } from '../../service/entities-data-service';

export class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.cartService = props.cartService;
        this.userService = props.userLoginDataService;
        this.purchaseDataService = new EntityDataService("Purchases")
        this.state = { cart: this.cartService.getCart(), orderId: null, showAlert: false }
    }

    removeItem = product => {
        this.cartService.removeItem(product);
        this.setState({ cart: this.cartService.getCart() })
    }

    buyCart = async () => {
        const response = await this.purchaseDataService.create({
            userId: this.userService.getId(),
            Product_Purchase: this.state.cart.map(item => {
                return { ProductId: item.product.id, quantity: parseInt(item.quantity) }
            })
        })

        if (response.status === 201) {
            this.cartService.removeAll();
            this.setState({ cart: this.cartService.getCart(), showAlert: true, orderId: response.data.id })
        }
    }
    render() {
        let buy = this.state.cart.length > 0 ?
            (
                <div>
                    <div className="total-cart">
                        Total: $ {this.cartService.totalCartPrice()}
                    </div>
                    <Button className="cart-confirm-button" bsStyle="success" onClick={() => this.buyCart()}>Buy</Button>
                </div>
            ) : <div className='empty-cart'> Your cart is empty :/ </div>;

        let alert = this.state.showAlert ? <Alert bsStyle='success' onDismiss={() => this.setState({ showAlert: false })} >Success, your order has been placed, order ID: {this.state.orderId}</Alert>
            : null;
        return (
            <div>
                <div className='page-title'><b>Your Cart</b></div>
                {alert}
                <div className='cart-product-list'>
                    {this.state.cart.map(item => {
                        return (
                            <div className='cart-product-card' key={item.product.id}>
                                <div>Product: {item.product.name}</div>
                                <div>Price: $ <b>{item.product.price}</b></div>
                                <div>Quantity: {item.quantity}</div>
                                <div><Button className='cart-product-delete' bsStyle='danger' onClick={() => this.removeItem(item)}>X</Button></div>
                            </div>
                        )
                    })}
                    {buy}
                </div>
            </div>
        )
    }
}