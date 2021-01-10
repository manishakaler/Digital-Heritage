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
                <h4> User details are as follows</h4>
                <h4> Name = {this.state.name}</h4>
                <h4> Email = {this.state.email}</h4>
                <h4> Number = {this.state.mob}</h4>
            </div>
        )
    }
}

export default Usercontact;