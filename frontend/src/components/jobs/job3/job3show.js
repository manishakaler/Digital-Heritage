import axios from 'axios';
import '../job.css';
import React, {Component} from 'react';


var temp_img_id=0;
var ctx,canvas
var image_data
var imagedata_list=[]
var url="welcome.jpg"
let brush=false;
var sqr_start={x:"",y:""}
var sqr_end={x:"",y:""}
var brushpos_start={x:"",y:""}
var brushpos_end={x:"",y:""}
var brushpos_move={x:"",y:""}
var pic_square
var loadedimg_id
var freehand_x=[],freehand_y=[]
var token
var img_width,img_height


function get_cordinates(event)
{
  var xc=event.clientX - canvas.getBoundingClientRect().left;
  var yc=event.clientY - canvas.getBoundingClientRect().top;
 
return {x:xc,y:yc};
}

function startdraw(event)
{ 
  pic_square=ctx.getImageData(0,0,canvas.width,canvas.height)
  brush=true;
  brushpos_start=get_cordinates(event)
  console.log(brushpos_start)
  sqr_start=brushpos_start
  image_data= canvas.toDataURL()
  imagedata_list.push(image_data)
}

function finishdraw(event)
{ 
  brush=false;
  brushpos_end=get_cordinates(event)
  console.log(brushpos_end)
  ctx.beginPath();
  //ctx.clearRect(0,0,600,600) 
}

function freehand_draw()
{  if(brush)
  { console.log("Cord=",brushpos_move)
    ctx.drawWidth=5;
    ctx.lineCap="round"
    freehand_x.push(chng_x(brushpos_move.x))
    freehand_y.push(chng_y(brushpos_move.y))
    ctx.lineTo(brushpos_move.x,brushpos_move.y)
    ctx.stroke();
    ctx.fill();
    //ctx.beginPath();
    ctx.moveTo(brushpos_move.x,brushpos_move.y)
    
  }
}


function square_draw()
{
  const width=brushpos_move.x-brushpos_start.x
  const height=brushpos_move.y-brushpos_start.y
  sqr_end=brushpos_move
  ctx.putImageData(pic_square, 0, 0);
  ctx.save();
  ctx.fillStyle="rgba(255, 255, 255, 0.5)";
  ctx.strokeRect(brushpos_start.x,brushpos_start.y,width,height)
  ctx.fillRect(brushpos_start.x,brushpos_start.y,width,height)
}

function back()
{ 
  
  const img_data=imagedata_list[imagedata_list.length-1]
  const t=new Image()
    
    
    
    
    t.onload= () =>{
      
      ctx.drawImage(t,0, 0,canvas.width,canvas.height)
    }
    
    t.src=img_data
  imagedata_list.pop()
}

var tem_img=""

async function get_url(){
  const api_str='http://localhost:8000/image?id='+temp_img_id +'&' + 'token=' +token
  const a=await fetch(api_str)
   
  const j=await a.json()
  console.log("json=",j)
  tem_img=j.image_id
  const image_url=j.image_source
  url= await'http://localhost:8000'+ image_url
  console.log("async_url=",url)

  
}


function getImage(){
    loadedimg_id=tem_img
    get_url()
    
    return url
  
}

function chng_x(x)
{
    const chng_x= x+((img_width-canvas.width)*x)/canvas.width
    return chng_x
}
function chng_y(y)
{
    const chng_y= y+((img_height-canvas.height)*y)/canvas.height
    return chng_y
}

class Job3page extends Component{
    constructor(props)
    {   super(props);
         this.state={
            job_id:props.location.state.id,
            user_id:window.localStorage.getItem('user_id'),
            job_img:props.location.state.img,
            job_title:props.location.state.title,
            job_descryption:props.location.state.description,
            answer:'',
            img:[]
            }
         
        

        this.tool={

            point:false,
            freehand:false,
            square:false
      
        }
    }

    set_tool(tool_id){
        //console.log(this.tool)
        this.tool.point=false
        this.tool.square=false
        this.tool.freehand=false
        this.tool[tool_id]=true
        console.log(this.tool)
    
    
      }
    
      draw(event)
      {  brushpos_move=get_cordinates(event)
         
         if(this.tool.freehand&&brush)
         {
            freehand_draw(event)
         }
         if(this.tool.square&&brush)
         {
            square_draw(event)
         }
    
    
      }

    ZoomIn(){ 
          
    const t=new Image()
    
    t.onload= () =>{
      canvas.width+=100
      canvas.height+=100
      
      ctx.drawImage(t,0, 0,canvas.width,canvas.height)
    }
    // ctx.putImageData(img_data, 0, 0)
    // ctx.save()
    t.src=canvas.toDataURL()
  }


  ZoomOut()
  {
    const t=new Image()
    
    
    
    
    t.onload= () =>{
      canvas.width-=100
      canvas.height-=100
      ctx.clearRect(0, 0,canvas.width,canvas.height)
      ctx.drawImage(t,0, 0,canvas.width,canvas.height)
      console.log(this.state.job_img)
    }
    // ctx.putImageData(img_data, 0, 0)
    // ctx.save()
    t.src=canvas.toDataURL()
    
    
  }
  

    handlesubmit(){
      
        
        
        const data= new FormData()
        data.append('job_id',this.state.job_id)
        data.append('user_id',this.state.user_id)
        data.append('answer',this.state.answer)
        for(var i=0;i<this.state.img.length;i++)
        data.append('images',this.state.img[i])
        
        axios.post('http://localhost:3001/savesoln2',data)
        .then(()=>{this.props.history.push('/clientpage')})


        
        
        
    }
    handleEvent(event)
    {   
        var img=[]
        for(var i=0;i<event.target.files.length;i++)
        img.push(event.target.files[i])
        this.setState({img:img})
        
        
    }
    save()
  { var image = canvas.toDataURL();  
    var tmpLink = document.createElement( 'a' );  
    tmpLink.download = this.state.job_img+'_annotated'+'.png';
    tmpLink.href = image; 
    document.body.appendChild( tmpLink ); 
    tmpLink.click(); 
    document.body.removeChild( tmpLink );  
    

  }

    componentDidMount(){
        canvas = document.getElementById('mycanvas')
        ctx = canvas.getContext("2d")

        const img=new Image()
        

        img.onload=()=>{
            img_height=img.height
            img_width=img.width
            
            canvas.width=400
            canvas.height=400
            
            ctx.clearRect(0, 0,canvas.width,canvas.height)
            ctx.drawImage(img,0, 0,canvas.width,canvas.height)
            console.log(img)
            image_data= canvas.toDataURL()
            imagedata_list.push(image_data)
        }
        window.addEventListener("mouseup",finishdraw)
        canvas.addEventListener("mousedown",startdraw)
        
        canvas.addEventListener("mousemove",this.draw.bind(this))
        img.src='http://localhost:3001/getimage/'+this.state.job_img
        img.crossOrigin='Anonymous'
    }
    

    render(){
        return(
            <div className="ShowJob">
               {/* <img src="/lhc.jpeg" id="bg-img"/> */}
               

                <div className="Annotatewrapper">
                  <div className="info">
                  <h4>Title: {this.state.job_title}</h4>
                  <h4>Description:{this.state.job_descryption}</h4>
                  <br></br>

                  </div>
                
                  <div className="select">
                  <label>
                  <h4>Select the annotated Images</h4>
                    <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange = {(event)=>{this.handleEvent(event)}} multiple/>
                  </label>
                  <br></br>
                  <label>
                    <h4>Details:</h4>
                    <textarea id="input" onChange={event=>{this.state.answer=event.target.value}}></textarea>
                  </label>
                  <label>
                  <h4>Final Submission</h4>
                  <button id="btn" onClick={event=>{this.handlesubmit()}}>Submit Job</button>
                  </label>
                  </div>
                  <div className="Buttons" position="fixed" bottom="0" right="0">
                  <button class="Button" onClick={()=>{this.set_tool('freehand')}}>Free Hand</button>
                  <button class="Button" onClick={()=>{this.set_tool('square')}}>Square</button>
                  <button class="Button" onClick={()=>back()}>Undo</button>
                  <button class="Button" onClick={()=>this.ZoomIn()}>Zoom In</button>
                  <button class="Button" onClick={()=>this.ZoomOut()}>Zoom Out</button>
                  
                <div className="Canvas" width="800" height="800" >
                  <canvas id="mycanvas" ></canvas>
                </div>
                <button class="Button" onClick={()=>this.save()}>Save</button>
                <ul>
                    {
                    this.state.img.map(x=><li>{x.name}</li>)
                    }   
                </ul>
                </div>

                </div>
                

                
            </div>
        )
    }
}

export default Job3page