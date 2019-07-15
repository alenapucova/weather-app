import React from "react"

class Form extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            city: "",
            country: ""
        }
    }
    
    handleChange = (event) => {
        const input = event.target;
        const value = input.value;

        this.setState({ [input.name]: value});
    }
    handleFormSubmit = () => {
        const {city, country} = this.state;
        localStorage.setItem('city', city);
        localStorage.setItem('country', country);
    }
    componentDidMount(){
        const city = localStorage.getItem('city');
        const country = localStorage.getItem('country');
        this.setState({city,country});
    }

    render(){
        return(
            <form className="wrap-input" onSubmit={this.props.getWeather} >
                <input type="text" name="city"  value={this.state.city}  onChange={this.handleChange} required placeholder="City..."/>
                <input type="text" name="country"  value={this.state.country} onChange={this.handleChange} required placeholder="Country..."/>
               
                <button onClick={this.handleFormSubmit} className="search-button">Get weather</button>
            </form>
        )
    }
}

export default Form