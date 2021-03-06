const { Router } = require('express');
const {addContact, deleteContact, getContacts, updateContact} = require('./contact');
const router = Router();

router.get('/', getContacts);
router.post('/', addContact);
router.put('/', updateContact);
router.delete('/', deleteContact);

module.exports = router;