const fs = require("fs");
const path = require("path");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const contactsFromDb = await readFile(contactsPath);
    const contacts = JSON.parse(contactsFromDb);

    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactsFromDb = await readFile(contactsPath);
    const contacts = JSON.parse(contactsFromDb);
    const contact = contacts.find(
      (contact) => contact.id === Number(contactId)
    );

    console.log(contact);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsFromDb = await readFile(contactsPath);
    const contacts = JSON.parse(contactsFromDb);
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );

    console.table(filteredContacts);
    return await writeFile(contactsPath, JSON.stringify(filteredContacts));
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsFromDb = await readFile(contactsPath);
    const contacts = JSON.parse(contactsFromDb);
    const id = contacts[contacts.length - 1].id + 1;
    const newContact = { id, name, email, phone };
    const updatedContacts = [...contacts, newContact];

    console.table(updatedContacts);
    return await writeFile(contactsPath, JSON.stringify(updatedContacts));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
