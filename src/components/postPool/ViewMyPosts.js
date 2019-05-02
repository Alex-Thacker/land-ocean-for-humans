import React, { Component } from 'react'
import "./postPool.css"

export default class ViewMyPosts extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="viewMyPostH1">Here's what you posted so far</h1>
        <div className="flexContainer">
        {
            this.props.poolAds.map(poolAd => 
                <div className="card cardCss" key={poolAd.id}>
                <div className="card-body">
                    <p className="card-text"><strong>Time Available: </strong>{poolAd.timeAvailable}</p>
                    <p className="card-text"><strong>Day(s) Available: </strong>{poolAd.dateAvailable}</p>
                    <p className="card-text"><strong>Location: </strong>{poolAd.location}</p>
                    <p className="card-text"><strong>Zipcode: </strong>{poolAd.zipCode}</p>
                    <p className="card-text"><strong>Cost: $ </strong>{poolAd.cost}</p>
                    <p className="card-text"><strong>Description: </strong>{poolAd.description}</p>
                    <hr></hr>
                    <button className="btn btn-primary" onClick={() => this.props.deletePoolAd(poolAd.id)}>Delete</button>
                    <button className="btn btn-primary" onClick={() => this.props.history.push(`/viewmyposts/editpost/${poolAd.id}`)}>Edit</button>
                    </div>
                </div>
            )
        }
        </div>
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