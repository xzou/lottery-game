var Participant = require('../models/participant.model.js');

// Retrieve and return all participants
exports.findAll = (req, res) => {
    Participant.find((err, participants) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: 'Error occurred while retrieving participants.'});
        } else {
            res.send(participants);
        }
    });
    
};

// Create and save a new Participant
exports.create = (req, res) => {
    const mturkCode = (() => {
        var code = '';
        var candidates = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 8; i++) 
            code += candidates.charAt(Math.floor(Math.random() * candidates.length)); 
        return code;
    })();

    var newParticipant = new Participant({
        age: req.body.age,
        gender: req.body.gender,
        ip: req.body.ip,
        isComplete: req.body.isComplete,
        mturkCode: mturkCode,
        name: req.body.name
    });

    newParticipant.save((err, data) => {
        console.log(data);
        if (err) {
            console.log(err);
            res.status(500).send({message: 'Error occured while creating Participant.'});
        } else {
            res.send(data);
        }
    });
};

// Find and return a single Participant by participantID
exports.findOne = (req, res) => {
    Participant.findById(req.params.participantId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: 'Error occurred while retrieving participant with id ' +
                req.params.participantId});
        } else {
            res.send(data);
        }
    });
};

// Update a participant identified by the participantId in the request
exports.update = (req, res) => {
    Participant.findById(req.params.participantId, (err, participant) => {
        if (err) {
            res.status(500).send({message: 'Could not find a participant with id ' + 
                req.params.participantId});
        }

        participant.endowment = req.body.endowment;
        participant.ip = req.body.ip;
        participant.isComplete = req.body.isComplete;
        participant.isCorrect = req.body.isCorrect;
        participant.netGains = req.body.netGains;
        participant.opponentNumber = req.body.opponentNumber;
        participant.payoff = req.body.payoff;
        participant.proportion = req.body.proportion;
        participant.reactionTime = req.body.reactionTime;
        participant.returned = req.body.returned;
        participant.actualProportion = req.body.actualProportion;

        participant.save((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({message: 'Could not update participant with id ' + 
                    req.params.participantId});
            } else {
                res.send(data);
            }
        });
    });
};

// Delete a participant with the specified participantId in the request
exports.delete = (req, res) => {
    Participant.remove({_id: req.params.participantId}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: 'Could not delete participant with id ' +
                req.params.participantId});
        } else {
            res.send({message: 'Participant deleted!'});
        }
    });
};
