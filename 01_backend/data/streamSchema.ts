import mongoose from "mongoose";

export const stream = new mongoose.Schema({
    streamName:{
        required:true,
        type:String 
    },
    streamID:{
        required:true,
        type:String
    },
    createdAt:{
        required: true,
        default:Date.now(),
        type:Date
    }
})

export const streamSchema = mongoose.model('stream', stream)