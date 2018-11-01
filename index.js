'use strict';
const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');


var stocks = require('./stock.js');
var app = express();
var data = [];
//var stockName = [];
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {data});
});



    setInterval(function(){
        var acronym = ['TCT','CNC','HRG','PRN']
        stocks.ApiCall(acronym).then(response => {
            if(response.length!==0)
            {
            data.push(response);
            var stockName = [];
            //for(var i = 0 ; i < data.length ; i++)
            //stockName.push(data.name);
            //sendmail()
            //console.log(response);
            console.log(response);
            console.log(stockName);
            }
        },(errorMessage) => {
            console.log('sgxgg');
        })

    }, 5000);


    console.log(data);



    
function sendmail() {
    // Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.com',
        port: 465,
        secure: true,
        auth: {
            user: 'nodemailtest',
            pass: 'nodepass123'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'nodemailtest@yandex.com', // sender address
        to: 'rahulpmurali@gmail.com, rahulm@netsratum.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: data[0][0].name, // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });



}


app.listen(port);