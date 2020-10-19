const express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

var Users = require('../models/user');

router.post('/sign-in', async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (user) {
            const cmp = await user.compare(req.body.password, user.password);
            if (cmp) {
                //Access Token
                const token = jwt.sign({ email: user.email }, 'hjn6jvn2ais1knpw1222kinsisan13y787y1787', { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) })
                const data = Object.assign({},user._doc)                
                delete data.password;
                delete data.confirmPassword;

                res.status(201);
                return res.json({
                    sc: 201,
                    sm: 'Login Successful',
                    authToken: token,
                    data : data

                })
            } else {
                res.status(401);
                return res.json({
                    sc: 401,
                    sm: 'Wrong password.'
                })
            }
        } else {
            res.status(401);
            return res.json({
                sc: 401,
                sm: 'Wrong email or password.'
            })
        }
    } catch (err) {
        next(err);
    }
});

router.post('/sign-up', (req, res, next) => {
    try {
        var user = new Users({
            username: req.body.username,
            email: req.body.email,
            password: Users.hashPassword(req.body.password),
            confirmPassword: Users.hashConfirmPassword(req.body.confirmPassword),
        });
        Users.findOne({ email: req.body.email }, (err, doc) => {
            if (doc) {
                res.status(401);
                return res.json({
                    sc: 401,
                    sm: 'Email-id already exists!'
                })
            } else if (req.body.password === req.body.confirmPassword) {
                user.save((err, doc) => {
                    if (!err) {
                        res.status(201);
                        return res.json({
                            sc: 201,
                            sm: 'Record created successfully!'
                        })
                    }
                    else { console.log('Error in Sign-up :' + JSON.stringify(err, undefined, 2)); }
                });
            } else {
                res.status(400);
                return res.json({
                    sc: 400,
                    sm: 'Password and confirmPassword mismatch!'
                })
            }
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;