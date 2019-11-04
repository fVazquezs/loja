import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { EntityDataService } from '../../../service/entities-data-service';
import { Button } from "react-bootstrap";

import "../css/list-category.css";

export class ListCategory extends Component {
  displayName = ListCategory.name

  constructor(props) {
    super(props);
    this.categoryDataSevice = new EntityDataService("Categories");

    this.state = { categories: [], loading: true };

  }

  async componentDidMount() {
    const categories = await this.categoryDataSevice.getAll();
    this.setState({ categories: categories, loading: false })
  }

  renderCategoriesTable(categories) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) =>
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td><Link to={`/categories/edit/${category.id}`}><Button>Edit</Button></Link></td>
              <td><Link to={`/categories/delete/${category.id}`}><Button>Delete</Button></Link></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderCategoriesTable(this.state.categories);

    return (
      <div>
        <h1>Categories</h1>
        <Link to='/categories/new'><Button variant="outline-primary" className="new-category-button" >Add New</Button></Link>
        {contents}
      </div>
    );
  }
}
