import React, { Component } from 'react'
import ResourceManager from "../../ResourceManager"

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
        <form onSubmit={this.handleRegister}>
            <label>New Username: </label>
            <input onChange={this.handleChange} id="userName" type="text" />
            <label>New Password</label>
            <input onChange={this.handleChange} id="password" type="password" />
            <button type="submit">Register New Account</button>
            <button onClick={() => this.props.history.push("/")}>Back to Login</button>
        </form>
      </React.Fragment>
    )
  }
}
