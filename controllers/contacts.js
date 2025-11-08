// controllers/contacts.js
const mongodb = require('../data/database.js');
const { ObjectId } = require('mongodb');

// GET /contacts
const getAllContacts = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /contacts/:id
const getContactById = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const contact = await db.collection('contacts').findOne({ _id: contactId });
    if (contact) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
};
