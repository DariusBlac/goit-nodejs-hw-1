const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactsArray = await listContacts();
  const result = contactsArray.find((contact) => contact.id === contactId);
  if (result) {
    return result;
  } else {
    return null;
  }
}

async function removeContact(contactId) {
  const contactsArray = await listContacts();
  const index = contactsArray.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactsArray.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contactsArray = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  contactsArray.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
