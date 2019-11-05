import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { EntityDataService } from '../../../service/entities-data-service';
import '../css/delete-product.css';

export class DeleteProduct extends React.Component {

    constructor(props) {
        super(props);
        this.productDataSevice = new EntityDataService("Products");
        this.state = { id: window.location.href.split('/')[window.location.href.split('/').length - 1], name: '', price: 0, category: '', redirectListProducts: false }
    }

    async componentDidMount() {
        const product = await this.productDataSevice.getById(this.state.id);
        this.setState({ name: product.name, price: product.price, category: product.category.name, loading: false })
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
                    <label className="delete-product-form-label" htmlFor="delete-product-name">
                        Name:
                        <input disabled className="delete-product-form-input" id="delete-product-name" type="text" name="name" value={this.state.name} />
                    </label>
                    <label className="delete-product-form-label" htmlFor="delete-product-price">
                        Price:
                        <input disabled className="delete-product-form-input" id="delete-product-price" type="text" name="price" value={this.state.price} />
                    </label>
                    <label className="delete-product-form-label" htmlFor="delete-product-category">
                        Category:
                        <input disabled className="delete-product-form-input" id="delete-product-category" type="text" name="category" value={this.state.category} />
                    </label>
                    <div className="delete-product-button">
                        <Button bsStyle="warning" type="submit">Submit</Button>
                        <Button className="cancel-delete-product" bsStyle="danger" onClick={() => this.setState({ redirectListProducts: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}