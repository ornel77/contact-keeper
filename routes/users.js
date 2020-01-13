const express = require('express')

const router = express.Router()


//post request is when is when you submiting something to the server
//@route    POST api/users
//@desc     Register a user
//&access   Public
router.post('/', (req,res) => {
    res.send('Register a user')
})

module.exports = router