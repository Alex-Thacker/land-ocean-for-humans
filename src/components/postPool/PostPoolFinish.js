import React, { Component } from 'react'

export default class PostPoolFinish extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Thank you for sharing your pool, you can either go back Home from the nav bar or click here to view your pool posts</h1>
        <button onClick={() => this.props.history.push("/postpool/viewmyposts")}>View your posts</button>
      </React.Fragment>
    )
  }
}