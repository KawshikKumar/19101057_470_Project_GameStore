const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Enter Description"]
    },
    price:{
        type:Number,
        required:[true,"Enter Price"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,"Enter Category"],
    },
    Stock:{
        type:Number,
        required:[true,"Enter Stock"],
        maxLength:[4,"Cannot exceed 4"],
        default:1

    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref: "User",
                reqiured: true,
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        reqiured: true,
    },
    createdAt:{
        type:Date,
        defaut:Date.now
    }
    
})
module.exports = mongoose.model("product",productSchema);