import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { EntityDataService } from '../../../service/entities-data-service';
import '../css/create-employee.css';

export class CreateEmployee extends React.Component {

    constructor(props) {
        super(props);
        this.employeeDataSevice = new EntityDataService("Employees");
        this.state = { email: '', position: '', password: '', cpf: '', name: '', redirectListEmployees: false }
    }

    createEmployee = async (e) => {
        e.preventDefault();
        const response = await this.employeeDataSevice.create({ name: this.state.name, email: this.state.email, cpf: this.state.cpf, position: this.state.position, password: this.state.password, startDate: new Date() });
        if (response.status === 201) {
            this.setState({ redirectListEmployees: true })
        }
    }

    render() {
        if (this.state.redirectListEmployees) {
            return <Redirect to='/employees' />
        }
        return (
            <div>
                <h1>Create Employee</h1>
                <form onSubmit={this.createEmployee}>
                    <label className="new-employee-form-label" htmlFor="new-employee-name">
                        Name:
                        <input className="new-employee-form-input" id="new-employee-name" type="text" name="name" onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-email">
                        Email:
                        <input className="new-employee-form-input" id="new-employee-email" type="email" name="email" onChange={(e) => this.setState({ email: e.target.value })} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-cpf">
                        CPF:
                        <input className="new-employee-form-input" id="new-employee-cpf" type="text" name="cpf" maxLength="11" onChange={(e) => this.setState({ cpf: e.target.value })} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-position">
                        Position:
                        <input className="new-employee-form-input" id="new-employee-position" type="text" name="position" onChange={(e) => this.setState({ position: e.target.value })} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-password">
                        Password:
                        <input className="new-employee-form-input" id="new-employee-password" type="password" name="password" onChange={(e) => this.setState({ password: e.target.value })} />
                    </label>
                    <div className="create-employee-button">
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button className="cancel-create-employee" variant="primary" onClick={() => this.setState({ redirectListEmployees: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}