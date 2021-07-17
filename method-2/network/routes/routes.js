const express = require('express');
const router = express.Router();
const controller = require('../services/controller');

//home-page
router.get('/', (req,res) =>{
    res.send("API works!");
});

//registering a webhook
router.post('/register', controller.register);

//fetching all the webhooks
router.get('/list', controller.list);

// updating webhook
router.post('/update', controller.update);

//deleting a webhook
router.post('/delete', controller.delete);

// triggering all the webhook urls
router.get('/ip', controller.trigger);



module.exports = router;