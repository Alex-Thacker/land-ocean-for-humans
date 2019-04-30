import React, { Component } from 'react'

export default class PostPoolForm extends Component {
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

    handlePostPool = event => {
        event.preventDefault()

        let object = {
            userId: Number(sessionStorage.getItem("valid")),
            photoLink: "",
            timeAvailable: this.state.timeAvailable,
            cost: this.state.cost,
            description: this.state.description,
            location: this.state.location,
            dateAvailable: this.state.dateAvailable
        }
        
        this.props.postPoolAd(object)
        .then(() => this.props.history.push("/postpoolfinish"))
    }

    render() {
        return (
            <React.Fragment>
                <h1>Post a Pool!</h1>
                <p>You're making a difference</p>
                <form onSubmit={this.handlePostPool}>
                    <label>Time During the Day they can Swim: </label>
                    <input type="text" onChange={this.handleChange} id="timeAvailable" />
                    <label>Entry Fee?: (Optional) </label>
                    <input type="text" onChange={this.handleChange} id="cost" />
                    <label>Your location?: </label>
                    <input type="text" onChange={this.handleChange} id="location" />
                    <label>Date they can swim: </label>
                    <input type="date" onChange={this.handleChange} id="dateAvailable" />
                    <label>Any Other Details They Should Know?: </label>
                    <textarea cols="35" rows="3" onChange={this.handleChange} id="description" />
                    <button type="submit">Save Pool</button>
                </form>
            </React.Fragment>
        )
    }
}

// "id": 1,
// "userId": 1,
// "photoLink": "",
// "timeAvailable": "5",
// "cost": 10,
// "description": "no pets allowed",
// "location": "123 test lane",
// "dateAvailable": "4/29/19"