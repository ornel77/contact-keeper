//entry point to our backend
//we are creating a server

//we can't use import without implementing babel or typescript so we use this:
const express = require('express')

//init express
const app = express()

//create an end point /url
app.get('/', (req,res) => res.json({ msg: 'Welcome to the ContactKeeperAPI'}))

//Definine Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

//setting a port to listen on
//on deveppment we use port 5000 and on prod it's the process
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))