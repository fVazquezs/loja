import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { EntityDataService } from '../../../service/entities-data-service';
import '../css/edit-product.css';

export class EditProduct extends React.Component {

    constructor(props) {
        super(props);
        this.productDataSevice = new EntityDataService("Products");
        this.state = { id: window.location.href.split('/')[window.location.href.split('/').length - 1], name: '', redirectListProducts: false }
    }

    async componentDidMount() {
        const product = await this.productDataSevice.getById(this.state.id);
        this.setState({ name: product.name, loading: false })
    }

    editProduct = async (e) => {
        e.preventDefault();
        const response = await this.productDataSevice.update({ id: this.state.id, name: this.state.name });
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
                    <label className="new-product-form-label" htmlFor="new-product-name">
                        Name:
                        <input className="new-product-form-input" id="new-product-name" type="text" name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
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