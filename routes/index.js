const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/contacts', require('./contacts'));

module.exports = router;

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);

