import React, { Component } from 'react'
import "./postPool.css"

export default class ViewMyPosts extends Component {

  //if user doesn't save an image then I don't want the <img> tag to exisit. this functions is used to see if a img url exisits or not. if it does, it will insert the img into the card, if not then it will not show. 
  handleImg = (url) => {
    if(url !== ""){
        return <img className="card-img-top" src={url} alt="pool" />
    }
}

  render() {
    return (
      <React.Fragment>
        <h1 className="viewMyPostH1">Here's what you posted so far</h1>
        {/* div for flexContainer is needed to style the cards to display in a way i want them to.  */}
        <div className="flexContainer">
        {
          // iterates through poolAds array to build jsx
            this.props.poolAds.map(poolAd => 
                <div className="card cardCss" key={poolAd.id}>
                <div className="card-body">
                    {this.handleImg(poolAd.url)}
                    {/* <img className="card-img-top" src={poolAd.url} /> */}
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