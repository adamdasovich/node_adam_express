const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Lessons.removeMessage(id)
    .then(count => {
        if (count > 0){
        res
        .status(200)
        .json({ message: `Message with id ${id} successful.`})
    }else{
        res.status(404).json({ message: "No messages with that id."})
    }
    })
    .catch(error => {
    res.status(500).json({ message: " Unable to delete message"})
     });
});

module.exports = router;