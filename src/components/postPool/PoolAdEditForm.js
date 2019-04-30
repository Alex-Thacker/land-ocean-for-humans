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
        dateAvailable: ""
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
            dateAvailable: this.state.dateAvailable
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
                    dateAvailable: r.dateAvailable
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handlePutPoolAd}>
                    <label>Time During the Day they can Swim: </label>
                    <input type="text" onChange={this.handleChange} id="timeAvailable" value={this.state.timeAvailable} />
                    <label>Entry Fee?: (Optional) </label>
                    <input type="text" onChange={this.handleChange} id="cost" value={this.state.cost} />
                    <label>Your location?: </label>
                    <input type="text" onChange={this.handleChange} id="location" value={this.state.location} />
                    <label>Date they can swim: </label>
                    <input type="date" onChange={this.handleChange} id="dateAvailable" value={this.state.dateAvailable} />
                    <label>Any Other Details They Should Know?: </label>
                    <textarea onChange={this.handleChange} id="description" value={this.state.description} />
                    <button type="submit">Save Changes</button>
                </form>
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