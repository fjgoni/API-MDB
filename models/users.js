const mongoose = require('mongoose');

let PersonSchema = mongoose.Schema({
    name: String,
    surname: String,
    id: Number

});
module.exports = mongoose.model("Person", PersonSchema);