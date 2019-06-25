import React from "react"

class Location extends React.Component{
   
    render(){
        return(
            <div className="location">
                
                {this.props.city &&  <p> Location: {this.props.city},{this.props.country}</p>}
                
            </div>
        )
    }
}


export default Location