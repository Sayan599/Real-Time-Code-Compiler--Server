const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

module.exports = mongoose.model('Program', ProgramSchema);