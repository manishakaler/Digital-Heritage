const mongoose=require('mongoose')

const job_typeSchema=new mongoose.Schema({
    title:{
      type:String
    },
    route:{
      type:String
    }
  })
  

  module.exports=mongoose.model('job_type',job_typeSchema)