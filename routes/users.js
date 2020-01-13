const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

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
], async (req,res) => {
    //gives the data send to the route (email, name , pswd..)
    // res.send(req.body) 
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        //we want to return a bad request status (400)
        return res.status(400).json({errors: errors.array()})
    }

    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if(user) {
            return res.status(400).json({ msg: 'User already exists'})
        }

        //else we create a new user with User model
        user = new User({
            name,
            email,
            password
        })

        //encrypt password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        //to generate a token we have to sign it
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000, //seconds
        }, (err,token) => {
            if(err) throw err
            res.json({ token })
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router