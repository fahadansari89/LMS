
import mongoose from "mongoose"

const coursePurchaseSchema=new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:['pending', 'completed', 'failed'],
        default:'pending'
    },
    paymentId:{
        type:String,
        required:true
    }

},{timestamps:true})

export const coursePurchase=mongoose.model('coursePurchase',coursePurchaseSchema)