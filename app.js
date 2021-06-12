const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const Contact = require('./models/contacts');

const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "ea0248b1",
  apiSecret: "S9cs6yAmyZjWluO2"
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
    const contacts = Contact.fetchAll(contacts => {
        res.render('index',{cocs: contacts, docTitle: 'Emergency', flag: 0});
    });
});

app.get("/emergency", (req, res, next) => {
    const contacts = Contact.fetchAll(contacts => {
        res.render('emergency',{cocs: contacts, docTitle: 'Emergency', flag: 0});
    });
});

app.post("/contact", (req, res, next) => {
    const contactName = req.body.contactName;
    const contactNumber = req.body.contactNumber;
    const contactPin = req.body.contactPin;
    const contact = new Contact(contactName,contactNumber, contactPin);
    contact.save();
    res.redirect('/');
});

app.get("/tips", (req, res, next) => {
    res.render("tips", {docTitle: "Tips"});
});

app.post('/sendMessage', (req, res, next) => {
    const contacts = Contact.fetchAll(contacts => {
        // console.log(contacts);
        const flag = req.body.flag;
        console.log(flag);
        const pin = 221003;
        for (let conc of contacts) {
            if(flag==1)
            {
                if(conc.contactPin != pin) {
                    // console.log(conc.contactNumber);
                    continue;
                }
            }
            const from = "Vonage APIs";
            const to = "91"+ conc.contactNumber;
            const text = 'Hello biroo Sachin Here asking for Emergency !!';
            vonage.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    console.log(err);
                } else {
                    if(responseData.messages[0]['status'] === "0") {
                        console.log("Message sent successfully.");
                    } else {
                        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    }
                }
            });
            console.log(to);
        }
        res.redirect('/');
    });
    
});

app.post('/sendMessage1', (req, res, next) => {
    const contacts = Contact.fetchAll(contacts => {
        // console.log(contacts);
        const pin = 221003;
        for (let conc of contacts) {
            if(conc.contactPin != pin) {
                // console.log(conc.contactNumber);
                continue;
            }
            const from = "Vonage APIs";
            const to = "91"+ conc.contactNumber;
            const text = 'Hello biroo Sachin Here asking for Emergency !!';
            vonage.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    console.log(err);
                } else {
                    if(responseData.messages[0]['status'] === "0") {
                        console.log("Message sent successfully.");
                        console.log(to);
                    } else {
                        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    }
                }
            });
            // console.log(to);
        }
        res.redirect('/');
    });
    
});

app.get('/sendMessageNear', (req, res, next) => {
    const contacts = Contact.fetchAll(contacts => {
        res.render('emergency',{cocs: contacts, docTitle: 'Emergency', flag: 1});
    });
});

app.get('/medical', (req, res, next) => {
    res.render('medical');
});

app.get('/grocery', (req, res, next) => {
    res.render('grocery');
});

app.get('/grocery_list', (req, res, next) => {
    res.render("grocery_list");
});

app.listen(3000);