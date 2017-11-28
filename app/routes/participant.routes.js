module.exports = (app) => {
    var participants = require('../controllers/participant.controller.js');

    /* '/api/participants'
     *  GET: finds all participants
     *  POST: creates a new participants
     */
    app.route('/api/participants')
        .get(participants.findAll)
        .post(participants.create);

    /* '/api/participants/:id'
     *  GET: find participant by id
     *  PUT: update participant by id
     *  DELETE: delete participant by id
     */
    app.route('/api/participants/:participantId')
        .get(participants.findOne)
        .put(participants.update)
        .delete(participants.delete);
};
