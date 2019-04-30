import React, { Component } from 'react'

export default class SavedPools extends Component {
  render() {
    return (
      <React.Fragment>
        {
          this.props.savedPools.map(savedPool =>
            <div key={savedPool.id}>
              <p>{savedPool.poolAd.id}</p>
              <p><strong>Time Available: </strong>{savedPool.poolAd.timeAvailable}</p>
              <p><strong>Cost: </strong>{savedPool.poolAd.cost}</p>
              <p><strong>Description: </strong>{savedPool.poolAd.description}</p>
              <p><strong>Location: </strong>{savedPool.poolAd.location}</p>
              <p><strong>Date Available: </strong>{savedPool.poolAd.dateAvailable}</p>
              <div>
                <strong>Created By: {" "}</strong>
                {this.props.users.find(user =>
                  user.id === savedPool.poolAd.userId).userName}
              </div>
              <button onClick={() => this.props.deleteSavedPool(savedPool.id)}>Delete from Saved</button>
              <hr></hr>
            </div>
          )
        }
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