import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { EntityDataService } from '../../service/entities-data-service';
import { Button } from "react-bootstrap";

export class Purchases extends Component {

    constructor(props) {
        super(props)
        this.purchasesDataService = new EntityDataService('Purchases')

        this.state = { purchases: [], loading: true };
    }

    async componentDidMount() {
        const purchases = await this.purchasesDataService.getAll();
        this.setState({ purchases: purchases, loading: false })
    }

    calculateTotalPrice(products){
        var total = 0;
        products.map(product =>{
            total += product.product.price * product.quantity
        })
        return total;
    }

    renderPurchasesTable(purchases) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User Name</th>
                        <th>Price</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((purchase) => {
                        const totalPrice = this.calculateTotalPrice(purchase.product_Purchase);
                        return (
                            <tr key={purchase.id}>
                                <td>{purchase.id}</td>
                                <td>{purchase.user.name}</td>
                                <td>$ {totalPrice}</td>
                                <td>{purchase.product_Purchase.length}</td>
                                <td><Link to={`/purchases/details/${purchase.id}`}><Button>View</Button></Link></td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        );
    }

    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderPurchasesTable(this.state.purchases);
        return (
            <div>
                <div className='page-title'><b>Purchases History</b></div>
                {contents}
            </div>
        )
    }
}