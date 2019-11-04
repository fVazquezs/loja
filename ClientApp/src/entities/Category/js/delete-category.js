import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { EntityDataService } from '../../../service/entities-data-service';
import '../css/delete-category.css';

export class DeleteCategory extends React.Component {

    constructor(props) {
        super(props);
        this.categoryDataSevice = new EntityDataService("Categories");
        this.state = { id: window.location.href.split('/')[window.location.href.split('/').length - 1], name: '', redirectListCategories: false }
    }

    async componentDidMount() {
        const category = await this.categoryDataSevice.getById(this.state.id);
        this.setState({ name: category.name, loading: false })
    }

    deleteCategory = async (e) => {
        e.preventDefault();
        const response = await this.categoryDataSevice.delete(this.state.id);
        if (response.status === 200) {
            this.setState({ redirectListCategories: true })
        }
    }

    render() {
        if (this.state.redirectListCategories) {
            return <Redirect to='/categories' />
        }
        return (
            <div>
                <h1>Delete Category</h1>
                <form onSubmit={this.deleteCategory}>
                    <label className="new-category-form-label" htmlFor="new-category-name">
                        Name:
                        <input disabled className="new-category-form-input" id="new-category-name" type="text" name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <div className="delete-category-button">
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button className="cancel-delete-category" variant="primary" onClick={() => this.setState({ redirectListCategories: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}