const { gql } = require('apollo-server')

const typeDefs = gql`

    type Speaker{
        id:ID!
        bio: String
        name: String,
        sessions: [Session]
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
        favorite: Boolean
        speakers: [Speaker]
    }
    
    input SessionInput{
        title: String!
        description: String
        startsAt: String
        endsAt: String
        room: String
        day: String
        format: String
        track: String
        level: String,
      }
      

    type Query{
        sessions(
            title: String
            room: String
        ): [Session]
        sessionById(id:ID!):Session
        speakers:[Speaker]
        speakerById(id:ID!):Speaker
    }


    type Mutation{
        deleteSession(id:ID!):Boolean
        addNewSession(session:SessionInput!):Session!
        toggleFavoriteSession(id:ID!):Session 
    }


`;

module.exports = typeDefs