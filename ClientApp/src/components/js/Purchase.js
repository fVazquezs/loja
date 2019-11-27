import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { EntityDataService } from '../../service/entities-data-service';
import { Button } from "react-bootstrap";
import '../css/Purchase.css'

export class Purchase extends Component {

    constructor(props) {
        super(props)
        this.purchaseDataService = new EntityDataService("Purchases");
        this.state = { id: window.location.href.split('/')[window.location.href.split('/').length - 1], purchase: { user: {}, product_Purchase: [] } }
    }

    async componentDidMount() {
        const response = await this.purchaseDataService.getById(this.state.id)
        this.setState({ purchase: response })
    }

    calculateTotal(products){
        var total = 0;
        products.map(product =>{
            total += product.product.price * product.quantity
        })
        return total;
    }

    renderProductsTable(products) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Product Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        const totalPrice = product.product.price * product.quantity;
                        return (
                            <tr key={product.product.id}>
                                <td>{product.product.name}</td>
                                <td>{product.quantity}</td>
                                <td>$ {product.product.price}</td>
                                <td>$ {totalPrice}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        );
    }


    render() {
        let contents = this.state.purchase.product_Purchase === undefined
            ? <p><em>Loading...</em></p>
            : this.renderProductsTable(this.state.purchase.product_Purchase);

        return (
            <div>
                <div className='page-title'><b>Purchase #{this.state.purchase.id}</b></div>
                <div className='purchase-user-name'></div>
                <div className='purchase-total-price'></div>
                <div className='purchase-address'>
                    <h3>Deliver To:</h3>
                    <div>{`${this.state.purchase.user.street} ${this.state.purchase.user.number}, ${this.state.purchase.user.district}`}</div>
                    <h4>Complement:</h4>
                    <div>{this.state.purchase.user.complement}</div>
                </div>
                <div className='purchase-city-state'>
                    <h4>City:</h4>
                    <div>{this.state.purchase.user.city}</div>
                    <h4>State:</h4>
                    <div>{this.state.purchase.user.state}</div>
                </div>
                <div className='purchase-cep'>
                    <h4>CEP:</h4>
                    <div>{this.state.purchase.user.cep}</div>
                    <h4>Name:</h4>
                    <div>{this.state.purchase.user.name}</div>
                </div>
                <h2>Purchase price: $ {this.calculateTotal(this.state.purchase.product_Purchase)}</h2>
                <h4>Items</h4>
                {contents}
                <Link to='/purchases'><Button>Back</Button></Link>
            </div>
        )
    }
}