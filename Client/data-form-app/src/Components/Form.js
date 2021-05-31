import React from "react";
import UserInfo from "./UserInfo";
import Validation from "./Validation";
import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Checkbox,
} from "@chakra-ui/react";

const API_ENDPOINT = "http://localhost:3001/api/";

export default class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Stuff that can change here
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      supervisor: "", //may change this to something besides a string
      isEmailPreferred: false,
      isPhoneNumberPreferred: false,
      supervisorArray: [""],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getManagers();
  }

  async getManagers() {
    //method that fetches managers from API
    const res = await fetch(API_ENDPOINT + "supervisors"); //fetch from API
    const data = await res.json(); //convert res form API to JSON
    this.setState({
      supervisorArray: ["", ...data],
    });
  }

  async postUserInfo(userInfo) {
    //takes in userInfo object
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // mode: 'no-cors',
      body: JSON.stringify(userInfo),
    };
    console.log(userInfo);
    await fetch(API_ENDPOINT + "submit", requestOptions);
  }

  handleChange(event) {
    //Object destructuring. Pull out name, value, type, and checkbox properties out of event.target
    const { name, value, checked, type } = event.target;
    if (type === "checkbox") {
      this.setState({
        [name]: checked,
      });
    } else {
      this.setState({
        //name property is set to value in respective text input
        [name]: value, //use square brackets since name property is a string
      });
    }
  }

  handleSubmit(event) {
    //post info to API
    //make object to be sent to api
    event.preventDefault();

    let userInfo = new UserInfo(this.state);
    //validate it
    let validation = new Validation(userInfo);

    if (!validation.isFirstNameValidValue) {
      alert("Please input your first name correctly");
    } else if (!validation.isLastNameValidValue) {
      alert("Please input your last name correctly");
    } else if (!validation.isSupervisorValidValue) {
      alert("Please pick a supervisor");
      //could not get email validation to work
    } /*else if (this.state.isEmailPreferred && this.state.isPhoneNumberPreferred){
            if(!validation.isEmailPreferredValue){
                console.log('email is wrong')
            } else if(!validation.isPhoneNumberValidValue){
                console.log('phone number is wrong')
            } else{
                console.log('sucessfully submitted')
            }
        } else if (this.state.isEmailPreferred){
            if(!validation.isEmailPreferredValue){
                console.log('Email is wrong')
            } else {
                console.log('sucessfully submitted')
            }
        } */ else if (this.state.isPhoneNumberPreferred) {
      if (!validation.isPhoneNumberValidValue) {
        alert("Please input a correct phone number");
      } else {
        this.postUserInfo(userInfo);
        alert("Success!");
      }
    } else {
      this.postUserInfo(userInfo);
      alert("Success!");
    }
  }

  render() {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex
          direction="column"
          background="cyan.500"
          p={12}
          rounded={6}
          textColor="black"
          width="75vh"
        >
          <form onSubmit={this.handleSubmit}>
            <Heading mb={3}>Notification Form</Heading>
            <Input
              variant="filled"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={this.handleChange}
              mb={3}
              borderColor="blue.600"
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              variant="filled"
              onChange={this.handleChange}
              color="black"
              mb={3}
              borderColor="blue.600"
            />
            <Input
              type="email"
              mb={3}
              name="email"
              variant="filled"
              placeholder="Email"
              onChange={this.handleChange}
              borderColor="blue.600"
            />
            <Input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              variant="filled"
              onChange={this.handleChange}
              mb={3}
              borderColor="blue.600"
            />
            <Checkbox
              type="checkbox"
              name="isEmailPreferred"
              checked={this.state.isEmailPreferred}
              onChange={this.handleChange}
              mb={2}
            />{" "}
            Check if you would prefer to be contacted via email
            <br />
            <Checkbox
              type="checkbox"
              name="isPhoneNumberPreferred"
              checked={this.state.isPhoneNumberPreferred}
              onChange={this.handleChange}
              mb={3}
            />{" "}
            Check if you would prefer to be contacted via phone
            <br />
            Select Supervisor:{" "}
            <Select
              variant="filled"
              value={this.state.supervisor}
              onChange={this.handleChange}
              name="supervisor"
              mb={3}
              borderColor="blue.600"
            >
              {this.state.supervisorArray.map((supervisor) => (
                <option value={supervisor}>{supervisor}</option>
              ))}
            </Select>
            <Button
              colorScheme="teal"
              justifyContent="center"
              alignItems="center"
              onClick={this.handleSubmit}
            >
              {" "}
              Submit{" "}
            </Button>
          </form>
        </Flex>
      </Flex>
    );
  }
}
