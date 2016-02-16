var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next){
    var transporter = nodemailer.createTransport({
        service: 'Yahoo',
        auth: {
            user: 'archkenny@yahoo.com',
            pass: 'Kenshinman2014'
        }
    });
    
    var mailOptions = {
        from: 'Paul Orilogbon <archkenny@yahoo.com>',
        to: 'archkenshin@gmail.com',
        subject: 'Contact Form from Express Website',
        text: 'You have an email with the following Details ... a Name: '+req.body.name+' Email: '+req.body.email+' and Message: '+req.body.message,
        html: '<p>You have a message with the following details</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
        
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        }else{
            console.log('Message sent: '+info.response);
            res.redirect('/');
        }
    })
})

module.exports = router;
