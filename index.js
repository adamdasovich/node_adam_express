const express = require('express');
const Lessons = require('./models/dbHelpers');

const server = express();


server.use(express.json());

const PORT = 3000;

server.get('/', (req, res) => {
    res.status(200).json({message: "I hope it works this time."})
})

server.post('/api/lessons', (req, res) => {
    Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson)
    })
    .catch(error => {
        res.status(500).json({ message: "cannot add lesson"});
    })
});

server.get('/api/lessons', (req, res) => {
    Lessons.find()
    .then(lessons => {
        res.status(200).json(lessons)
    })
    .catch(error => {
        res.status(500).json({ message: "cannot find lessons, Dumbass!" })
    });
});

server.get('/api/lessons/:id', (req, res) => {
    const { id } = req.params;

    Lessons.findById(id)
    .then(lesson => {
        if (lesson) {
           res.status(200).json(lesson) 
        }else{
            res.status(404).json({ message: "Record not found"});
        }
        
    })
    .catch(error => {
        res.status(500).json({ message: "you messed everything up"})
    })
})

server.delete('/api/lessons/:id', (req, res) => {
    const { id } = req.params;

    Lessons.remove(id)
    .then(lesson => {
        if (lesson) {
            res.status(200).json({ message: "Successfully deleted"})
        }else{
            res.status(404).json({ message: "unable to delete"})
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'unable to delete'})
    })
})

server.patch('/api/lessons/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Lessons.update(id, changes)
        .then(lesson => {
            if (lesson) {
                res.status(200).json(lesson)
            }else{
                res.status(404).json({ message: "Record not found"})
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error updating record'})
        })
  
    });

    server.post('/api/lessons/:id/messages', (req, res) => {
        const { id } = req.params;
        const msg = req.body;

        if (!msg.lesson_id) {
            msg['lesson_id'] = parseInt(id, 10)
        }

        Lessons.findById(id)
        .then(lesson => {
            if (!lesson) {
                res.status(404).json({ message: "invalid Id"})
            }
            // check for all required fields that we made not nullable
            if (!msg.sender || !msg.text) {
                res.status(400).json({ message: "Must provide both sender and text values."})
            }

            Lessons.addMessage(msg, id)
            .then(message => {
                if (message) {
                    res.status(200).json(message)
                }
            })
            .catch(error => {
                res.status(500).json({ message: " Error, you dumb ass!"})
            })
        })
        .catch(error => {
            res.status(500).json({ message: "Error finding lesson"})
        })
    })

server.listen(PORT, () => {
    console.log(`The server is now listening on port: ${PORT}`)
});