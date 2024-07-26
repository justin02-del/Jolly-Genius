//the controller, interacts with database

const User = require('../models/users');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const registerUser = async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    
    const firstname=req.body.fname
    const lastname=req.body.lname
    const email=req.body.email
    const password=req.body.password
    const username=req.body.username
    console.log(firstname)
    console.log(lastname)
    console.log(email)
    console.log(password)
    console.log(username)




    if (!firstname || !lastname || !email || !password || !username) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }
      
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User( {firstname, lastname, username, email,password: hashedPassword });
    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser ) {
        return res.status(409).json({
          message: "User already exists",
        });
      }
      await newUser.save();
      res.status(201).json({
        message: "Registration successful",
        user: newUser,
      });
      
  } catch (error) {
    res.status(400).send('Error registering user');
    console.error(error)
    
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const  password  = req.body.passwordlogin;
    const email=req.body.emaillogin
    const username=req.body.usernamelogin
    console.log(password+" "+email+" "+username)

    // Check if the user exists
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Check if the provided password matches the stored password
    

      const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Invalid password');
        }else {
          return res.status(200).json({
            message: "Login successful",
            user: {
              email: user.email,
            }});
        }

     
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//send email

const sendEmail= async (req,res) =>{
  try{
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail as the email service
      auth: {
        user: 'jollygeniuslearning@gmail.com', // Your Gmail email address
        pass: 'JollyGenius02' // Your Gmail password
      }
    });

    // Define the email options
    const mailOptions = {
      from: 'jollygeniuslearning@gmail.com', // Sender's email address
      to: 'justinernest02@gmail.com', // Recipient's email address
      subject: 'Hello from Nodemailer', // Subject line
      text: 'This is a test email sent using Nodemailer!' // Plain text body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }

}


module.exports = {registerUser, loginUser};