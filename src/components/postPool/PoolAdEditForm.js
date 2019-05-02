import React, { Component } from 'react'
import ResourceManager from "../../ResourceManager"

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
        zipCode: ""
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
            zipCode: this.state.zipCode
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
                    zipCode: r.zipCode
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="postPoolBackground">
                    <h1>Edit your post</h1>
                    <form onSubmit={this.handlePutPoolAd}>
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