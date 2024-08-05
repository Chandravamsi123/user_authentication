const express = require("express")
const dotEnv=require("dotenv")
const mongoose=require("mongoose")
const userRoutes=require("./routes/userRoutes")


const app=express()

app.use(express.json())

dotEnv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongoDB connected"))
.catch((error)=>console.log(error)) 

app.use("/user",userRoutes)


app.listen(4000,()=>{
    console.log("Server running")
})


