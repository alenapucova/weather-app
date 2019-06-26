import React from "react"
import Header from "./Components/Header"
import Form from "./Components/Form"
import Weather from "./Components/Weather"
import Location from "./Components/Location"

const API_KEY = "4c4d8bbea8dfac06bebcb6b2cded1401"

class App extends React.Component {

  state = {
    city: undefined,
    country: undefined,
    day: [],
    max_temp: [],
    min_temp: [],
    condition: [],
    humidity: [],
    error: undefined,
    loading:undefined
  }
  getWeather = async (e) => {

    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    
    this.setState({
      loading: true
    })

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    this.setState({
      loading: false
    })

    if (city && country) {
      console.log(data);
      this.setState({
        city: data.city.name,
        country: data.city.country,
        day: ['Today', 'Tomorrow', this.getDay(data.list[15].dt_txt), this.getDay(data.list[23].dt_txt), this.getDay(data.list[31].dt_txt)],
        max_temp: [data.list[0].main.temp_max, data.list[7].main.temp_max, data.list[15].main.temp_max, data.list[23].main.temp_max, data.list[31].main.temp_max],
        min_temp: [data.list[0].main.temp_min, data.list[7].main.temp_min, data.list[15].main.temp_min, data.list[23].main.temp_min, data.list[31].main.temp_min],
        condition: [data.list[0].weather[0].description, data.list[7].weather[0].description, data.list[15].weather[0].description, data.list[23].weather[0].description, data.list[31].weather[0].description],
        humidity: [data.list[0].main.humidity, data.list[7].main.humidity, data.list[15].main.humidity, data.list[23].main.humidity, data.list[31].main.humidity],
        error: ""
      })
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        error: "Please enter the location"
      })
    }
  }
  getDay = (myDate) => {
    const date = new Date(myDate);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  render() {
    return (
      
      <div className="wrapper">
        <p className="loadingBtn">{this.state.loading && "Loading..."}</p>
        <Header  />
        <Form getWeather={this.getWeather} />
        <Location
          city={this.state.city}
          country={this.state.country}
        />
        <Weather
          error={this.state.error}
        />
        <div className="forecast">
          <Weather
            city={this.state.city}
            country={this.state.country}
            day={this.state.day[0]}
            max_temp={this.state.max_temp[0]}
            min_temp={this.state.min_temp[0]}
            condition={this.state.condition[0]}
            humidity={this.state.humidity[0]}
          />
          <Weather
            city={this.state.city}
            country={this.state.country}
            day={this.state.day[1]}
            max_temp={this.state.max_temp[1]}
            min_temp={this.state.min_temp[1]}
            condition={this.state.condition[1]}
            humidity={this.state.humidity[1]}
          />
          <Weather
            city={this.state.city}
            country={this.state.country}
            day={this.state.day[2]}
            max_temp={this.state.max_temp[2]}
            min_temp={this.state.min_temp[2]}
            condition={this.state.condition[2]}
            humidity={this.state.humidity[2]}
          />
          <Weather
            city={this.state.city}
            country={this.state.country}
            day={this.state.day[3]}
            max_temp={this.state.max_temp[3]}
            min_temp={this.state.min_temp[3]}
            condition={this.state.condition[3]}
            humidity={this.state.humidity[3]}
          />
          <Weather
            city={this.state.city}
            country={this.state.country}
            day={this.state.day[4]}
            max_temp={this.state.max_temp[4]}
            min_temp={this.state.min_temp[4]}
            condition={this.state.condition[4]}
            humidity={this.state.humidity[4]}
          />
        </div>
      </div>

    )

  }
}


export default App