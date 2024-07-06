const express=require('express')
const app=express()
const userController = require("./controllers/usersController")
//const userRouter = require("./routes/user-auth")
const connectDB = require('./dbconfig/db');

const port=4000
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/sign-up", userController.registerUser);
app.use("/login", userController.loginUser);



app.listen(port, (err)=>{
    if (err) throw err
    console.log("server running 420 on port "+ port)
})