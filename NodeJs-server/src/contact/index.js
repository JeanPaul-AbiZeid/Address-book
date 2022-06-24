const { Router } = require('express');
const {addContact} = require('./contact');
const router = Router();

// router.get('/', getContacts);
router.post('/add', addContact);
// router.put('/', updateContact);
// router.delete('/', deleteContact);

module.exports = router;