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

    // handlePutPoolAd = event => {

    // }

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
            <div>
                {this.state.timeAvailable}
      </div>
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