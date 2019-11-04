import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { EntityDataService } from '../../../service/entities-data-service';
import '../css/edit-category.css';

export class EditCategory extends React.Component {

    constructor(props) {
        super(props);
        this.categoryDataSevice = new EntityDataService("Categories");
        this.state = { id: window.location.href.split('/')[window.location.href.split('/').length - 1], name: '', redirectListCategories: false }
    }

    async componentDidMount() {
        const category = await this.categoryDataSevice.getById(this.state.id);
        this.setState({ name: category.name, loading: false })
    }

    editCategory = async (e) => {
        e.preventDefault();
        const response = await this.categoryDataSevice.update({ id: this.state.id, name: this.state.name });
        if (response.status === 204) {
            this.setState({ redirectListCategories: true })
        }
    }

    render() {
        if (this.state.redirectListCategories) {
            return <Redirect to='/categories' />
        }
        return (
            <div>
                <h1>Edit Category</h1>
                <form onSubmit={this.editCategory}>
                    <label className="new-category-form-label" htmlFor="new-category-name">
                        Name:
                        <input className="new-category-form-input" id="new-category-name" type="text" name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <div className="edit-category-button">
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button className="cancel-edit-category" variant="primary" onClick={() => this.setState({ redirectListCategories: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}