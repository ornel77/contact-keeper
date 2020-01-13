const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

//to make sure that things are sent:
const { check, validationResult } = require('express-validator/check')

const User = require('../models/User')





//@route            GET api/auth
//@description      Get logged in user
//&access           Private
router.get('/', (req,res) => {
    res.send('Get logged in user')
})


//@route            POST api/auth
//@description      Auth user and get token
//&access           Public
router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'password is required').exists()
], async (req,res) => {
    //gives the data send to the route (email, name , pswd..)
    // res.send(req.body) 
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        //we want to return a bad request status (400)
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password } =req.body 
    try {
        let user  = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        //si ce n'est pas les même pswd
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials'})
        }

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
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router