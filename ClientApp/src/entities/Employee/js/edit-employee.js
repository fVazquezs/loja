import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { EntityDataService } from '../../../service/entities-data-service';
import '../css/edit-employee.css';

export class EditEmployee extends React.Component {

    constructor(props) {
        super(props);
        this.employeeDataSevice = new EntityDataService("Employees");
        this.state = { id: window.location.href.split('/')[window.location.href.split('/').length - 1], email: '', position: '', password: '', cpf: '', name: '', redirectListEmployees: false }
    }

    async componentDidMount() {
        const employee = await this.employeeDataSevice.getById(this.state.id);
        this.setState({ name: employee.name, email: employee.email, cpf: employee.cpf, position:employee.position, password: employee.password, loading: false })
    }

    editEmployee = async (e) => {
        e.preventDefault();
        const response = await this.employeeDataSevice.update({ id: this.state.id, name: this.state.name, email: this.state.email, cpf: this.state.cpf, position:this.state.position, password: this.state.password });
        if (response.status === 204) {
            this.setState({ redirectListEmployees: true })
        }
    }

    render() {
        if (this.state.redirectListEmployees) {
            return <Redirect to='/employees' />
        }
        return (
            <div>
                <h1>Edit Employee</h1>
                <form onSubmit={this.editEmployee}>
                    <label className="new-employee-form-label" htmlFor="new-employee-name">
                        Name:
                        <input className="new-employee-form-input" id="new-employee-name" type="text" name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-email">
                        Email:
                        <input className="new-employee-form-input" id="new-employee-email" type="email" name="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-cpf">
                        CPF:
                        <input className="new-employee-form-input" id="new-employee-cpf" type="text" name="cpf" maxLength="11" value={this.state.cpf} onChange={(e) => this.setState({ cpf: e.target.value })} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-position">
                        Position:
                        <input className="new-employee-form-input" id="new-employee-position" type="text" name="position"  value={this.state.position} onChange={(e) => this.setState({ position: e.target.value })} />
                    </label>
                    <label className="new-employee-form-label" htmlFor="new-employee-password">
                        Password:
                        <input className="new-employee-form-input" id="new-employee-password" type="password" name="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                    </label>
                    <div className="edit-employee-button">
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button className="cancel-edit-employee" variant="primary" onClick={() => this.setState({ redirectListEmployees: true })}>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}