import { default as mongoose } from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String
    },
    role:{
        type:String,
        require: true,
        default: 'user',
        enum:['user', 'admin']
    }

},{
    timestamps:true
})

export default  mongoose.models.User || mongoose.model('User',UserSchema)