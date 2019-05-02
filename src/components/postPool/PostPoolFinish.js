import React, { Component } from 'react'

export default class PostPoolFinish extends Component {
  //basic page with some jsx. contains two buttons to take user to two different paths
  render() {
    return (
      <React.Fragment>
        <h1 className="viewMyPostH1">Thank you for sharing your pool!!!</h1>
        <div className="postPoolFinish">
        <button className="btn btn-primary" onClick={() => this.props.history.push("/postpool/postpoolform")}>Post another Pool!</button>
        <button className="btn btn-primary" onClick={() => this.props.history.push("/postpool/viewmyposts")}>View your posts</button>
        </div>
      </React.Fragment>
    )
  }
}
