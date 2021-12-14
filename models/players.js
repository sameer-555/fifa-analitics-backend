const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    player_id: { type: Number, required: true },
    name: { type: String, required: true },
    nationality: { type: String, required: true },
    position: { type: String, required: true },
    overall: { type: Number, required: true },
    age: { type: Number, required: true },
    hits: { type: Number, required: true },
    potential: { type: Number, required: true },
    team: { type: String, required: true }
});

module.exports = mongoose.model('Players', playerSchema);