import React from 'react';

export default class Forms extends React.Component {
    constructor(props) {
        super(props)
        this.state = { //Stuff that can change here
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            supervisor: "", //may change this to something besides a string
            isEmailPreferred: false,
            isPhoneNumberPreferred: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.getManagers()
    }

    removeNumericJurisdictions(data) {
        for(var i = 0; i < data.length; i++){
            if(!(isNaN(data[i].jurisdiction))){ //returns true if the jurisdiction is a number
                data.splice(i,1)
                i--
            }
        }

        return data
    }

    async getManagers() { //method that fetches managers from API
        
        const url = "https://609aae2c0f5a13001721bb02.mockapi.io/lightfeather/managers" //location from which API pulls managers 
        const res = await fetch(url) //fetch from API
        const data = await res.json() //convert res form API to JSON
        
        const cleanedData = await this.removeNumericJurisdictions(await data) //clear out numeric jurisdictions
        
        //loop through data and remove all managers with a numeric jurisdiction 
        console.log(await cleanedData)
        console.log(await cleanedData.length)
    
    }
    

    handleChange(event) {
        //Object destructuring. Pull out name, value, type, and checkbox properties out of event.target
        const {name, value, checked, type} = event.target 
        if(type === "checkbox"){
           this.setState({
               [name]: checked
           })
           
        }else{
            this.setState({
                //name property is set to value in respective text input
                [name]: value //use square brackets since name property is a string
            })
        }
        console.log('isemailPreferred: ' + this.state.isEmailPreferred)
        console.log('isPhoneNumberPreferred: ' + this.state.isPhoneNumberPreferred)
    }

    



    handleSubmit(event){ //post info to API
        
    }

    render() {
        return( 
            <form onSubmit={this.handleSubmit}>
                <input type = "text" name = "firstName" placeholder = "First Name" onChange = {this.handleChange} />
                <input type = "text" name = "lastName" placeholder = "Last Name" onChange = {this.handleChange}/>
                <input type = "text" name = "email" placeholder = "Email" onChange = {this.handleChange}/>
                <input type = "text" name = "phoneNumber" placeholder = "Phone Number" onChange = {this.handleChange} />

                <input 
                    type = "checkbox" 
                    name = "isEmailPreferred" 
                    checked = {this.state.isEmailPreferred}
                    onChange = {this.handleChange}/> Check if you would prefer Email

                <input 
                    type = "checkbox" 
                    name = "isPhoneNumberPreferred" 
                    checked = {this.state.isPhoneNumberPreferred}
                    onChange = {this.handleChange}/> Check if you would prefer Phone Number
                
                <select
                    value = {this.state.supervisor}
                    onChange = {this.handleChange}
                    name = "supervisor"
                >
                    <option value="hello">hello</option>
                    <option value="hi">hi</option>

                </select>

                <h1>{this.state.firstName}</h1>
                <h1>{this.state.lastName}</h1>
                <h1>{this.state.email}</h1>
                <h1>{this.state.phoneNumber}</h1>
                <h1>{this.state.supervisor}</h1>
                <button> Submit </button>
            </form>
        )
    }
}