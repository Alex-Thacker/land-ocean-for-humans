import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./navbar.css"
import "../home/home.css"

//basic nav bar to help user get where he wants
export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark navCss">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/postpool/postpoolform">Post Pool</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/postpool/viewmyposts">View My Posts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/findpool">Find Pool</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mysaveditems">My Saved Items</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/forecast">Forecast</Link>
                    </li>
                    <li className="nav-item"><Link className="ml-10 nav-link" onClick={() => sessionStorage.clear()} to="/">Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
