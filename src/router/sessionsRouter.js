const express = require('express');
const debug = require('debug')('app:sessions');
const { MongoClient, ObjectId } = require('mongodb');

const sessionsRouter = express.Router();


sessionsRouter.route('/')
    .get((req, res) => {

        const url = 'mongodb://user:pass@localhost:27017';
        const dbName = 'fabiotesting';

        (async function mongo(){

            let client;
            
            try {
                debug('trying to connected to mongo');
                client = await MongoClient.connect(url);
                debug('connected to mongo');
                const db = client.db(dbName);
                const session = await db.collection('sessions').find().toArray();

                res.render('sessions', { sessionData: session});

            }
            catch (error) {
                debug(error.stack);
                res.send(error.stack);
            }
            client.close();

        }());
    });
sessionsRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        const url = 'mongodb://user:pass@localhost:27017';
        const dbName = 'fabiotesting';

        (async function mongo(){

            let client;
            
            try {
                debug('trying to connected to mongo');
                client = await MongoClient.connect(url);
                debug('connected to mongo');
                const db = client.db(dbName);
                const session = await db.collection('sessions').findOne({_id: new ObjectId(id)});

                res.render('session', {session});

            }
            catch (error) {
                debug(error.stack);
                res.send(error.stack);
            }

            client.close();

        }());
    });

module.exports = sessionsRouter;