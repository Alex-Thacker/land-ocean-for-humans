import React, { Component } from 'react'

export default class PostPool extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Post Pool Manager</h1>
        <p>From here you can either post a new pool or view your previous pool posts!</p>
        <button onClick={() => this.props.history.push("/postpool/postpoolform")}>Post New Pool</button>
        <button onClick={() => this.props.history.push("/postpool/viewmyposts")}>View My Posts</button>
      </React.Fragment>
    )
  }
}
