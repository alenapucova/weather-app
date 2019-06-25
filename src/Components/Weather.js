import React from "react"



const pStyle = {
    fontWeight: 'bold' ,
}

class Weather extends React.Component{
 
    render(){
        return(
            <div className="single_day" > 
              
               
                {this.props.day &&  <p style={pStyle}> {this.props.day}</p>}
                {this.props.max_temp &&  <p>Max temperature:  {this.props.max_temp}°C</p>}
                {this.props.min_temp &&  <p>Min temperature: {this.props.min_temp}°C</p>}
                {this.props.condition &&  <p>Condition: {this.props.condition}</p>}
                {this.props.humidity && <p>Humidity: {this.props.humidity}</p>}
                {this.props.error && <p>{this.props.error}</p>}
                
            </div>
           
        )
    }
}


export default Weather