import React, { Component } from 'react'
import "./forecast.css"
import clearDay from "./weatherIconPics/clearDay.png"
import rain from "./weatherIconPics/rain.2.ico"
import partlyCloudy from "./weatherIconPics/cloudy.png"
import fog from "./weatherIconPics/fog.2.png"

export default class DarkSky extends Component {
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

    twoDecimal = (number) => {
        return Number.parseFloat(number).toFixed(0);
    }

    chanceOfRain = weather => {
        if (weather.precipType !== undefined) {
            return <p>Chance of {weather.precipType}: {this.twoDecimal(weather.precipProbability * 100)}%</p>
        } else {
            return <p>Chance of precipitation: {this.twoDecimal(weather.precipProbability * 100)}%</p>
        }
    }

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
        console.log(this.props.weatherArray)
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
