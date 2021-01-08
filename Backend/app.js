const express = require('express')
const app = express()
const cors = require('cors');
const logger = require('morgan');
const mongoose=require('mongoose')
const multer=require('multer')
const path=require('path')
const url= 'mongodb://localhost/btp20'
const userSchema=require('./user')
const jobSchema=require('./jobs');
const job_typeSchema=require('./job_type')
const { ObjectId } = require('mongodb');
 
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3001

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});
const upload=multer({storage:storage})


mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{console.log("Internet database connected")})
const con =mongoose.connection

con.on('open',()=>{
  console.log('database connected')
})


app.get('/getimage/:img', (req, res) => {
  res.sendFile('C:/Users/hp/Desktop/BTP20/Backend/uploads/'+req.params.img)
  
})

app.post('/savejob1',upload.single("image"),async (req,res)=>
{
   const job=new jobSchema({
     title:req.body.title,
     description:req.body.description,
     jobtype:req.body.jobtype,
     img:req.file.originalname,
     user_id:req.body.user_id
   })
   try{

    const r= await job.save()
    res.send(r)
    res.end('end')
    
  }
  catch{
  res.send(req.body)
  res.end('End')
  }


})

app.post('/savejob2',async (req,res)=>
{
   const job=new jobSchema({
     title:req.body.title,
     description:req.body.description,
     jobtype:req.body.jobtype,
     user_id:req.body.user_id
   })
   try{

    const r= await job.save()
    res.send(r)
    res.end('end')
    
  }
  catch{
  res.send(req.body)
  res.end('End')
  }


})

app.post('/savejobtype',async (req,res)=>{

  const job_type=new job_typeSchema({
    title:req.body.title,
    route:req.body.route
  })
  try{

    const r= await job_type.save()
    const jobtype=await job_typeSchema.find()
    res.send(jobtype)
    
    res.end('end')
    
  }
  catch{
  res.send(req.body)
  res.end('End')
  }
})

app.get('/getjobtype',async (req,res)=>{
   var job_type=await job_typeSchema.find()
   res.send(job_type)
})

app.post('/deletejobtype',async (req,res)=>{
  
  await job_typeSchema.remove({'_id':ObjectId(req.body.id)})
  const jobtype=await job_typeSchema.find()
  res.send(jobtype)
  res.end()
})



app.get('/getjobs/:user_id',async (req,res)=>{
  var jobs= await jobSchema.find({'user_id':req.params.user_id})
  res.send(jobs)
  res.end()
})

app.get('/getalljobs/:user_id',async (req,res)=>{
  const jobs= await jobSchema.find()
  var newjobs=[];
  var donejobs=[]
  for(var i=0;i<jobs.length;i++)
  {
    var f=0;
    for(var j=0;j<jobs[i].soln.length;j++)
    {
      if(jobs[i].soln[j].user_id===req.params.user_id)
      {
        f=1;
        break;
      }
    }
    if(f==0)
    {
      newjobs.push(jobs[i])
    }
    else
    {
      donejobs.push(jobs[i])
    }
    
  }
  
  res.send({'new':newjobs,'old':donejobs})
  res.end()
})

app.post('/deletejob',async (req,res)=>{
 await jobSchema.remove({'_id':ObjectId(req.body.id)})
 res.send("deleted")
 res.end()
})

app.post('/savesoln1',async (req,res)=>{
  
  // await job.soln.push(req.body)
  // await job.save()
  //console.log(req.body)
  await jobSchema.updateOne({'_id':req.body.job_id},{$push:{soln:{user_id:req.body.user_id,answer:req.body.answer}}})
  res.send("Updated")
  res.end()
})

app.post('/savesoln2',upload.array('images'),async (req,res)=>{
  var img_name=[];
  req.files.map(x=>img_name.push(x.originalname))
  console.log(img_name)
  await jobSchema.updateOne({'_id':req.body.job_id},{$push:{soln:{user_id:req.body.user_id,answer:req.body.answer,image:img_name}}})
   res.send("Updated")
   res.end()
})

app.post('/savesoln3',async (req,res)=>{
  
  // await job.soln.push(req.body)
  // await job.save()
  //console.log(req.body)
  await jobSchema.updateOne({'_id':req.body.job_id},{$push:{soln:{user_id:req.body.user_id,annotation:{shape:req.body.shape,x_cor:req.body.x_cor,y_cor:req.body.y_cor}}}})
  res.send("Updated")
  res.end()
})
app.get('/getjobdetails',async (req,res)=>{

  
  var jobs=await jobSchema.find();
  var tot=jobs.length;
  var job1=0;
  var job2=0;
  var job3=0;
  
  for(var i=0;i<tot;i++)
  {
    if(jobs[i].jobtype=='Description')
    job1++;
    if(jobs[i].jobtype=='Add Images')
    job2++;
    if(jobs[i].jobtype=='Add Annotation')
    job3++;

  }
  res.send({'job1':job1,'job2':job2,'job3':job3})
  
  

   
})

app.post('/getproviderdetails',async (req,res)=>{

  
  var jobs=await jobSchema.find({'user_id':req.body.id});
  var tot=jobs.length;
  var job1=0;
  var job2=0;
  var job3=0;
  
  for(var i=0;i<tot;i++)
  {
    if(jobs[i].jobtype=='Description')
    job1++;
    if(jobs[i].jobtype=='Add Images')
    job2++;
    if(jobs[i].jobtype=='Add Annotation')
    job3++;

  }
  res.send({'job1':job1,'job2':job2,'job3':job3})
  
  

   
})

app.post('/getclientdetails',async (req,res)=>{

  
  var jobs= await jobSchema.find()
  var newjobs=[];
  var donejobs=[]
  for(var i=0;i<jobs.length;i++)
  {
    var f=0;
    for(var j=0;j<jobs[i].soln.length;j++)
    {
      if(jobs[i].soln[j].user_id===req.body.id)
      {
        f=1;
        break;
      }
    }
    if(f==0)
    {
      newjobs.push(jobs[i])
    }
    else
    {
      donejobs.push(jobs[i])
    }
    
  }
  jobs=donejobs;
  var tot=jobs.length
  console.log(donejobs.length,newjobs.length)
  console.log(tot)
  var job1=0;
  var job2=0;
  var job3=0;
  
  for(var i=0;i<tot;i++)
  {
    if(jobs[i].jobtype=='Description')
    job1++;
    if(jobs[i].jobtype=='Add Images')
    job2++;
    if(jobs[i].jobtype=='Add Annotation')
    job3++;

  }
  res.send({'job1':job1,'job2':job2,'job3':job3})
  
  

   
})



app.post('/login', async (req,res) =>{

  const user= await userSchema.find({"email":req.body.username})
  //console.log(user[0].pass,req.body.password)
  if(user.length==0)
  {
    res.send({status:"500"})
  }
  else
  {
    if(user[0].pass==req.body.password && user[0].usertype==="Provider")
    res.send({status:"200",id:user[0]._id,name:user[0].name})
    else
      if(user[0].pass==req.body.password && user[0].usertype==="Client")
      res.send({status:"201",id:user[0]._id,name:user[0].name})
      else
        if(user[0].pass==req.body.password && user[0].usertype==="Admin")
        res.send({status:"202",id:user[0]._id,name:user[0].name})
        else
        res.send({status:"400"})
  }
  

})


app.post('/register', async (req,res) =>{
  
  const users= await userSchema.find({"email":req.body.email})
  if(users.length==0)
{
    const user=new userSchema({
    name:req.body.username,
    email:req.body.email,
    pass:req.body.password,
    dob:req.body.dob,
    usertype:req.body.user_type,
    gender:req.body.gender,
    number:req.body.number,
    education:req.body.education,

  })
  try{

    const r= await user.save()
    res.send("200")
    res.end('end')
    
  }
  catch{
  res.send(req.body)
  res.end('End')
  }
}

else{

  res.send("800")
  res.end('end')
}
  
  })

app.get('/userdetails/:id',async (req,res)=>{

  const user= await userSchema.find({"_id":req.params.id})
  res.send({name:user[0].name,email:user[0].email,number:user[0].number})
  res.end()


})

app.get('/alluserdetails',async (req,res)=>{

  const users= await userSchema.find()
  res.send(users)
  res.end()


})
app.get

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})