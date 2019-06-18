import React from "react"
import Header from "./Components/Header"
import Form from "./Components/Form"
import Weather from "./Components/Weather"
import { async } from "q";

const API_KEY = "4c4d8bbea8dfac06bebcb6b2cded1401"

class App extends React.Component{

  getWeather = async (e) =>{
    e.preventDefault();
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data);
  }
  render(){
    return(
      <div className="wrapper">
        <Header/>
        <Form getWeather={this.getWeather}/>
        <Weather/>
      </div>
    )
  }
}


export default App