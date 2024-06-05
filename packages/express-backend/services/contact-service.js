import Contact from '../models/contact.js'

function getContacts(userID, first_name, last_name) {
    let promise
    if (first_name === undefined && last_name === undefined) {
        promise = Contact.find({ userID: userID })
    } else if (first_name && last_name) {
        promise = findContactByFirstAndLastName(userID, first_name, last_name)
    } else if (first_name && !last_name) {
        promise = findContactByFirstName(userID, first_name)
    } else if (!first_name && last_name) {
        promise = findContactByLastName(userID, last_name)
    }
    return promise
}

function findContactById(id) {
    return Contact.findById(id)
}

function addContact(contact) {
    const contactToAdd = new Contact(contact)
    const promise = contactToAdd.save()
    return promise
}

function findContactByFirstName(userID, name) {
    return Contact.find({ userID: userID, first_name: name })
}

function findContactByLastName(userID, name) {
    return Contact.find({ userID: userID, last_name: name })
}

function findContactByFirstAndLastName(userID, first, last) {
    return Contact.find({ userID: userID, first_name: first, last_name: last })
}

function findContactByFavorites(userID) {
    return Contact.find({ userID: userID, favorite: true })
}

async function findContactAndUpdate(id, updatedContactData) {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            updatedContactData,
            { new: true },
        )
        return updatedContact
    } catch (error) {
        console.error('Error updating contact:', error)
    }
}

async function findAndDelete(id) {
    try {
        const deletedContact = await Contact.findByIdAndDelete(id)
        return deletedContact
    } catch (error) {
        console.error('Error deleting contact:', error)
    }
}

export default {
    findContactById,
    addContact,
    getContacts,
    findContactByFirstName,
    findContactByLastName,
    findContactByFirstAndLastName,
    findAndDelete,
    findContactByFavorites,
    findContactAndUpdate,
}
