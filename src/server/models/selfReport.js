let mongoose = require('mongoose');

//self report schema 
let reportSchema = mongoose.Schema(
    {
        age:
        {
            type: Number,
            required: true
        },
        didRememberSongs:
        {
            type: Boolean,
            required: true
        },
    }
)

let report = module.exports =
    mongoose.model('Report', reportSchema);
