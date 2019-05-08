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

    //handleChange uses something called zip = require("zipcodes"). this was installed from a npm package. this will take the zipcode the user enters, and convert it to latitude and longitude. it also provides the city, state, and country the zipcode is from. lat and long is needed because we're pulling from an external API called darkSky. the fetch call needs lat and long values to return weather data base on location. 
    handleChange = event => {
        let newState = {}
        let zip = require("zipcodes")
        let latLong = zip.lookup(event.target.value)
        newState[event.target.id] = latLong
        this.setState(newState)
    }

    //handle click takes the same data as zipObject and sets it into zipObject2. This is needed to keep the data from zipObject. when the user enters a different zipcode, handleChange will change the data for zipObject. so we store the data into zipObject2. it then takes the lat and long values we obtained and use it for the fetch call and then setState to be passed into the darkSky component. if zipObject is undefine, we don't want to do the fetch call and let the user know that the zipcode they enter (or didn't enter) is invalid and return message "Not a zipcode". the function also changes the state of darkSky from false to true. when darkSky is set to true, darkSky component will run. 
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

    render() {
        return (
            <React.Fragment>
                <div className="postPoolBackground">
                    <h1 className="viewMyPostH1">Eight Day Forecast</h1>
                    <div className="zipCodeDiv">
                        <label>Enter Zipcode Here: </label>
                        <input onChange={this.handleChange} id="zipObject" type="text" placeholder="Enter Zipcode Here" />
                        <button className="btn btn-primary searchCss" onClick={this.handleClick}>Search</button>

                        {/* when button is clicked, this.state.darkSky is set to true, which will then run the component DarkSky. zipObject2 is passed in to obtain the city and state based on the zipcode the user entered. weatherArray is the information obtained from the fetch call from darkSky API. */}
                        {this.state.darkSky && <DarkSky zipObject={this.state.zipObject2} weatherArray={this.state.weatherArray} />}
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
