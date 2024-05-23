const express = require('express');
const debug = require('debug')('app:sessions');
const { MongoClient, ObjectId } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

authRouter
    .route('/signup')
    .post((req, res) => {
        
        const { username, password } = req.body;

        const url = 'mongodb://user:pass@localhost:27017';
        const dbName = 'fabiotesting';

        (async function addUser(){
            let client;

            try {
                client = await MongoClient.connect(url);
                debug('connected to mongo');
                const db = client.db(dbName);

                const user = {username, password};

                const result = await db.collection('users').insertOne(user);
                debug('Result is:');
                debug(result);

                req.login(result, () => {
                    res.redirect('/auth/profile');
                });

            } catch (error) {
                debug(error);
                console.log(error);
            }
            
            client.close();

        }())

        


        
    });

authRouter
    .route('/signin')
    .get((req, res) => {
        res.render('signin');
    })
    .post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureMessage: '/'
    }));

authRouter
    .route('/profile')
    .get((req, res) => {
        res.json(req.user);
    });


module.exports = authRouter;