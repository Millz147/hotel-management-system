import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adminSchema = new Schema(
    {
        fullname:{
            type: String,
            require: true
        },
        email:{
            type: String,
            require: true,
            unique: true
        },
        password:{
            type: String,
            require: true
        },
        photo:{
            type: String,
            
        }
    }
)

const adminModel = mongoose.model('Admin', adminSchema)
export default adminModel

