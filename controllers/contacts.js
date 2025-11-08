// controllers/contacts.js
const mongodb = require('../data/database.js');
const { ObjectId } = require('mongodb');

// GET /contacts
const getAllContacts = async (req, res) => {
  //$swagger.tags = ['Contacts']
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
  //$swagger.tags = ['Contacts']
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

// POST /contacts
const createContact = async (req, res) => {
  //$swagger.tags = ['Contacts']
  try {
    const newContact = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      ipaddress: req.body.ipaddress,
    };
    const db = mongodb.getDb();
    const result = await db.collection('contacts').insertOne(newContact);
    if(result.acknowledged){
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'Contact created successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /contacts/:id
const updateContact = async (req, res) => {
  //$swagger.tags = ['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      ipaddress: req.body.ipaddress,
    };
    const db = mongodb.getDb();
    const result = await db.collection('contacts').updateOne(
      { _id: contactId },
      { $set: updatedContact }
    );
    if (result.matchedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'Contact updated successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /contacts/:id
const deleteContact = async (req, res) => {
  //$swagger.tags = ['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const result = await db.collection('contacts').deleteOne({ _id: contactId });
    if (result.deletedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'Contact deleted successfully' });
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
  createContact,
  updateContact,
  deleteContact,
};
