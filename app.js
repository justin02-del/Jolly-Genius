//this is server

const express=require('express')
const app=express()
const userController = require("./controllers/usersController")
//const userRouter = require("./routes/user-auth")
const connectDB = require('./dbconfig/db');
const cors = require('cors');

const port=4000
connectDB();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/sign-up', userController.registerUser); // Changed to app.post
app.post('/login', userController.loginUser); // Changed to app.post



app.listen(port, (err)=>{
    if (err) throw err
    console.log("server running 420 on port "+ port)
})