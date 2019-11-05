import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { EntityDataService } from '../../../service/entities-data-service';
import '../css/delete-product.css';

export class DeleteProduct extends React.Component {

    constructor(props) {
        super(props);
        this.productDataSevice = new EntityDataService("Products");
        this.state = { id: window.location.href.split('/')[window.location.href.split('/').length - 1], name: '', redirectListProducts: false }
    }

    async componentDidMount() {
        const product = await this.productDataSevice.getById(this.state.id);
        this.setState({ name: product.name, loading: false })
    }

    deleteProduct = async (e) => {
        e.preventDefault();
        const response = await this.productDataSevice.delete(this.state.id);
        if (response.status === 200) {
            this.setState({ redirectListProducts: true })
        }
    }

    render() {
        if (this.state.redirectListProducts) {
            return <Redirect to='/products' />
        }
        return (
            <div>
                <h1>Delete Product</h1>
                <form onSubmit={this.deleteProduct}>
                    <label className="new-product-form-label" htmlFor="new-product-name">
                        Name:
                        <input disabled className="new-product-form-input" id="new-product-name" type="text" name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <div className="delete-product-button">
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button className="cancel-delete-product" variant="primary" onClick={() => this.setState({ redirectListProducts: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}