import React, { Component } from 'react'
import "./postPool.css"
import { storage } from "../firebaseConfig/Firebase"

export default class PostPoolForm extends Component {
    //define state for data to be passed through it
    state = {
        userId: "",
        // photoLink: "",
        url: "",
        timeAvailable: "",
        cost: "",
        description: "",
        location: "",
        dateAvailable: "",
        zipCode: "",
        loadMin: "",
        loadMax: ""
    }

    handlePhoto = event => {
        if (event.target.files[0]) {
            const image = event.target.files[0]
            this.setState({
                photoLink: image
            })
        }
    }

    handleUpload = () => {
        const image = this.state.photoLink
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on("state_changed",
            (snapshot) => {
                console.log(snapshot.bytesTransferred)
                console.log(snapshot.totalBytes)
                this.setState({
                    loadMin: snapshot.bytesTransferred,
                    loadMax: snapshot.totalBytes
                })
            },
            (error) => {
                console.log(error)
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log(url)
                    this.setState({ url })
                })
            }
        )


    }

    //function is called on input fields to update state as user types in a field. event.target.id is the same as the key of state that we want to update as user types. event.target.value is what the user actually types and this.setState will alter state as user types
    handleChange = event => {
        let newState = {}
        newState[event.target.id] = event.target.value
        this.setState(newState)
    }

    //function is called when user clicks submit button. event.preventDefault to stop button from refreshing page. creates object to be passed into postPoolAd function. then uses props.history to take the user to the path we want. 
    handlePostPool = event => {
        event.preventDefault()

        let object = {
            userId: Number(sessionStorage.getItem("valid")),
            url: this.state.url,
            timeAvailable: this.state.timeAvailable,
            cost: this.state.cost,
            description: this.state.description,
            location: this.state.location,
            dateAvailable: this.state.dateAvailable,
            zipCode: this.state.zipCode
        }

        this.props.postPoolAd(object)
            .then(() => this.props.history.push("/postpoolfinish"))
    }

    //if user doesn't save an image then I don't want the <img> tag to exisit. this functions is used to see if a img url exisits or not. if it does, it will insert the img into the card, if not then it will not show. 
    handleImg = () => {
        if (this.state.url !== "") {
            return <img className="previewImg" src={this.state.url} alt="pool" />
        }
    }

render() {
    return (
        <React.Fragment>
            {/* basic jsx form. id's of input fields math the key values of state so we know which key of state we want to alter.  */}
            <div className="postPoolBackground">
                <h1>Post a Pool!</h1>
                <label className="progressLabel">Progress: </label>
                <progress value={this.state.loadMin} max={this.state.loadMax}></progress>
                <input type="file" onChange={this.handlePhoto} id="photoLink" />
                <div>
                    <button className="btn btn-primary saveImage" type="button" onClick={() => this.handleUpload()}>Upload</button>
                </div>
                {this.handleImg()}
                <form className="postPoolForm" onSubmit={this.handlePostPool}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Time During the Day they can Swim: </label>
                            <input className="form-control textbox" type="text" onChange={this.handleChange} id="timeAvailable" placeholder="Example: Noon-5pm" />
                        </div>
                        <div className="form-group col-md-6">
                            <label>What day(s) are you open?: </label>
                            <input className="form-control textbox" type="text" onChange={this.handleChange} id="dateAvailable" placeholder="Example: Monday-Friday, Weekends" />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Your location?: </label>
                            <input className="form-control textbox" type="text" onChange={this.handleChange} id="location" placeholder="Where you at?" />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Your zipcode?: </label>
                            <input className="form-control textbox" type="text" onChange={this.handleChange} id="zipCode" placeholder="Example: 90210" />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Entry Fee?: (Optional) </label>
                            <input className="form-control textbox" type="text" onChange={this.handleChange} id="cost" placeholder="You want to charge?" />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Any Other Details They Should Know?: </label>
                            <input className="form-control textbox" type="text" onChange={this.handleChange} id="description" placeholder="Anything else?" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Save Pool</button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}
}