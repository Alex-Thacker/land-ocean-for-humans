import React, { Component } from 'react'

export default class Login extends Component {
    state = {
        userName: "",
        password: ""
    }

    handleChange = event => {
        let newState = {}
        newState[event.target.id] = event.target.value
        this.setState(newState)
    }

    handleLogin = event => {
        event.preventDefault()

        let testLogin = this.props.users.find(user => {
           return user.userName.toLowerCase() === this.state.userName.toLowerCase() && user.password === this.state.password
        })

        if (testLogin){
            console.log(testLogin)
            // let id = this.props.users.map(user => user.id)
            sessionStorage.setItem("valid", testLogin.id)
            this.props.onLogin()
            this.props.history.push("/home")
        } else {
            window.alert("Information not found MOTHERFUC#%$")
        }
    }

  render() {
    return (
      <React.Fragment>
          <h1>Login if you want</h1>
          <form onSubmit={this.handleLogin}>
              <label>Enter Username: </label>
              <input type="text" onChange={this.handleChange} id="userName" />
              <label>Enter Password: </label>
              <input type="password" onChange={this.handleChange} id="password" />
              <button type="submit">Login</button>
          </form>
        
      </React.Fragment>
    )
  }
}
