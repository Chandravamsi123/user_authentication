
const User=require("../models/User")
const bcrypt=require("bcryptjs")

const userRegister=async(request,response)=>{
    const {username,email,password}=request.body
    try {
        const userEmail=await User.findOne({email})
        if(userEmail){
            return response.status(400).json("Email already taken")
        }
        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })

        await newUser.save()

        response.status(200).json("User registered")
        console.log("registerd")

    } catch (error) {
        console.log(error)
        response.status(500).json("internal server error")
    }
}
    
const userLogin=async(request,response)=>{
    const {email,password}=request.body
    try {
        const user=await User.findOne({email})
        if(!user || !(await bcrypt.compare(password,user.password))){
            return response.status(401).json("Invalid username or password");
        }
        response.status(200).json("Login Succesfull")
    } catch (error) {
        console.log(error)
    }
}


module.exports={userRegister, userLogin}