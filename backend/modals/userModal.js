import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required: true
    },
    job:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    isadmin:{
        type:Boolean,
        default:false,
    }
   
},
{
    timestamp:true
}
)


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

const User = mongoose.model('User', userSchema)

export default User;