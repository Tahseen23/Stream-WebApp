const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
  name:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true,
    unique:true
  },
  image:{
    type:String
  },
  bookmark:[
    {
      id:Number,
      explore:String,
      name:String,
      img:String,
      ratings:Number,
      views:Number
    }
  ],
  history:[
    {
      tv:{
        id:Number
    },
      movie:{
        id:Number
      }
    }
  ]
})

const userModel=mongoose.model('users',userSchema)
module.exports=userModel