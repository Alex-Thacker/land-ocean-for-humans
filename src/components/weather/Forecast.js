import React, { Component } from 'react'
import DarkSky from "./DarkSky"
import ResourceManager from "../../ResourceManager"

export default class Forecast extends Component {
    state = {
        zipCode: "",
        zipObject: {},
        darkSky: false,
        weatherArray: []
    }

    handleChange = event => {
        let newState = {}
        newState[event.target.id] = event.target.value
        this.setState(newState)
    }
    // var zipcodes = require('zipcodes');
    // var hills = zipcodes.lookup(37146);
    // console.log(hills.latitude)
    handleClick = event => {
        event.preventDefault()
        if (this.state.zipCode !== "") {
            let newState = {}
            let zip = require("zipcodes")
            let latLong = zip.lookup(this.state.zipCode)
            newState.zipObject = latLong
            newState.darkSky = true
            this.setState(newState)
            console.log(latLong)

            ResourceManager.darkSky(latLong.latitude, latLong.longitude)
            .then(r => this.setState({
                weatherArray: r.daily.data
            }))
        } else {
            window.alert("Did you enter a Zipcode?")
        }
    }

    test = () => {
        window.alert("Umm thats not a zipcode")
        this.setState({
            zipObject: {},
            darkSky: false
        })
    }



    render() {
        return (
            <React.Fragment>
                <div className="postPoolBackground">
                    <h1 className="viewMyPostH1">Eight Day Forecast</h1>
                    <div className="zipCodeDiv">
                        <label>Enter Zipcode Here: </label>
                        <input onChange={this.handleChange} id="zipCode" type="text" placeholder="Enter Zipcode Here" />
                        <button className="btn btn-primary searchCss" onClick={this.handleClick}>Search</button>
                        {this.state.darkSky && this.state.zipObject !== undefined && <DarkSky zipObject={this.state.zipObject} weatherArray={this.state.weatherArray} />}
                        {this.state.zipObject === undefined && this.test()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
