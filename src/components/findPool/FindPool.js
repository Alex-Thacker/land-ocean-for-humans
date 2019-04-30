import React, { Component } from 'react'

export default class FindPool extends Component {

    handlePostPool = (poolAdId) => {
        let object = {
            userId: Number(sessionStorage.getItem("valid")),
            poolAdId: poolAdId
        }

        this.props.postSavedPool(object)
    }
  render() {
      //creates an array with filter data. this compares poolAdId's with the Id from poolAds resource. this allows the user to only see pools that are not saved under user and also doesn't show pools that the user created
      let savedPoolsIdArray = this.props.savedPools.map(savedPool => savedPool.poolAdId)
      let findPoolsFiltered = this.props.findPools.filter(findPool => !savedPoolsIdArray.includes(findPool.id))
    return (
      <React.Fragment>
          <h1>Here are pools you can swim in!</h1>
        {
            findPoolsFiltered.map(findPool => 
                <div key={findPool.id}>
                    <p>{findPool.id}</p>
                    <p><strong>Time Available: </strong>{findPool.timeAvailable}</p>
                    <p><strong>Cost: </strong>{findPool.cost}</p>
                    <p><strong>Description: </strong>{findPool.description}</p>
                    <p><strong>Location: </strong>{findPool.location}</p>
                    <p><strong>Date Available: </strong>{findPool.dateAvailable}</p>
                    <div>
                    <strong>Created By: {" "}</strong>
                    {this.props.users.find(user =>
                        user.id === findPool.userId).userName}
                        </div>
                        <button onClick={() => this.handlePostPool(findPool.id)}>Save Pool</button>
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
// "poolAdId": 3

// {this.props.users.find(user =>
//     user.id === entry.userId
//   ).userName}

// "id": 3,
// "userId": 1,
// "photoLink": "",
// "timeAvailable": "522",
// "cost": 0,
// "description": "super test mode",
// "location": "555 devils lane",
// "dateAvailable": "1/29/19"