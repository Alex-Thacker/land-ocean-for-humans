import React, { Component } from 'react'
import ResourceManager from "../../ResourceManager"
import "./login.css"

export default class Register extends Component {
    state = {
        userName: "",
        password: ""
    }

    handleChange = event => {
        let newState = {}
        newState[event.target.id] = event.target.value
        this.setState(newState)
    }

    handleRegister = event => {
        event.preventDefault()

        let object = {
            userName: this.state.userName,
            password: this.state.password
        }

        let mapUserName = this.props.users.find(user => user.userName === this.state.userName)

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
