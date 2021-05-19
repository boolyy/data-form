import React from 'react';

export default class Forms extends React.Component {
    constructor(props) {
        super(props)
        this.state = { //Stuff that can change here
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""

        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            //name property is set to value in respective text input
            [event.target.name]: event.target.value //use square brackets since name property is a string
        })
    }

    render() {
        return( 
            <form>
                <input type = "text" name = "firstName" placeholder = "First Name" onChange = {this.handleChange} />
                <input type = "text" name = "lastName" placeholder = "Last Name" onChange = {this.handleChange}/>
                <input type = "text" name = "email" placeholder = "Email" onChange = {this.handleChange}/>
                <input type = "text" name = "phoneNumber" placeholder = "Phone Number" onChange = {this.handleChange} />
                <h1>{this.state.firstName}</h1>
                <h1>{this.state.lastName}</h1>
                <h1>{this.state.email}</h1>
            </form>
        )
    }
}