import React, { Component } from 'react'
import "./forecast.css"
import clearDay from "./weatherIconPics/clearDay.png"
import rain from "./weatherIconPics/rain.2.ico"
import partlyCloudy from "./weatherIconPics/cloudy.png"
import fog from "./weatherIconPics/fog.2.png"

export default class DarkSky extends Component {
    //function is used to convert UNIX time to a readable format.  darkSky API used UNIX time. the argument t is where you input the UNIX time. 
    timeStamp = t => {
        let dt = new Date(t * 1000);
        let year = dt.getFullYear()
        let month = dt.getMonth()
        let weekDay = dt.getDay();
        let day = dt.getDate()
        let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        let dateObject = {
            weekDay: weekDays[weekDay],
            day: day,
            month: allMonths[month],
            year: year
        }

        return dateObject
    }

    //when using chance of rain, it starts as a decimal from the darkSky API. we take the decimal and multiply by a 100 to convert to a percent and then use this function to not have any decimal points
    noDecimal = (number) => {
        return Number.parseFloat(number).toFixed(0);
    }

    //the data will sometimes return weather.precipType as undefine if there was a 0% chance of rain. if it came back undefine i wanted to change the string to something else that made more sense. I also multiply precipProbability by 100 to convert it from decimal to percent. and run function noDecimal so that no decimal points appear. 
    chanceOfRain = weather => {
        if (weather.precipType !== undefined) {
            return <p>Chance of {weather.precipType}: {this.noDecimal(weather.precipProbability * 100)}%</p>
        } else {
            return <p>Chance of precipitation: {this.noDecimal(weather.precipProbability * 100)}%</p>
        }
    }

    //the data brought back something called "icon". I wanted to place an icon for the most common values. I hardcoded some pictures into my file and when icon equals a certain value, a picture will appear base on it
    weatherIcon = weather => {
        if (weather.icon === "clear-day") {
            return <img className="weatherIcon" src={clearDay} alt="sun" />
        }
        if (weather.icon === "rain") {
            return <img className="weatherIcon" src={rain} alt="rain" />
        }
        if (weather.icon === "partly-cloudy-day") {
            return <img className="weatherIcon" src={partlyCloudy} alt="partlyCloudy" />
        }
        if (weather.icon === "partly-cloudy-night") {
            return <img className="weatherIcon" src={partlyCloudy} alt="partlyCloudy" />
        }
        if (weather.icon === "fog") {
            return <img className="weatherIcon" src={fog} alt="fog" />
        }
    }

    render() {
        return (
            <div>
                <h2 className="testH2">For: {this.props.zipObject.city}, {this.props.zipObject.state}</h2>
                <div className="weatherFlexContainer">
                    {
                        this.props.weatherArray.map(weather =>
                            <div className="card cardCss" key={weather.time}>
                                <div className="card-body">
                                {this.weatherIcon(weather)}
                                    <h3>{this.timeStamp(weather.time).weekDay}</h3>
                                    <p>{this.timeStamp(weather.time).month} {this.timeStamp(weather.time).day}, {this.timeStamp(weather.time).year}</p>
                                    <p>High: {weather.temperatureHigh} F</p>
                                    <p>Low: {weather.temperatureLow} F</p>
                                    {this.chanceOfRain(weather)}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
