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
    details: [],
    images:[],
    loading:undefined,
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
      
    //separating array into 5 single days
    var todaySlices = this.getNumberOfTodaySlices(data);
    var slicesPerDay = 8;

    var day1 = data.list.slice(0,todaySlices);
    var day2 = data.list.slice(todaySlices,todaySlices + slicesPerDay);
    var day3 = data.list.slice(todaySlices + slicesPerDay, todaySlices + slicesPerDay * 2);
    var day4 = data.list.slice(todaySlices + slicesPerDay * 2, todaySlices + slicesPerDay * 3);
    var day5 = data.list.slice(todaySlices + slicesPerDay * 3, todaySlices + slicesPerDay * 4);
    
  
    console.log(data);
    this.setState({
      city: data.city.name,
      country: data.city.country,
      day: ['Today', 'Tomorrow', this.getDay(data.list[15].dt_txt), this.getDay(data.list[23].dt_txt), this.getDay(data.list[31].dt_txt)],
      max_temp: [this.getMaxTemperature(day1),this.getMaxTemperature(day2),this.getMaxTemperature(day3),this.getMaxTemperature(day4),this.getMaxTemperature(day5)],
      min_temp: [this.getMinTemperature(day1),this.getMinTemperature(day2),this.getMinTemperature(day3),this.getMinTemperature(day4),this.getMinTemperature(day5)],
      condition: [data.list[0].weather[0].description, data.list[7].weather[0].description, data.list[15].weather[0].description, data.list[23].weather[0].description, data.list[31].weather[0].description],
      images: [`owf owf-${data.list[0].weather[0].id} owf-5x`,`owf owf-${data.list[7].weather[0].id} owf-5x`,`owf owf-${data.list[15].weather[0].id} owf-5x`,`owf owf-${data.list[23].weather[0].id} owf-5x`,`owf owf-${data.list[31].weather[0].id} owf-5x`],
      humidity: [data.list[0].main.humidity, data.list[7].main.humidity, data.list[15].main.humidity, data.list[23].main.humidity, data.list[31].main.humidity],
      details:  [this.getDetails(day1),this.getDetails(day2),this.getDetails(day3),this.getDetails(day4),this.getDetails(day5)],
    })  
    
      
      
  }
  getNumberOfTodaySlices = (data) => {
    
    var todayForecast = 0;
    var endOfDay = 23;
    var date = new Date(data.list[0].dt * 1000);
    var today = date.getHours();
    while (today < endOfDay){
      todayForecast++;
      today++;
    }
    return (todayForecast/3) +1 ;
  }
  
  getMinTemperature = (singleDay) => {
    var min = [];

    for (var i = 0;i < singleDay.length;i++){
      min.push(singleDay[i].main.temp_min)
    }
    console.log(min)
    return(Math.round(Math.min(...min)))
  }
  getMaxTemperature = (singleDay) => {
    var max = [];

    for (var i = 0; i < singleDay.length; i++){
      max.push(singleDay[i].main.temp_max)
    }
    console.log(max)
    return(Math.round(Math.max(...max)))
  }
  //detailed temperature for each day
  getDetails = (singleDay) => {
    var weatherDetail = [];
        
    for (var i= 0; i < singleDay.length; i++){
      weatherDetail.push(this.getTime(singleDay[i].dt_txt)+ "---",Math.round(singleDay[i].main.temp_max) + " °C ")
    }
    
    return weatherDetail;
  }
  getDay = (myDate) => {
    const date = new Date(myDate);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }
  getTime = (myDate) => {
    const date = new Date(myDate);
    const hour = date.getHours().toString();
    var time = "";

    if(hour < 12){
      time = " am"
    }else{
      time = " pm"
    }
    return hour + time ;
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
        <div className="forecast">
          <Weather 
            id={1}
            city={this.state.city}
            country={this.state.country}
            day={this.state.day[0]}
            max_temp={this.state.max_temp[0]}
            min_temp={this.state.min_temp[0]}
            condition={this.state.condition[0]}
            humidity={this.state.humidity[0]}
            details={this.state.details[0]}
            images={this.state.images[0]}
          />
          <Weather 
            id={2}
            city={this.state.city}
            country={this.state.country}
            day={this.state.day[1]}
            max_temp={this.state.max_temp[1]}
            min_temp={this.state.min_temp[1]}
            condition={this.state.condition[1]}
            humidity={this.state.humidity[1]}
            details={this.state.details[1]}
            images={this.state.images[1]}
          />
          <Weather 
            id={3}
            city={this.state.city}
            country={this.state.country}
            day={this.state.day[2]}
            max_temp={this.state.max_temp[2]}
            min_temp={this.state.min_temp[2]}
            condition={this.state.condition[2]}
            humidity={this.state.humidity[2]}
            details={this.state.details[2]}
            images={this.state.images[2]}
          />
          <Weather 
            id={4}
            city={this.state.city}
            country={this.state.country}
            day={this.state.day[3]}
            max_temp={this.state.max_temp[3]}
            min_temp={this.state.min_temp[3]}
            condition={this.state.condition[3]}
            humidity={this.state.humidity[3]}
            details={this.state.details[3]}
            images={this.state.images[3]}
          />
          <Weather 
            id={5}
            city={this.state.city}
            country={this.state.country}
            day={this.state.day[4]}
            max_temp={this.state.max_temp[4]}
            min_temp={this.state.min_temp[4]}
            condition={this.state.condition[4]}
            humidity={this.state.humidity[4]}
            details={this.state.details[4]}
            images={this.state.images[4]}
          />
        </div>
      </div>

    )

  }
}


export default App