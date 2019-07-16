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
    data: [],
    loading: undefined
  }
  
  componentDidMount(){
    if (localStorage.getItem('city') && localStorage.getItem('country')) {
      this.getWeather();
    }
  }

  getWeather = async (e) => {

    var city;
    var country;
    if (e) {
      e.preventDefault();
      city = e.target.elements.city.value;
      country = e.target.elements.country.value;
    } else {
      city = localStorage.getItem('city');
      country = localStorage.getItem('country');
    }

    this.setState({
      loading: true,
    })


    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data);

    this.setState({
      loading: false
    })

    if (data.message === "city not found") {
      alert("The location does not exist, try it again");
      localStorage.clear();
      this.setState({
        city: "",
        country: "",
        data: []
      })
    } else {

      //separating array into 5 single days
      var todaySlices = this.getNumberOfTodaySlices(data);
      var slicesPerDay = 8;

      var day1 = data.list.slice(0, todaySlices);
      var day2 = data.list.slice(todaySlices, todaySlices + slicesPerDay);
      var day3 = data.list.slice(todaySlices + slicesPerDay, todaySlices + slicesPerDay * 2);
      var day4 = data.list.slice(todaySlices + slicesPerDay * 2, todaySlices + slicesPerDay * 3);
      var day5 = data.list.slice(todaySlices + slicesPerDay * 3, todaySlices + slicesPerDay * 4);

      console.log(data);
      this.setState({
        city: data.city.name,
        country: data.city.country,
        data: [day1, day2, day3, day4, day5]
      })
    }
  }
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
    var wetherDay = [];
    for (var i = 0; i < 5; i++) {
      wetherDay.push(
        <Weather
          key={i}
          id={i}
          data={this.state.data[i]}
        />);
    }
    return (

      <div className="wrapper">
        <p className="loadingBtn">{this.state.loading && "Loading..."}</p>
        <Header />
        <Form
          getWeather={this.getWeather}
          city={this.state.city}
        />
        <Location
          city={this.state.city}
          country={this.state.country}
        />
        <div className="forecast">
          {wetherDay}
        </div>
      </div>
    )
  }
}


export default App