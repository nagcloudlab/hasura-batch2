const _ = require('lodash')

module.exports = {
    Query: {
        sessions: (parent, args, { dataSources }, info) => {
            return dataSources.sessionAPI.getSessions()
        },
        sessionById: (parent, args, { dataSources }, info) => {
            let { id } = args
            return dataSources.sessionAPI.getSessionById(id)
        },
        speakers: (parent, args, { dataSources }, info) => {
            return dataSources.speakerAPI.getSpeakers(args);
        },
        speakerById: (parent, { id }, { dataSources }, info) => {
            return dataSources.speakerAPI.getSpeakerById(id)
        }
    },
    Speaker: {
        sessions: (speaker, args, { dataSources }, info) => {
            const sessions = dataSources.sessionAPI.getSessions()
            return sessions.filter(session => {
                return _.filter(session.speakers, { id: speaker.id }).length > 0
            })
        }
    },
    Session: {
        speakers: async (session, args, { dataSources }, info) => {
            const speakers = await dataSources.speakerAPI.getSpeakers();
            const returns = speakers.filter((speaker) => {
                return _.filter(session.speakers, { id: speaker.id }).length > 0;
            });
            return returns;
        }
    },
    Mutation: {
        deleteSession: (parent, args, { dataSources }) => {
            let { id } = args
            return dataSources.sessionAPI.deleteSession(id)
        },
        addNewSession: (parent, { session }, { dataSources }) => {
            return dataSources.sessionAPI.addSession(session)
        },
        toggleFavoriteSession: (parent, { id }, { dataSources }, info) => {
            return dataSources.sessionAPI.toggleFavoriteSession(id)
        },
    },
}