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
        dateAvailable: "",
        zipCode: ""
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
            dateAvailable: this.state.dateAvailable,
            zipCode: this.state.zipCode
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

// "id": 1,
// "userId": 1,
// "photoLink": "",
// "timeAvailable": "5",
// "cost": 10,
// "description": "no pets allowed",
// "location": "123 test lane",
// "dateAvailable": "4/29/19"