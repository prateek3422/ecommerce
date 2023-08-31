import { default as mongoose } from "mongoose"

const {ObjectId} = mongoose.Schema.Types


const cartSchema = new mongoose.Schema({
  
    user:{
        type:ObjectId,
        ref:"User"
    },

    products:[
        {

            quantity:{type:Number,default:1},

            product:{
                type:ObjectId,
                ref:'Product'
            }
        }
    ],

 
},{
    timestamps:true
})


module.exports =  mongoose.models.Cart || mongoose.model('Cart', cartSchema)