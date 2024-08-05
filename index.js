const express = require("express")
const dotEnv=require("dotenv")
const mongoose=require("mongoose")
const userRoutes=require("./routes/userRoutes")


const app=express()

app.use(express.json())

dotEnv.config()

const PORT=process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongoDB connected"))
.catch((error)=>console.log(error)) 

app.use("/user",userRoutes)


app.listen(PORT,()=>{
    console.log("Server running")
})


