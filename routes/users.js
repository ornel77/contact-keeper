const express = require('express')
const router = express.Router()

//to make sure that things are sent:
const { check, validationResult } = require('express-validator/check')

const User = require('../models/User')

//post request is when is when you submiting something to the server

//@route    POST api/users
//@desc     Register a user
//&access   Public

//check method : what we want to check, the message and the rule
router.post('/', [
    check('name', 'Please add name').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a ppasword with 6 or more characters').isLength({ min: 6})
], (req,res) => {
    //gives the data send to the route (email, name , pswd..)
    // res.send(req.body) 
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        //we want to return a bad request status (400)
        return res.status(400).json({errors: errors.array()})
    }

    res.send('passed')
})

module.exports = router