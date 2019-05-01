import React, { Component } from 'react'
import "./login.css"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

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

        if (testLogin) {
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
