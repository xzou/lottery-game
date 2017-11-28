var mongoose = require('mongoose');

var ParticipantSchema = mongoose.Schema({
    age: Number, 
    gender: String,
    ip: String,
    isComplete: Boolean,
    isCorrect: Boolean,
    mturkCode: String,
    name: String,
    payoff: Number,
    actualProportion: [Number],
    endowment: [Number],
    netGains: [Number],
    opponentNumber: [Number],
    proportion: [Number],
    reactionTime: [Number],
    returned: [Number],
}, {
    timestamps: true
});

module.exports = mongoose.model('Participant', ParticipantSchema);
