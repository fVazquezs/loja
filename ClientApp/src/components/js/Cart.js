import React from 'react';
import { Button } from 'react-bootstrap';
import '../css/Cart.css';

export class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.cartService = props.cartService;
        this.state = { cart: this.cartService.getCart() }
    }

    removeItem = product => {
        this.cartService.removeItem(product);
        this.setState({ cart: this.cartService.getCart() })
    }

    render() {
        return (
            <div>
                Your Cart
                Total: {this.cartService.totalCartPrice()}
                <div className='cart-product-list'>
                    {this.state.cart.map(item => {
                        return (
                            <div className='cart-product-card' key={item.product.id}>
                                <div>{item.product.name}</div>
                                <div>$ <b>{item.product.price}</b></div>
                                <div>Quantity: {item.quantity}</div>
                                <div><Button className='cart-product-delete' bsStyle='danger' onClick={() => this.removeItem(item)}>X</Button></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}