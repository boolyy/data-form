export default class Validation {
    constructor(userInfo) {
        this.userInfo = userInfo //pass user info into class
    }

    get isSupervisorValidValue() {
        return this.isSupervisorValid()
    }

    get isFirstNameValidValue() { 
        return this.isFirstNameValid()
    }

    get isLastNameValidValue() {
        return this.isLastNameValid()
    }

    get isEmailValidValue() {
        return this.isEmailValid()
    }

    get isPhoneNumberValidValue() {
        return this.isPhoneNumberValid()
    }

    isSupervisorValid() { //make sure supervisor string is not empty
        let supervisorString = this.userInfo.supervisor
        if(supervisorString === ""){ //check if it's equal to empty string
            return false
        } else {
            return true
        }

    }

    isPhoneNumberValid() {
        const phoneNumber = this.userInfo.phoneNumber
        const allowedCharacters = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        if(phoneNumber.match(allowedCharacters)){
            return true
        } else {
            return false
        }
    }

    isEmailValid() {
        const email = this.userInfo.email
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return filter.test(email)
    }


    isFirstNameValid() { //checks if first name is valid
        let firstName = this.userInfo.firstName
        const letters = /^[A-Za-z]+$/ //allowed characters in name (no numbers)
        if(firstName.match(letters)){ //checks if all letters in name match above letters
            return true
        } else {
            return false
        }
    }

    isLastNameValid() { //checks if last name is valid
        let lastName = this.userInfo.lastName
        const letters = /^[A-Za-z]+$/
        if(lastName.match(letters)){
            return true
        } else {
            return false
        }
    }
}