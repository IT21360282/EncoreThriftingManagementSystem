const mongoose = require('mongoose')

const imageDetails = new mongoose.Schema(
    {
        image:String
    },
    {
        collection:"ImageDetails"
    }
)

module.exports = mongoose.model('ImageDetails', imageDetails)