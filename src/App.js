import React from "react"
import Header from "./Components/Header"
import Form from "./Components/Form"
import Weather from "./Components/Weather"
import Location from "./Components/Location"



const API_KEY = "4c4d8bbea8dfac06bebcb6b2cded1401"

class App extends React.Component{
  
  state ={
    day: [],
    city: undefined,
    country: undefined,
    max_temp: [],
    min_temp: [],
    condition: [],
    humidity: [],
    error: undefined
  }
  getWeather = async (e) =>{
    
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    console.log(data);

    
    
    if (city && country) {
      console.log(data);
      this.setState({
        //day: [data.list[0].dt_txt,data.list[7].dt_txt,data.list[15].dt_txt,data.list[23].dt_txt,data.list[31].dt_txt],
        day: ['Today','Tomorrow',this.getDay(data.list[15].dt_txt),this.getDay(data.list[23].dt_txt),this.getDay(data.list[31].dt_txt)],
        city: data.city.name,
        country: data.city.country,
        max_temp: [data.list[0].main.temp_max,data.list[7].main.temp_max,data.list[15].main.temp_max,data.list[23].main.temp_max,data.list[31].main.temp_max],
        min_temp: [data.list[0].main.temp_min,data.list[7].main.temp_min,data.list[15].main.temp_min,data.list[23].main.temp_min,data.list[31].main.temp_min],
        condition: [data.list[0].weather[0].description,data.list[7].weather[0].description,data.list[15].weather[0].description,data.list[23].weather[0].description,data.list[31].weather[0].description],
        humidity: [data.list[0].main.humidity,data.list[7].main.humidity,data.list[15].main.humidity,data.list[23].main.humidity,data.list[31].main.humidity],
        error: ""
      }) 
    } else {
      this.setState({
        day: undefined,
        city: undefined,
        country: undefined,
        max_temp: undefined,
        min_temp: undefined,
        condition: undefined,
        humidity: undefined,  
        error: "Please enter the location"
      }) 
    }
  }
  getDay = (myDate) => {
    const date = new Date(myDate);
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[date.getDay()];
  }
 
  render(){
    return(
      <div className="wrapper">
        <Header/>
        <Form getWeather={this.getWeather}/>
        <Location 
            city={this.state.city}
            country={this.state.country}
        />
        <div className="forecast">
        <Weather 
            day= {this.state.day[0]}
            city={this.state.city}
            country={this.state.country}
            max_temp={this.state.max_temp[0]}
            min_temp={this.state.min_temp[0]}
            condition={this.state.condition[0]}
            humidity={this.state.humidity[0]}
            error={this.state.error}
        />
        <Weather
            day={this.state.day[1]} 
            city={this.state.city}
            country={this.state.country}
            max_temp={this.state.max_temp[1]}
            min_temp={this.state.min_temp[1]}
            condition={this.state.condition[1]}
            humidity={this.state.humidity[1]}
            error={this.state.error}
        />
        <Weather
            day={this.state.day[2]}
            city={this.state.city}
            country={this.state.country}
            max_temp={this.state.max_temp[2]}
            min_temp={this.state.min_temp[2]}
            condition={this.state.condition[2]}
            humidity={this.state.humidity[2]}
            error={this.state.error}
        />
        <Weather
            day={this.state.day[3]}
            city={this.state.city}
            country={this.state.country}
            max_temp={this.state.max_temp[3]}
            min_temp={this.state.min_temp[3]}
            condition={this.state.condition[3]}
            humidity={this.state.humidity[3]}
            error={this.state.error}
        />
        <Weather
            day={this.state.day[4]}
            city={this.state.city}
            country={this.state.country}
            max_temp={this.state.max_temp[4]}
            min_temp={this.state.min_temp[4]}
            condition={this.state.condition[4]}
            humidity={this.state.humidity[4]}
            error={this.state.error}
        />
        </div> 
      </div>
    )
  }
}


export default App