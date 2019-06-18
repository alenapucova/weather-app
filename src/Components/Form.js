import React from "react"


class Form extends React.Component{
    render(){
        return(
            <form className="wrap-input" onSubmit={this.props.getWeather}>
                <input type="text" name="city" placeholder="City..."/>
                <input type="text" name="country" placeholder="Country..."/>
                <button className="search-button">Search</button>
            </form>
        )
    }
}

export default Form