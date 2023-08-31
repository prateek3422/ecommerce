import { default as product } from "@/pages/product";
import { default as mongoose } from "mongoose";

const {ObjectId} = mongoose.Schema.Types

const orderSchema = new mongoose.Schema({
    user: {
        type:ObjectId,
        ref:"User"
    },

    products:[
        {
            quantity: {type:Number, default: 1},
            product: {type:ObjectId , ref: "Product"}

        }
    ],

    email:{
        type:String,
        required:true
    },
    total:{
        type: Number,
        required: true
    }
},{
    timestamps:true
})


module.exports =  mongoose.models.Order || mongoose.model('Order',orderSchema)