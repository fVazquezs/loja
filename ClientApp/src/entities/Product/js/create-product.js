import React from 'react';
import { Redirect } from 'react-router';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { EntityDataService } from '../../../service/entities-data-service';
import '../css/create-product.css';

export class CreateProduct extends React.Component {

    constructor(props) {
        super(props);
        this.productDataSevice = new EntityDataService("Products");
        this.categoryDataSevice = new EntityDataService("Categories");
        this.state = { name: '', price: 0, CategoryId: 0, categories: [], redirectListProducts: false, loading: true }
    }

    async componentDidMount() {
        const categories = await this.categoryDataSevice.getAll();
        this.setState({ CategoryId: categories[0].id, categories: categories, loading: false })
    }

    createProduct = async (e) => {
        e.preventDefault();
        const response = await this.productDataSevice.create({ name: this.state.name, price: this.state.price, CategoryId: this.state.CategoryId });
        if (response.status === 201) {
            this.setState({ redirectListProducts: true })
        }
    }

    render() {
        if (this.state.loading) {
            return <div>loading</div>
        }
        if (this.state.redirectListProducts) {
            return <Redirect to='/products' />
        }
        return (
            <div>
                <h1>Create Product</h1>
                <form onSubmit={this.createProduct}>
                    <label className="new-product-form-label" htmlFor="new-product-name">
                        Name:
                        <input className="new-product-form-input" id="new-product-name" type="text" name="name" onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <label className="new-product-form-label" htmlFor="new-product-price">
                        Price:
                        <input className="new-product-form-input" id="new-product-price" type="text" name="price" onChange={(e) => this.setState({ price: e.target.value })} />
                    </label>
                    <label className="new-product-form-label" htmlFor="new-product-category">
                        Category:
                        <div className="new-product-form-dropdown">
                            <select className="new-product-form-select" id="new-product-category" onChange={(e) => this.setState({ CategoryId: e.target.value })} name="category">
                                {this.state.categories.map(cat => {
                                    return <option key={cat.id} value={cat.id}>{cat.name}</option>
                                })}
                            </select>
                        </div>
                    </label>
                    <div className="create-product-button">
                        <Button bsStyle="primary" type="submit">Submit</Button>
                        <Button className="cancel-create-product" bsStyle="danger" onClick={() => this.setState({ redirectListProducts: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}