import React, { Component } from 'react'
import ResourceManager from "../../ResourceManager"

export default class PoolAdEditForm extends Component {
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

    handleChange = event => {
        let newState = {}
        newState[event.target.id] = event.target.value
        this.setState(newState)
    }

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

// "id": 3,
// "userId": 1,
// "photoLink": "",
// "timeAvailable": "522",
// "cost": 0,
// "description": "super test mode",
// "location": "555 devils lane",
// "dateAvailable": "1/29/19"