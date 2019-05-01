import React, { Component } from 'react'


export default class Home extends Component {
  state = {
    hideClass: "hideAbout",
    showClass: ""
  }


  render() {
    return (
      <React.Fragment>
        <div className="homeCss">
          <h1>Land Ocean for Humans</h1>
          <h3>Created by Alex Thacker</h3>
          <p className={this.state.hideClass}>This application has two main features. The first is designed for people with swimming pools. The app will let them post their pool and allow the public to use it, basically turing their private pool into a public one. They have the option to charge an entry fee, set times of availability, and any other detail they would like. The second feature is for people without a pool. It allows them to find pools that other people have posted. Once they find a pool they like, they're able to save it to their personal profile. Enjoy!</p>
          <button className={`btn btn-primary ${this.state.showClass}`} onClick={() => this.setState({
            hideClass: "",
            showClass: "hideAbout"
          })}>ABOUT MY APP</button>
          <button className={`btn btn-primary ${this.state.hideClass}`} onClick={() => this.setState({
            hideClass: "hideAbout",
            showClass: ""
          })}>HIDE</button>
        </div>
      </React.Fragment>
    )
  }
}



// {/* <button type="button" onClick={() => this.props.history.push("/postpool")}>Post Pool</button>
// <button onClick={() => this.props.history.push("/findpool")}>Find Pool</button>
// <button onClick={() => this.props.history.push("/mysaveditems")}>Your Saved Items</button> */}