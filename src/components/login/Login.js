import React, { Component } from 'react'
import "./login.css"

export default class Login extends Component {
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

    //create variable testLogin to match userName and password with user information from json file. if information matches, then sets sessionstorage with userId, then runs function onLogin to fetch all data based on userId and then redirect user to home screen. if untrue, user gets an alert
    handleLogin = event => {
        event.preventDefault()

        let testLogin = this.props.users.find(user => {
            return user.userName.toLowerCase() === this.state.userName.toLowerCase() && user.password === this.state.password
        })

        if (testLogin) {
            // let id = this.props.users.map(user => user.id)
            sessionStorage.setItem("valid", testLogin.id)
            this.props.onLogin()
            this.props.history.push("/home")
        } else {
            window.alert("Information not found")
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-background">
                    <h1>Login</h1>
                    <form onSubmit={this.handleLogin}>
                        <div className="card">
                            <div className="card-body">
                                {/* <label className="textbox">Enter Username: </label> */}
                                <input className="form-control textbox" type="text" onChange={this.handleChange} id="userName" placeholder="Username" />
                                {/* <label className="textbox" for="exampleInputPassword1">Enter Password: </label> */}
                                <input className="form-control textbox" type="password" onChange={this.handleChange} id="password" placeholder="password" />
                                <div className="button-padding">
                                    <button className="btn btn-primary" type="submit">Login</button>
                                    <button className="btn btn-primary" onClick={() => this.props.history.push("/register")}>Register New User</button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

            </React.Fragment>
        )
    }
}
