const { default: mongoose } = require("mongoose")



const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    // image:{
    //     type:String,
    //     required:true
    // },
    // stocks:{
    //     type:String,
    //     required:true
    // },

},{
    timestamps:true
})

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)