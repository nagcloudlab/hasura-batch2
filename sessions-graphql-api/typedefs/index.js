const { gql } = require('apollo-server')

const typeDefs = gql`

    type Speaker{
        id:ID!
        bio: String
        name: String,
    }

    type Session {
        id: ID!
        title: String!
        description: String
        startsAt: String
        endsAt: String
        room: String
        day: String
        format: String
        track: String
        level: String,
        speakers: [Speaker]
    }

    type Query{
        ping: String
        sessions(
            title: String
            description: String
            startsAt: String
            endsAt: String
            room: String
            day: String
            format: String
            track: String
            level: String
        ): [Session]
        sessionById(id:ID!):Session
    }

`;

module.exports = typeDefs