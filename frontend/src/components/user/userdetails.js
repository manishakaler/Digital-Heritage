import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';

class Userdetails extends Component{
    constructor(props){
        super(props)
        this.state={
            job1:props.location.state.job1,
            job2:props.location.state.job2,
            job3:props.location.state.job3,
            mssg:props.location.state.mssg

        }
        this.chartdata = {
            labels:['Add Description','Add Image','Annotation',''],
            datasets:[
                {
                    barPercentage: 0,
                    barThickness: 40,
                    maxBarThickness: 40,
                    minBarLength: 2,
                    data:[this.state.job1,this.state.job2,this.state.job3,0],
                    backgroundColor:['blue','green','orange'] 
                }
            ]

        }
    }


    render(){
        console.log(this.state)
        return(
            <div classjob1='details' >
                <h2> {this.state.mssg}</h2>
                <div>
                    <h4> Description Job = {this.state.job1}</h4>
                    <h4> Add Images Job = {this.state.job2}</h4>
                    <h4> Add Annotation Job = {this.state.job3}</h4>
                </div>
                
                <Bar
                    data={this.chartdata}
                    options={{
                        title:{
                            display:true,
                            text:'Job Details',
                            fontSize:'25'
                        },
                        layout:{
                            padding:{
                               left:200,
                               top:100,
                               bottom:200,
                               right:500

                            }
                        
                        }


                    }}
                />
                
            </div>
        )
    }
}

export default Userdetails;