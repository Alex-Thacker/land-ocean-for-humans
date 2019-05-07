import React, { Component } from 'react'
import "./findPool.css"

export default class FindPool extends Component {
  //state zipCode is needed to filter results by zipCode
  state = {
    zipCode: ""
  }

  //function is called on input fields to update state as user types in a field. event.target.id is the same as the key of state that we want to update as user types. event.target.value is what the user actually types and this.setState will alter state as user types
  handleChange = event => {
    let newState = {}
    newState[event.target.id] = event.target.value
    this.setState(newState)
  }

  //this will allow user to save a poolAd into his saved items section of the app
  handlePostPool = (poolAdId) => {
    let object = {
      userId: Number(sessionStorage.getItem("valid")),
      poolAdId: poolAdId
    }

    this.props.postSavedPool(object)
  }

  //if user doesn't save an image then I don't want the <img> tag to exisit. this functions is used to see if a img url exisits or not. if it does, it will insert the img into the card, if not then it will not show. 
  handleImg = (url) => {
    if(url !== ""){
        return <img className="card-img-top" src={url} alt="pool"/>
    }
}

  render() {

    //creates an array with filter data. this compares poolAdId's with the Id from poolAds resource. this allows the user to only see pools that are not saved under user and also doesn't show pools that the user created.  also compares the zipCode that the user types into an input field with the zipCode in the json file. this provides further filter options for the user. 
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
                {this.handleImg(findPool.url)}
                {/* <img className="card-img-top" src={findPool.url} /> */}
                  <p className="card-text"><strong>Time Available: </strong>{findPool.timeAvailable}</p>
                  <p className="card-text"><strong>Day(s) Available: </strong>{findPool.dateAvailable}</p>
                  <p className="card-text"><strong>Location: </strong>{findPool.location}</p>
                  <p className="card-text"><strong>Zipcode: </strong>{findPool.zipCode}</p>
                  <p className="card-text"><strong>Cost: $ </strong>{findPool.cost}</p>
                  <p className="card-text"><strong>Description: </strong>{findPool.description}</p>
                  {/* this will display the username of the user who created the pool Ad */}
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