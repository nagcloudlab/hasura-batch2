
const sessions = require('../data/sessions.json')
const _ = require('lodash')
const axios = require('axios')

module.exports = {
    Query: {
        ping: () => {
            return "pong"
        },
        sessions: (parent, args, context, info) => {
            return _.filter(sessions, args);
        },
        sessionById: (parent, args, context, info) => {
            let { id } = args
            const session = _.filter(sessions, { id: parseInt(id) });
            return session[0]
        },
    }
}