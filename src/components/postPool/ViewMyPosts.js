import React, { Component } from 'react'

export default class ViewMyPosts extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Here's what you posted so far</h1>
        {
            this.props.poolAds.map(poolAd => 
                <div key={poolAd.id}>
                    <p><strong>Time Available: </strong>{poolAd.timeAvailable}</p>
                    <p><strong>Cost: </strong>{poolAd.cost}</p>
                    <p><strong>Description: </strong>{poolAd.description}</p>
                    <p><strong>Location: </strong>{poolAd.location}</p>
                    <p><strong>Date Available: </strong>{poolAd.dateAvailable}</p>
                    <button onClick={() => this.props.deletePoolAd(poolAd.id)}>Delete</button>
                    <button onClick={() => this.props.history.push(`/viewmyposts/editpost/${poolAd.id}`)}>Edit</button>
                    <hr></hr>
                </div>
            )
        }
      </React.Fragment>
    )
  }
}

// "id": 3,
// "userId": 1,
// "photoLink": "",
// "timeAvailable": "522",
// "cost": 0,
// "description": "super test mode",
// "location": "555 devils lane",
// "dateAvailable": "1/29/19"