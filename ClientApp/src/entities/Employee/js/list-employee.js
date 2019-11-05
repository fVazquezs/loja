import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { EntityDataService } from '../../../service/entities-data-service';
import { Button } from "react-bootstrap";

import "../css/list-employee.css";

export class ListEmployee extends Component {
  displayName = ListEmployee.name

  constructor(props) {
    super(props);
    this.employeeDataSevice = new EntityDataService("Employees");

    this.state = { employees: [], loading: true };

  }

  async componentDidMount() {
    const employees = await this.employeeDataSevice.getAll();
    this.setState({ employees: employees, loading: false })
  }

  renderEmployeesTable(employees) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) =>
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.cpf}</td>
              <td><Link to={`/employees/edit/${employee.id}`}><Button>Edit</Button></Link></td>
              <td><Link to={`/employees/delete/${employee.id}`}><Button bsStyle="danger">Delete</Button></Link></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderEmployeesTable(this.state.employees);

    return (
      <div>
        <h1>Employees</h1>
        <Link to='/employees/new'><Button bsStyle="info" className="new-employee-button" >Add New</Button></Link>
        {contents}
      </div>
    );
  }
}
