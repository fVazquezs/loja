import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { EntityDataService } from '../../../service/entities-data-service';
import '../css/edit-product.css';

export class EditProduct extends React.Component {

    constructor(props) {
        super(props);
        this.productDataSevice = new EntityDataService("Products");
        this.categoryDataSevice = new EntityDataService("Categories");
        this.state = { id: window.location.href.split('/')[window.location.href.split('/').length - 1], name: '', price: 0, category: '', CategoryId: 0, categories: [], redirectListProducts: false }
    }

    async componentDidMount() {
        const product = await this.productDataSevice.getById(this.state.id);
        const categories = await this.categoryDataSevice.getAll();
        this.setState({ name: product.name, price: product.price, category: product.category.name, CategoryId: product.category.id, categories: categories, loading: false })
    }

    editProduct = async (e) => {
        e.preventDefault();
        const response = await this.productDataSevice.update({ id: this.state.id, name: this.state.name, price: this.state.price, CategoryId: this.state.CategoryId });
        if (response.status === 204) {
            this.setState({ redirectListProducts: true })
        }
    }

    render() {
        if (this.state.redirectListProducts) {
            return <Redirect to='/products' />
        }
        return (
            <div>
                <h1>Edit Product</h1>
                <form onSubmit={this.editProduct}>
                    <label className="edit-product-form-label" htmlFor="edit-product-name">
                        Name:
                        <input className="edit-product-form-input" id="edit-product-name" type="text" name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <label className="edit-product-form-label" htmlFor="edit-product-price">
                        Price:
                        <input className="edit-product-form-input" id="edit-product-price" type="text" name="price" value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} />
                    </label>
                    <label className="edit-product-form-label" htmlFor="edit-product-category">
                        Category:
                        <div className="edit-product-form-dropdown">
                            <select className="edit-product-form-select" id="edit-product-category" value={this.state.CategoryId} onChange={(e) => this.setState({ CategoryId: e.target.value })} name="categpry">
                                {this.state.categories.map(cat => {
                                    return <option key={cat.id} value={cat.id}>{cat.name}</option>
                                })}
                            </select>
                        </div>
                    </label>
                    <div className="edit-product-button">
                        <Button bsStyle="primary" type="submit">Submit</Button>
                        <Button className="cancel-edit-product" bsStyle="danger" onClick={() => this.setState({ redirectListProducts: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}