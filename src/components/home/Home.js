import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Welcome to Land Ocean for Humans</h1>
        <h3>About</h3>
        <p>This app is designed to help people find a local pool.  Also allows users to share their private pool if they want.  From this screen you can either share your private pool by posting a new pool or find a pool by going into the find a pool section from the nav bar!</p>
        <p>You can also view your saved pools from the nav bar</p>
      </React.Fragment>
    )
  }
}



// {/* <button type="button" onClick={() => this.props.history.push("/postpool")}>Post Pool</button>
// <button onClick={() => this.props.history.push("/findpool")}>Find Pool</button>
// <button onClick={() => this.props.history.push("/mysaveditems")}>Your Saved Items</button> */}