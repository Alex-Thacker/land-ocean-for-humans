import React, { Component } from 'react'

export default class SavedPools extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="viewMyPostH1">Pools you've saved</h1>
        <div className="flexContainer">
        {
          this.props.savedPools.map(savedPool =>
            <div className="card cardCss" key={savedPool.id}>
            <div className="card-body">
              <p><strong>Time Available: </strong>{savedPool.poolAd.timeAvailable}</p>
              <p><strong>Day(s) Available: </strong>{savedPool.poolAd.dateAvailable}</p>
              <p><strong>Location: </strong>{savedPool.poolAd.location}</p>
              <p><strong>Zipcode: </strong>{savedPool.poolAd.zipCode}</p>
              <p><strong>Cost: $ </strong>{savedPool.poolAd.cost}</p>
              <p><strong>Description: </strong>{savedPool.poolAd.description}</p>
              <div>
                <strong>Created By: {" "}</strong>
                {this.props.users.find(user =>
                  user.id === savedPool.poolAd.userId).userName}
              </div>
              <hr></hr>
              <button className="btn btn-primary" onClick={() => this.props.deleteSavedPool(savedPool.id)}>Delete from Saved</button>
              </div>
            </div>
          )
        }
        </div>
      </React.Fragment>
    )
  }
}


// "id": 1,
// "userId": 1,
// "photoLink": "",
// "timeAvailable": "10 pm",
// "cost": 10,
// "description": "no pets allowed",
// "location": "123 test lane",
// "dateAvailable": "4/29/19"