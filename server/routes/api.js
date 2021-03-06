const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) throw err;
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {

    //response.data = ['User1', 'User2', 'User3', 'User4'];
    //res.json(response);

    connection((db) => {
    
        db.createCollection("users", function(err, res) {
            if (err) sendError(err, res);
            console.log("Collection created!");
        })

        var myobj = { name: "User 1", address: "User 1 address" };
        db.collection("users").insertOne(myobj, function(err, res) {
            if (err) sendError(err, res);
            console.log("1 document inserted");
        })

        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                console.log("# users found:" + users);
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
        });
    });

module.exports = router;