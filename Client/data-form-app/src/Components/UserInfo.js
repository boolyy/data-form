export default class UserInfo {
    constructor(state) {
        this.firstName = state.firstName
        this.lastName = state.lastName
        this.supervisor = state.supervisor
        this.isEmailPreferred = state.isEmailPreferred
        if(this.isEmailPreferred){ //only add email if it is preferred
            this.email = state.email
        }
        this.isPhoneNumberPreferred = state.isPhoneNumberPreferred
        if(state.isPhoneNumberPreferred){
            this.phoneNumber = state.phoneNumber
        }
    }
}