import React, { Component } from 'react'


class Usercontact extends Component{
    constructor(props){
        super(props)
        this.state={
            name:props.location.state.name,
            email:props.location.state.email,
            mob:props.location.state.mob

        }
    }


    render(){
        return(
            <div className='details'>
                <h3> User details are as follows</h3>
                <h3> Name = {this.state.name}</h3>
                <h3> Email = {this.state.email}</h3>
                <h3> Number = {this.state.mob}</h3>
            </div>
        )
    }
}

export default Usercontact;