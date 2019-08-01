import React from "react"
import Header from "./Components/Header"
import Form from "./Components/Form"
import Weather from "./Components/Weather"
import Location from "./Components/Location"
import uuid from "uuid"


const API_KEY = "4c4d8bbea8dfac06bebcb6b2cded1401"

class App extends React.Component {

  state = {
    city: [],
    country: [],
    data: [],
    loading: undefined
  }

  componentDidMount() {
    if (localStorage.getItem('city') && localStorage.getItem('country')) {
      this.getWeather();
    }
  }

  getWeather = async (e) => {

    var newCity;
    var newCountry;
    if (e) {
    e.preventDefault();
    newCity = e.target.elements.city.value;
    newCountry = e.target.elements.country.value;
     } else {
     newCity = localStorage.getItem('city');
     newCountry = localStorage.getItem('country');
    }
    this.setState({
      loading: true,
    });

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${newCity},${newCountry}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    if (data.message === "city not found") {
      alert("The location does not exist, try it again");
      localStorage.clear();
      this.setState({
        city: "",
        country: "",
        data: [],
        loading: false
      })
      window.location.reload();
    } else {

    //separating array into 5 single days
    var todaySlices = this.getNumberOfTodaySlices(data);
    var slicesPerDay = 8;

    var day1 = data.list.slice(0, todaySlices);
    var day2 = data.list.slice(todaySlices, todaySlices + slicesPerDay);
    var day3 = data.list.slice(todaySlices + slicesPerDay, todaySlices + slicesPerDay * 2);
    var day4 = data.list.slice(todaySlices + slicesPerDay * 2, todaySlices + slicesPerDay * 3);
    var day5 = data.list.slice(todaySlices + slicesPerDay * 3, todaySlices + slicesPerDay * 4);

    this.setState((state, props) => ({
      data: this.state.data.concat([[day1, day2, day3, day4, day5]]),
      country: this.state.country.concat([newCountry]),
      city: this.state.city.concat([newCity]),
      loading: false,
    }))
  }}
  getNumberOfTodaySlices = (data) => {

    var todayForecast = 0;
    var endOfDay = 23;
    var date = new Date(data.list[0].dt * 1000);
    var today = date.getHours();
    while (today < endOfDay) {
      todayForecast++;
      today++;
    }
    return (todayForecast / 3) + 1;
  }

  render() {

    var forecast = [];
    for (var j = 0; j < this.state.city.length; j++) {
      forecast.push(
        <div>
          <Location
            city={this.state.city[j]}
            country={this.state.country[j]}
          />
          <div className="forecast">
          {[0, 1, 2, 3, 4].map(i => 
            <Weather
              keys={i}
              id={uuid.v4()}
              data={this.state.data[j][i]}
            />
          )}
          </div>
        </div>
      )
    }

    return (

      <div className="wrapper">
        <p className="loadingBtn">{this.state.loading && "Loading..."}</p>
        <Header />
        <Form
          getWeather={this.getWeather}
          city={this.state.city}
        />
          {forecast}
      </div>
    )
  }
}


export default App