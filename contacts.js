const fs = require("fs").promises
const path = require("path")
const uniqid = require("uniqid")

const contactsPath = path.resolve("./db/contacts.json")

function getData() {
  return fs
    .readFile(`${contactsPath}`, "utf8")
    .then((answer) => {
      return JSON.parse(answer)
    })
    .catch((error) => console.log(error.message))
}

function updateContacts(updatedContacts) {
  const stringiftContacts = JSON.stringify(updatedContacts)
  return fs
    .writeFile(`${contactsPath}`, stringiftContacts)
    .then(() => {
      console.log("updated")
    })
    .catch((error) => console.log(error.message))
}

function listContacts() {
  return getData()
    .then((answer) => console.table(answer))
    .catch((error) => console.log(error))
}

function getContactById(contactId) {
  getData()
    .then((answer) => {
      answer.find((contact) => {
        if (contact.id === Number(contactId)) {
          console.log(contact)
        }
      })
    })
    .catch((error) => {
      console.log("no such contact")
      console.log(error.message)
    })
}

function removeContact(contactId) {
  return getData()
    .then((answer) => {
      const filteredContacts = answer.filter((contact) => {
        return contact.id !== Number(contactId)
      })
      console.log("removed")
      updateContacts(filteredContacts)
    })
    .catch((error) => console.log(error.message))
}

function addContact(name, email, phone) {
  const user = {
    id: uniqid(),
    name,
    email,
    phone,
  }
  return getData()
    .then((answer) => {
      const contactsToUpdate = [...answer, user]
      updateContacts(contactsToUpdate)
      console.log("added")
    })
    .catch((error) => console.log(error.message))
}

module.exports = {
  getData,
  updateContacts,
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
