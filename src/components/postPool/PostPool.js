import React, { Component } from 'react'

export default class PostPool extends Component {
  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.props.history.push("/postpool/postpoolform")}>Post New Pool</button>
        <button onClick={() => this.props.history.push("/postpool/viewmyposts")}>View My Posts</button>
      </React.Fragment>
    )
  }
}
