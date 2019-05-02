import React, { Component } from 'react'
import "./findPool.css"

export default class FindPool extends Component {
  state = {
    zipCode: ""
  }

  handleChange = event => {
    let newState = {}
    newState[event.target.id] = event.target.value
    this.setState(newState)
  }

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
    let findPoolsFiltered = this.props.findPools.filter(findPool => !savedPoolsIdArray.includes(findPool.id) && findPool.zipCode.includes(this.state.zipCode))
    return (
      <React.Fragment>
        <h1 className="viewMyPostH1">Find a pool that fits you</h1>
        <div className="zipCodeDiv">
          <label>Filter by Zipcode: </label>
          <input onChange={this.handleChange} id="zipCode" type="text" placeholder="Enter Zipcode Here" />
          {/* <button className="btn btn-primary searchCss">Search</button> */}
        </div>
        <div className="flexContainer">
          {
            findPoolsFiltered.map(findPool =>
              <div className="card cardCss" key={findPool.id}>
                <div className="card-body">
                  <p className="card-text"><strong>Time Available: </strong>{findPool.timeAvailable}</p>
                  <p className="card-text"><strong>Day(s) Available: </strong>{findPool.dateAvailable}</p>
                  <p className="card-text"><strong>Location: </strong>{findPool.location}</p>
                  <p className="card-text"><strong>Zipcode: </strong>{findPool.zipCode}</p>
                  <p className="card-text"><strong>Cost: $ </strong>{findPool.cost}</p>
                  <p className="card-text"><strong>Description: </strong>{findPool.description}</p>
                  <div>
                    <strong>Created By: {" "}</strong>
                    {this.props.users.find(user =>
                      user.id === findPool.userId).userName}
                  </div>
                  <hr></hr>
                  <button className="btn btn-primary" onClick={() => this.handlePostPool(findPool.id)}>Save Pool</button>
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