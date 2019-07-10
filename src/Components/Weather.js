import React from "react"

const pStyle = {
    fontWeight: 'bold',
}

class Weather extends React.Component {

    render() {
        return (

            <div className="singleDay" >
                {this.props.day && <p style={pStyle}> {this.props.day}</p>}
                {this.props.max_temp && <p>Max temperature:  {this.props.max_temp}°C</p>}
                {this.props.min_temp && <p>Min temperature: {this.props.min_temp}°C</p>}
                {this.props.condition && <p>Condition: {this.props.condition}</p>}
                {this.props.humidity && <p>Humidity: {this.props.humidity}</p>}
                {this.props.error && <p>{alert("Please enter the location")}</p>}
                {this.props.city && <button className={"btn btn-primary" + (this.props.id === 1 ? "" : " collapsed")} data-toggle="collapse" data-target={"#demo" + this.props.id}>
                    <span className="hideDetails">Hide details</span>
                    <span className="seeDetails">See details</span>
                </button>}
                <div id={"demo" + this.props.id} className={"collapse" + (this.props.id === 1 ? " show" : "")}>
                    {this.props.details} 
                </div>
            </div>
        )
    }
}


export default Weather

