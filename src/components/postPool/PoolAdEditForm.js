import React, { Component } from 'react'
import ResourceManager from "../../ResourceManager"
import { storage } from "../firebaseConfig/Firebase"

export default class PoolAdEditForm extends Component {
    //define state for data to be passed into
    state = {
        userId: "",
        photoLink: "",
        timeAvailable: "",
        cost: "",
        description: "",
        location: "",
        dateAvailable: "",
        zipCode: "",
        // photoLink: "",
        url: "",
        loadMax: "",
        loadMin: ""
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

    //if user doesn't save an image then I don't want the <img> tag to exisit. this functions is used to see if a img url exisits or not. if it does, it will insert the img into the card, if not then it will not show. 
    handleImg = () => {
        if(this.state.url !== ""){
            return <img className="previewImg" src={this.state.url} alt="pool or something pool related... I hope" />
        }
    }

    //function is called on input fields to update state as user types in a field. event.target.id is the same as the key of state that we want to update as user types. event.target.value is what the user actually types and this.setState will alter state as user types
    handleChange = event => {
        let newState = {}
        newState[event.target.id] = event.target.value
        this.setState(newState)
    }

    //preventDefault will stop page from refreshing. create object to be passed into putPoolAd function. uses state, which changes based on when the user types. use history.push to take user to path we want after user clicks submit button. 
    handlePutPoolAd = event => {
        event.preventDefault()

        let object = {
            id: this.props.match.params.poolAdId,
            userId: Number(sessionStorage.getItem("valid")),
            photoLink: "",
            timeAvailable: this.state.timeAvailable,
            cost: this.state.cost,
            description: this.state.description,
            location: this.state.location,
            dateAvailable: this.state.dateAvailable,
            zipCode: this.state.zipCode,
            url: this.state.url
        }

        this.props.putPoolAd(object)
            .then(() => this.props.history.push("/postpool/viewmyposts"))
    }

    //use componentDidMount to get data so we can pre fill the input fields with the current data. we pass the data from fetch call into state and state is used in the value fields within the input tags. 
    componentDidMount() {
        ResourceManager.getOnePoolAd(this.props.match.params.poolAdId)
            .then(r => {
                this.setState({
                    photoLink: r.photoLink,
                    timeAvailable: r.timeAvailable,
                    cost: r.cost,
                    description: r.description,
                    location: r.location,
                    dateAvailable: r.dateAvailable,
                    zipCode: r.zipCode,
                    url: r.url
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="postPoolBackground">
                    <h1>Edit your post</h1>
                    <label className="progressLabel">Progress: </label>
                    <progress value={this.state.loadMin} max={this.state.loadMax}></progress>
                            <input type="file" onChange={this.handlePhoto} id="photoLink" />
                            <div>
                            <button className="btn btn-primary saveImage" type="button" onClick={() => this.handleUpload()}>Save image</button>
                            </div>
                            {this.handleImg()}
                    <form className="postPoolForm" onSubmit={this.handlePutPoolAd}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Time During the Day they can Swim: </label>
                                <input className="form-control textbox" type="text" onChange={this.handleChange} id="timeAvailable" value={this.state.timeAvailable} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>What day(s) are you open?: </label>
                                <input className="form-control textbox" type="text" onChange={this.handleChange} id="dateAvailable" value={this.state.dateAvailable} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Your location?: </label>
                                <input className="form-control textbox" type="text" onChange={this.handleChange} id="location" value={this.state.location} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Your zipcode?: </label>
                                <input className="form-control textbox" type="text" onChange={this.handleChange} id="zipCode" value={this.state.zipCode} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Entry Fee?: (Optional) </label>
                                <input className="form-control textbox" type="text" onChange={this.handleChange} id="cost" value={this.state.cost} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Any Other Details They Should Know?: </label>
                                <input className="form-control textbox" onChange={this.handleChange} id="description" value={this.state.description} />
                            </div>
                            <button className="btn btn-primary" type="submit">Save Changes</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}