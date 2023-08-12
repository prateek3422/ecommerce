import { default as mongoose } from "mongoose";
const{ObjectId} = mongoose.Schema.Types


const cartSchema = new mongoose.Schema({
  

    products:[
        {

            quantity:{type: Number, defaault: 1},

            product:{
                type:ObjectId,
                ref:'Product'
            }
        }
    ],

    user:{
        type: ObjectId,
        ref: 'User'
    }
})


module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema)