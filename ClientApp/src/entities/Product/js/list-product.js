import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { EntityDataService } from '../../../service/entities-data-service';
import { Button } from "react-bootstrap";

import "../css/list-product.css";

export class ListProduct extends Component {
  displayName = ListProduct.name

  constructor(props) {
    super(props);
    this.productDataSevice = new EntityDataService("Products");

    this.state = { products: [], loading: true };

  }

  async componentDidMount() {
    const products = await this.productDataSevice.getAll();
    this.setState({ products: products, loading: false })
  }

  renderProductsTable(products) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) =>
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category.name}</td>
              <td><Link to={`/products/edit/${product.id}`}><Button>Edit</Button></Link></td>
              <td><Link to={`/products/delete/${product.id}`}><Button>Delete</Button></Link></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderProductsTable(this.state.products);

    return (
      <div>
        <h1>Products</h1>
        <Link to='/products/new'><Button variant="outline-primary" className="new-product-button" >Add New</Button></Link>
        {contents}
      </div>
    );
  }
}
