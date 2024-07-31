
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Mongo Db Setup
mongoose.connect(process.env.MONGO_DB_API).then(()=>{
    console.log("MongoDb Connect");
}).catch(err =>{
    console.log("MongoDb Not Connect : ", err);
})

app.get("/", (req, res)=>{
    res.send("Hi")
})

// User Routes
const v1ApiRouter = require("./routes/v1.routes");
app.use("/api/v1/", v1ApiRouter);

module.exports = app