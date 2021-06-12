fs = require('fs');
path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'contact.json');

const getContactsFromFile = cb => {
    fs.readFile(p, (err,fileContent) => {
        let contacts = [];
        if(!err) {
            contacts = JSON.parse(fileContent);
        }
        return cb(contacts);
    });
}

module.exports = class Contact {
    constructor(contactName, contactNumber, contactPin) {
        this.contactName = contactName;
        this.contactNumber = contactNumber;
        this.contactPin = contactPin;
    }
    
    save() {
        let temp = Math.floor(Math.random()*10);
        temp = "a"+ temp;
        this.id = temp;
        getContactsFromFile(contacts => {
        contacts.push(this);
        fs.writeFile(p, JSON.stringify(contacts), (err) => {
            console.log(err);
        });
        });    
    }

    static fetchAll(cb) {
        getContactsFromFile(cb);
    }
}