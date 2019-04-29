import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <button type="button" onClick={() => this.props.history.push("/postpool")}>Post Pool</button>
        <button onClick={() => this.props.history.push("/findpool")}>Find Pool</button>
        <button onClick={() => this.props.history.push("/mysaveditems")}>Your Saved Items</button>
      </React.Fragment>
    )
  }
}
