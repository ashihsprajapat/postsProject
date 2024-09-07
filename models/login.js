const mongoose=require("mongoose");

const schema=mongoose.Schema;
const loginSchema=new schema({
    username:{
        type:String,
        required:true,
    },
    passward:{
        type:String,
        required:true,
    }
})

const User=mongoose.model("User",loginSchema);
module.exports=User;