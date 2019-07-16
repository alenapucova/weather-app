import React from "react"

const pStyle = {
    fontWeight: 'bold',
}


class Weather extends React.Component {
  
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
          weatherDetail.push(this.getTime(singleDay[i].dt_txt)+ "---" + Math.round(singleDay[i].main.temp_max) + " °C ")
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
            <div className="singleDay" >
                {this.props.data && 
                    <div>
                        <p style={pStyle}> {this.getDay(this.props.data[0].dt_txt)}</p>
                        <p><i className= {`owf owf-${this.props.data[0].weather[0].id} owf-5x`} ></i></p>
                        <p>Max temperature:  {this.getMaxTemperature(this.props.data)}°C</p>
                        <p>Min temperature: {this.getMinTemperature(this.props.data)}°C</p>
                        <p>Condition:  {this.props.data[0].weather[0].description}  </p>
                        <p>Humidity: {this.props.data[0].main.humidity} </p>
                        <button className={"btn btn-primary" + (this.props.id === 0 ? "" : " collapsed")} data-toggle="collapse" data-target={"#demo" + this.props.id}>
                            <span className="hideDetails">Hide details</span>
                            <span className="seeDetails">See details</span>
                        </button>
                        <div id={"demo" + this.props.id} className={"details collapse" + (this.props.id === 0 ? " show" : "")}>
                            {this.getDetails(this.props.data).map(item => <span key={item}>{item}</span>)}
                        </div>
                    </div>
                }
            </div>
        )
    }
}


export default Weather

