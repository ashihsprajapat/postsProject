const express=require("express");
const mongoose=require("mongoose");
const ejsMate=require("ejs-mate");
const app=express();
const port=8080;
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")))
const Listing=require("./models/listing.js");
const User=require("./models/login.js");

main()
.then(()=>{
    console.log("Connect to rest DataBase and login database")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/REST', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
}


app.engine("ejs",ejsMate);
const methodOverride = require('method-override');
const { readdir } = require("fs");
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create rout post add rout
//posts rout
app.post("/posts", async (req, res) => {
    try {
        const listingData = req.body.listing;
        if (listingData.date) {
            listingData.date = new Date(listingData.date);
        }
        const list = new Listing(listingData);
        await list.save();
        res.redirect("/posts");
    } catch (error) {
        console.error("Error saving listing:", error);
        res.status(500).send("Error adding post.");
    }
});

//posts rout
app.get("/posts",async(req,res)=>{
    const listings= await Listing.find({});
    res.render("../views/index.ejs",{listings});
})
//new rout
app.get("/posts/new",(req,res)=>{
    res.render("../views/new.ejs")
})


//edit rout
app.get("/posts/edit/:id", async (req, res) => {
    let { id } = req.params;
    try {
        const list = await Listing.findById(id);
        if (!list) {
            return res.status(404).send("Listing not found");
        }
        res.render("edit.ejs", { list });
    } catch (error) {
        console.error("Error fetching listing:", error);
        res.status(500).send("Error retrieving listing.");
    }
});

//update rout
app.put("/posts/edit/:id", async (req, res) => {
    let { id } = req.params;
    let listingData = req.body.List;
    // Convert date to Date object if it exists
    if (listingData.date) {
        listingData.date = new Date(listingData.date);
    }
    try {
        const list = await Listing.findByIdAndUpdate(id, listingData, { new: true, runValidators: true });
        if (!list) {
            return res.status(404).send("Listing not found");
        }
        res.redirect(`/posts/${id}`)
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).send("Error updating listing.");
    }
});

//show rout
app.get("/posts/:id",async(req,res)=>{
    let {id}=req.params;
    const List=await Listing.findById(id);
    res.render("../views/show.ejs",{List});
})

//delete rout
app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deleteItem = await Listing.findByIdAndDelete(id);
        res.redirect("/posts");
    } catch (error) {
        console.error("Error deleting listing:", error);
        res.status(500).send("Error deleting listing.");
    }
});

app.get("/",(req,res)=>{
  
    res.render("../views/home.ejs");
})


///about me routcont
app.get("/about",(req,res)=>{
    res.render("../views/about.ejs");
})

app.listen(port,()=>{

    console.log("App is listing on port",port);
})


//login rout
app.get("/login",(req,res)=>{
    res.render("../views/login.ejs")
})

//post for login
app.post("/login",(req,res)=>{
    const user=req.body.user;
    console.log(user);
    user.save();
    res.redirect("/posts");
})