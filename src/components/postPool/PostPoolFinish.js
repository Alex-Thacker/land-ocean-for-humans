import React, { Component } from 'react'

export default class PostPoolFinish extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Thank you for sharing your pool, you can either go back Home from the nav bar, post another pool, or view your posts</h1>
        <p>or click the X to close the app, but we wouldn't recommend that</p>
        <button onClick={() => this.props.history.push("/postpool/viewmyposts")}>View your posts</button>
        <button onClick={() => this.props.history.push("/postpool/postpoolform")}>Post another Pool!</button>
      </React.Fragment>
    )
  }
}
