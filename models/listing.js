const mongoose=require("mongoose");

const schema=mongoose.Schema;
const listingSchema= new schema({
   
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.lnFlADOHkOK1le8LPmzEKQAAAA?rs=1&pid=ImgDetMain",
        // set:(v)=>
        //     v ===""?
        //     "https://th.bing.com/th/id/OIP.lnFlADOHkOK1le8LPmzEKQAAAA?rs=1&pid=ImgDetMain"
        //     :v,
        
    },
    discription:{
        type:String,
        default:"I want to going in google",
    },
    date:{
        type:Date,
        default:new Date(),
    }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;