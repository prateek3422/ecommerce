const { default: mongoose } = require("mongoose");


const orderSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    products:[
        {
            quantity: {type:Number, default: 1},
            product: {type:mongoose.Schema.Types.ObjectId , ref: "Product"}

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