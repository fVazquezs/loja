import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { EntityDataService } from '../../../service/entities-data-service';
import '../css/create-category.css';

export class CreateCategory extends React.Component {

    constructor(props) {
        super(props);
        this.categoryDataSevice = new EntityDataService("Categories");
        this.state = { name: '', redirectListCategories: false }
    }

    createCategory = async (e) => {
        e.preventDefault();
        const response = await this.categoryDataSevice.create({ name: this.state.name });
        if (response.status === 201) {
            this.setState({ redirectListCategories: true })
        }
    }

    render() {
        if (this.state.redirectListCategories) {
            return <Redirect to='/categories' />
        }
        return (
            <div>
                <h1>Create Category</h1>
                <form onSubmit={this.createCategory}>
                    <label className="new-category-form-label" htmlFor="new-category-name">
                        Name:
                        <input className="new-category-form-input" id="new-category-name" type="text" name="name" onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <div className="create-category-button">
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button className="cancel-create-category" variant="primary" onClick={() => this.setState({ redirectListCategories: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}