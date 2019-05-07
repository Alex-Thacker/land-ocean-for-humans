import React, { Component } from 'react'

export default class SavedPools extends Component {

  //if user doesn't save an image then I don't want the <img> tag to exisit. this functions is used to see if a img url exisits or not. if it does, it will insert the img into the card, if not then it will not show. 
  handleImg = (url) => {
    if(url !== ""){
        return <img className="card-img-top" src={url} alt="pool" />
    }
}

  render() {
    return (
      <React.Fragment>
        <h1 className="viewMyPostH1">Pools you've saved</h1>
        <div className="flexContainer">
        {/* map is needed to iterate through the array of savedPools. after that, we use the data where we want it to be displayed.  Bootstrap classes are added for styling.  */}
        {
          this.props.savedPools.map(savedPool =>
            <div className="card cardCss" key={savedPool.id}>
            <div className="card-body">
            {this.handleImg(savedPool.poolAd.url)}
            {/* <img className="card-img-top" src={savedPool.poolAd.url} /> */}
              <p><strong>Time Available: </strong>{savedPool.poolAd.timeAvailable}</p>
              <p><strong>Day(s) Available: </strong>{savedPool.poolAd.dateAvailable}</p>
              <p><strong>Location: </strong>{savedPool.poolAd.location}</p>
              <p><strong>Zipcode: </strong>{savedPool.poolAd.zipCode}</p>
              <p><strong>Cost: $ </strong>{savedPool.poolAd.cost}</p>
              <p><strong>Description: </strong>{savedPool.poolAd.description}</p>
              {/* use a find method to see which user created the poolAd and then display their userName */}
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