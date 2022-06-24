const { Router } = require('express');
const {getContacts, addContact, updateContact, deleteContact} = require('./contact');
const router = Router();

router.get('/', getContacts);
router.post('/', addContact);
router.put('/', updateContact);
router.delete('/', deleteContact);

module.exports = router;