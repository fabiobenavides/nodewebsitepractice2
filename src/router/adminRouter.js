const express = require('express');
const debug = require('debug')('app:adminRouter');
const { mongoClient } = require('mongodb');
const sessionData = require('../data/sessions.json');

const adminRouter = express.Router();

adminRouter
    .route('/')
    .get((req, res) => {
        const url = 'mongodb://user:pass@localhost:27017';
        const dbName = 'fabiotesting';

        (async function mondo(){

            let client;
            
            try {
                debug('trying to connected to mongo');
                client = await mongoClient.connect(url, { useUnifiedTopology: true });
                debug('connected to mongo');

                const db = client.db(dbName);
                const response = await db.collection('sessions').insertMany(sessionData);

                res.json(response);

            }
            catch (error) {
                debug(error.stack);
            }

        }())

        
    });

module.exports = adminRouter;