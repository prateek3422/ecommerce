import { Schema, models, model } from 'mongoose';



const ProductSchema = new Schema({
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
    images:[
        {
            public_id: {
                type:String,
                required:true
            },

            url_id:{
                type:String,
                required:true
            }
            
        }
    ]
    ,
    // stocks:{
    //     type:String,
    //     required:true
    // },

},{
    timestamps:true
})

export default models.Product || model('Product', ProductSchema)