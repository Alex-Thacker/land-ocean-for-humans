import React, { Component } from 'react'
import DarkSky from "./DarkSky"
import ResourceManager from "../../ResourceManager"

export default class Forecast extends Component {
    state = {
        zipCode: "",
        zipObject: undefined,
        darkSky: false,
        weatherArray: [],
        zipObject2: {}
    }

    handleChange = event => {
        let newState = {}
        let zip = require("zipcodes")
        let latLong = zip.lookup(event.target.value)
        newState[event.target.id] = latLong
        this.setState(newState)
        // console.log(event.target.value.length)
        // if(event.target.value.length === 5) {
        //     newState.darkSky = false
        //     this.setState(newState)
            
        // }
    }

    handleClick = event => {
        event.preventDefault()
        let newState = {}
        newState.zipObject2 = this.state.zipObject

        if (this.state.zipObject !== undefined) {
            newState.darkSky = true
            this.setState(newState)
            // console.log(latLong)

            ResourceManager.darkSky(this.state.zipObject.latitude, this.state.zipObject.longitude)
            .then(r => this.setState({
                weatherArray: r.daily.data
            }))
        } else {
            window.alert("Not a zipcode")
        }
    }

    // test = () => {
    //     window.alert("Umm thats not a zipcode")
    //     this.setState({
    //         zipObject: {},
    //         darkSky: false
    //     })
    // }



    render() {
        return (
            <React.Fragment>
                <div className="postPoolBackground">
                    <h1 className="viewMyPostH1">Eight Day Forecast</h1>
                    <div className="zipCodeDiv">
                        <label>Enter Zipcode Here: </label>
                        <input onChange={this.handleChange} id="zipObject" type="text" placeholder="Enter Zipcode Here" />
                        <button className="btn btn-primary searchCss" onClick={this.handleClick}>Search</button>
                        {this.state.darkSky && <DarkSky zipObject={this.state.zipObject2} weatherArray={this.state.weatherArray} />}
                        {/* {this.state.zipObject === undefined && this.test()} */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
