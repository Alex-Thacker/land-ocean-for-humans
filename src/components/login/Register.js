import React, { Component } from 'react'
import ResourceManager from "../../ResourceManager"
import "./login.css"

export default class Register extends Component {
    //define state, key values match the key values from json file
    state = {
        userName: "",
        password: ""
    }

    //function is called on input fields to update state as user types in a field. event.target.id is the same as the key of state that we want to update as user types. event.target.value is what the user actually types and this.setState will alter state as user types
    handleChange = event => {
        let newState = {}
        newState[event.target.id] = event.target.value
        this.setState(newState)
    }

    //create object to be passed into postUsers. create a variable to see if the userName already exisits or not. this variable is then passed into a if statement. if username already is in use, then returns alert message, if not, then runs function to post object, then gets all user data, use another .find to match the username from json with the username from state so we can set session storage with the proper userId. then runs onLogin which will fetch all data based on current userId that was just created and then redirect user to home page. 
    handleRegister = event => {
        event.preventDefault()

        let object = {
            userName: this.state.userName,
            password: this.state.password
        }

        let mapUserName = this.props.users.find(user => user.userName.toLowerCase() === this.state.userName.toLowerCase())

        if(mapUserName) {
            window.alert("USERNAME ALREADY TAKEN YO!")
        } else {
            this.props.postUsers(object)
            .then(() => ResourceManager.getUsers())
            .then(r => r.find(user => user.userName === this.state.userName))
            .then(r => sessionStorage.setItem("valid", r.id))
            .then(() => this.props.onLogin())
            .then(() => this.props.history.push("/home"))
        }
    }
  render() {
    return (
      <React.Fragment>
        <div className="form-background">
        <h1>Register</h1>
        <form onSubmit={this.handleRegister}>
            {/* <label>New Username: </label> */}
            <input className="form-control textbox" onChange={this.handleChange} id="userName" type="text" placeholder="New Username" />
            {/* <label>New Password</label> */}
            <input className="form-control textbox" onChange={this.handleChange} id="password" type="password" placeholder="New Password" />
            <button className="btn btn-primary" type="submit">Register New Account</button>
            <button className="btn btn-primary" onClick={() => this.props.history.push("/")}>Back to Login</button>
        </form>
        </div>
      </React.Fragment>
    )
  }
}
