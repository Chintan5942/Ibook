const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/ibook"


const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connectiuon succesfully with mongoo", mongoURI);
    })
}
module.exports = connectToMongo;