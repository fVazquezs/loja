import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { EntityDataService } from '../../../service/entities-data-service';
import '../css/delete-employee.css';

export class DeleteEmployee extends React.Component {

    constructor(props) {
        super(props);
        this.employeeDataSevice = new EntityDataService("Employees");
        this.state = { id: window.location.href.split('/')[window.location.href.split('/').length - 1], email: '', position: '', password: '', cpf: '', name: '', redirectListEmployees: false }
    }

    async componentDidMount() {
        const employee = await this.employeeDataSevice.getById(this.state.id);
        this.setState({ name: employee.name, email: employee.email, cpf: employee.cpf, position:employee.position, password: employee.password, loading: false })
    }

    deleteEmployee = async (e) => {
        e.preventDefault();
        const response = await this.employeeDataSevice.delete(this.state.id);
        if (response.status === 200) {
            this.setState({ redirectListEmployees: true })
        }
    }

    render() {
        if (this.state.redirectListEmployees) {
            return <Redirect to='/employees' />
        }
        return (
            <div>
                <h1>Delete Employee</h1>
                <form onSubmit={this.deleteEmployee}>
                    <label className="new-employee-form-label" htmlFor="new-employee-name">
                        Name:
                        <input disabled className="new-employee-form-input" id="new-employee-name" type="text" name="name" value={this.state.name} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-email">
                        Email:
                        <input disabled className="new-employee-form-input" id="new-employee-email" type="email" name="email" value={this.state.email} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-cpf">
                        CPF:
                        <input disabled className="new-employee-form-input" id="new-employee-cpf" type="text" name="cpf" maxLength="11" value={this.state.cpf} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-position">
                        Position:
                        <input className="new-employee-form-input" id="new-employee-position" type="text" name="position" value={this.state.position} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-password">
                        Password:
                        <input disabled className="new-employee-form-input" id="new-employee-password" type="password" name="password" value={this.state.password} />
                    </label>
                    <div className="delete-employee-button">
                        <Button variant="primary" type="submit">Delete</Button>
                        <Button className="cancel-delete-employee" variant="primary" onClick={() => this.setState({ redirectListEmployees: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}