import { model, Schema } from "mongoose";


const urlModel = new Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortId:{
        type:String
    }
},{timestamps:true})


export const url = model('Url',urlModel)
