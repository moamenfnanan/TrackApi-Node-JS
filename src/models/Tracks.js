const mongoose = require('mongoose');
const pointSchema = new mongoose.Schema({
    timestamp:Number,
    coords:{
        latitude:Number,
        longtitude:Number,
        altitude:Number,
        accuracy:Number,
        heading:Number,
        speed:Number
    }
})
const trackSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    name:{
        type:String,
        default:''
    },
    location:[pointSchema]
})
mongoose.model('Tracks',trackSchema)