//here we using mongoose to connect our db
const mongoose = require('mongoose')
const config = require('config')


//init db
const db = config.get('mongoURI')

//MONGOOSE RETURN PROMISES

// const connectDB = () => {
//     mongoose.connect(db, {
//         useNewUrlParser: true,
//         useCreateIndex:true,
//         useFindAndModify:false
//     })
//     .then(() => console.log('MongoDB Connected'))
//     .catch((err) => {
//         console.log(err.message)
//         process.exit(1)  //exit with failure
//     })
// }

//USING ASYNC AWAIT
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex:true,
            useFindAndModify:false
        }) 
        console.log('MongoDB Connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)  //exit with failure
    }
}

module.exports = connectDB