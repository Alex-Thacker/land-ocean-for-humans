import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/postpool">Post Pool</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/findpool">Find Pool</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mysaveditems">My Saved Items</Link>
                    </li>
                </ul>
                {/* <Link className="mr-1" onClick={() => sessionStorage.clear()} to="/">Logout</Link> */}
            </nav>
        )
    }
}
