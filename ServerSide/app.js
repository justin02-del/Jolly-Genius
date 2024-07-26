
const nodemailer = require('nodemailer');
const bodyParser=require('body-parser');
const express=require('express')
let app=express()
    app.use('/submit-form',bodyParser.urlencoded({extended:false}))


async function main(){
    
        
        app.post('/submit-form', (req,res)=>{
            
            const transporter=nodemailer.createTransport(
                {
                    service: 'gmail',
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, 
                    auth: {
                        user: "jollygeniuslearning@gmail.com",
                        pass: "Jordinspark$02",
                    },
                }
            )
            const emailMessage={
                from:'<jollygeniuslearning@gmail.com>',
                to:'justinernest02@gmail.com',
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            }
         transporter.sendMail(emailMessage, (error,info)=>{
                if(error){
                    console.log('Error sending email:', error);
                    res.status(500).send('Error sending email');
                }else {
                    console.log('Email sent:', info.response);
                    res.send('Email sent successfully');
                }
            })
        })
        

    }






app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/submit-form');
});
main()
