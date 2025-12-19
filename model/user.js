import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    email:{
        type:String,
        require:true,
        uniqe:true
    },

    firstname :{
        type:String,
        require:true,

    },

     lastname :{
        type:String,
        require:true,

    },

     password:{
        type:String,
        require:true,

    },

     role :{
        type:String,
        require:true,
        default:"customer"

    },

     isBlocked :{
        type:String,
        require:true,
        delete:false

    },

     img :{
        type:String,
        require:true,
        default:"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"

    }



});

const User=mongoose.model("Users",userSchema)

export default User;
