const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const allData=require("./data.js");
main()
.then(()=>{
    console.log("Connect to data REst")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/REST');
}

async function initData(){
     await Listing.deleteMany({});
    await Listing.insertMany(allData.data);
}
initData();