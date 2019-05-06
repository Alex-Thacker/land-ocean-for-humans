import React, { Component } from 'react'
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"

//runs components NavBar and ApplicationViews

export default class LandOcean extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    )
  }
}
