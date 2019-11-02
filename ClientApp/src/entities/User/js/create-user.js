import React from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';

export class CreateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', cpf: '', name: ''}
    }

    createUser(e){
        e.preventDefault();
        const form = e.currentTarget;

        console.log(form)
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.createUser}>
                    <FormGroup>
                        <label htmlFor="new-user-name">Name</label>
                        <FormControl id="new-user-name" type="text" placeholder="Enter name" onChange={(value)=>console.log(value)} />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="new-user-cpf">CPF</label>
                        <FormControl id="new-user-cpf" type="cpf" placeholder="Enter cpf" />
                    </FormGroup>
                    
                    <FormGroup>
                        <label htmlFor="new-user-email">Email</label>
                        <FormControl id="new-user-email" type="email" placeholder="Enter email" />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="new-user-password">Password</label>
                        <FormControl id="new-user-password" type="password" placeholder="Password" />
                    </FormGroup>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                this is a new user
            </div>
        )
    }
}