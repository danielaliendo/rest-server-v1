const mongoose = require('mongoose')

const connection = async () => {
    
    try {
       await mongoose.connect(process.env.MONGO_CNN)
        console.log('database is online')
    } catch (error) {
        console.log(error)
        throw new Error('Error starting database')
    }

}

module.exports = {
    connection
}