import React, { Component } from 'react'
import "./postPool.css"

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
                <div className="postPoolBackground">
                    <h1>Post a Pool!</h1>
                    <form onSubmit={this.handlePostPool}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Time During the Day they can Swim: </label>
                                <input className="form-control textbox" type="text" onChange={this.handleChange} id="timeAvailable" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Entry Fee?: (Optional) </label>
                                <input className="form-control textbox" type="text" onChange={this.handleChange} id="cost" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Your location?: </label>
                                <input className="form-control textbox" type="text" onChange={this.handleChange} id="location" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Date they can swim: </label>
                                <input className="form-control textbox" type="date" onChange={this.handleChange} id="dateAvailable" />
                            </div>
                            <div className="form-group">
                                <label>Any Other Details They Should Know?: </label>
                                <input className="form-control textbox" type="text" onChange={this.handleChange} id="description" />
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

// "id": 1,
// "userId": 1,
// "photoLink": "",
// "timeAvailable": "5",
// "cost": 10,
// "description": "no pets allowed",
// "location": "123 test lane",
// "dateAvailable": "4/29/19"