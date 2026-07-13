import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false, //yachyamule password database mdhe store hot ahe pn get request mdhe yet nahi

    },
    token:{
        type:String,
    }
})

const User = mongoose.model('User', userSchema); //userschema mdhe model create kel ae jo user navacha ahe ani userSchema madhe data store hot ahe ani to user modeluser variable madhe store hot ahe 
export default User;