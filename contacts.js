const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    const contact = contacts.find((el) => String(el.id) === contactId);
    if (!contact) console.log("Oops, not found :(");
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    const refreshedContacts = contacts.filter((id) => contactId !== id);
    if (contacts.length !== refreshedContacts.length) {
      rewriteData(contactsPath, refreshedContacts);
    }
    console.table(refreshedContacts);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    const newContact = { id: uuidv4(), name, email, phone };
    const newContactsArray = [...contacts, newContact];
    rewriteData(contactsPath, newContactsArray);
    console.table(newContactsArray);
  });
}

function rewriteData(path, array) {
  const data = JSON.stringify(array);
  fs.writeFile(path, data, (error) => {
    if (error) {
      console.log(error.message);
      return;
    }
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
