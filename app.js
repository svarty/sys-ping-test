#!/usr/bin/env node

// require
const fs = require('fs');
const si = require('systeminformation');
const ping = require('ping');
const network = require('network');


// specify the path to the file, and create a buffer with characters we want to write
let path = 'sysInfo.json';  
let pathPing = 'pingInfo.json'; 


// get system info

si.getStaticData(function(data) {

    fs.open(path, 'w', function(err, fd) {  
        if (err) {
            throw 'could not open file: ' + err;
        }

fs.writeFile(fd, JSON.stringify(data, null, 2), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("STATIC DATA info added");
});

});
});


// get ping/internet info

var hosts = ['google.com'];

network.get_gateway_ip(function(err, ip) {
    console.log(err || ip); // err may be 'No active network interface found.'
    hosts.push(err || ip);
    console.log(hosts);
    
    hosts.forEach(function (host) {
        ping.promise.probe(host, {
            min_reply: 10
        }).then(function (res) {
                let resp = {
                    host: res.host,
                    output: res.output,
                    min: res.min,
                    max: res.max,
                    avg: res.avg,
                    stddev: res.stddev
                }
                console.log(resp);

                fs.open(pathPing, 'a', function(err, fd) {  
                    if (err) {
                        throw 'could not open file: ' + err;
                    }
            
            fs.appendFile(fd, JSON.stringify(resp, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("PING DATA info added");
            });
            
            
            });

                        // ==== NODE MAILER



const nodemailer = require('nodemailer');

const account = {
    user:"qksj6vmacsynb76n@ethereal.email",
    pass:"aWvHtMwX1ceU2AcCWr"
}

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
//nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Automated testing service 👻" <testing@example.com>', // sender address
        to: 'baz@example.com, baz@example.com', // list of receivers
        subject: 'System Info', // Subject line
        text: 'Info is in the attachment', // plain text body
        html: '<b>Info is in the attachment</b>', // html body
        attachments: [
            {   // file on disk as an attachment
                filename: 'sysInfo.json',
                path: __dirname+'/sysInfo.json' // stream this file
            },
            {   // file on disk as an attachment
                filename: 'pingInfo.json',
                path: __dirname+'/pingInfo.json' // stream this file
            },
        ] 
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
        var sender = require('sender-js');
 
        var settings = {
          slack: {
            "token": "HERE INSERT SLACK'S WORKSPACE TOKEN"
            }
        };
         
        sender.init(settings);
         
        var messageOptions = {
            to: 'test',
            text: 'New sys info - ' + nodemailer.getTestMessageUrl(info)
        };
         
        sender.send(messageOptions, function(err, message) {
            console.log(err + ' ' + message);

            setTimeout((function() {  
                return process.exit(2);
            }));
            
        });

        

    });
// });


            });



    });
})




