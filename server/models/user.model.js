import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        
    },
    role:{
        type:String,
        require:true,
        enum:["instructor","student"],
        default:"student"
        
    },
    enrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    photoUrl:{
        type:String,
        default:""
    }
    

},{timestamps:true})
export const User=mongoose.model("User",userSchema)