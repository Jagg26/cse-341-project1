const router = require('express').Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getContactById);

// router.post('/', usersController.createUser);

// router.put('/:id', usersController.updateUser);

// router.delete('/:id', usersController.deleteUser);

module.exports = router;