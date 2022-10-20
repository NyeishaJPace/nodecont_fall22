const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    task: {type: String, required: true, max: 100},
    done: {type: Boolean, required: true}
})

module.exports = mongoose.model('Task', TaskSchema)