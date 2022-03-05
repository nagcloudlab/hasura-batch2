
const { ApolloServer, gql } = require('apollo-server');

// datasource
const photos = [
    {
        id: 1,
        photo_url: "https://picsum.photos/200/300",
        description: "this is first photo",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        user_id: "Nag"
    },
    {
        id: 2,
        photo_url: "https://picsum.photos/200/300",
        description: "this is second photo",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        user_id: "Diya"
    }
]
const comments = {
    1: [
        { id: 11, comment: "this is first comment" },
        { id: 22, comment: "this is second comment" }
    ],
    2: [
        { id: 33, comment: "this is first comment" },
    ]
}

const typeDefs = gql`
    type Comment{
        id: ID,
        comment: String
    }
    type Photo{
        id: ID!
        photo_url: String!
        description: String
        isPublished: Boolean
        comments: [Comment]
    }

    // read operation
    type Query{
        photos:[Photo]
        photo_by_pk(id:ID!): Photo
    }

`

const resolvers = {
    Query: {
        photos: () => {
            return photos;
        },
        photo_by_pk: (parent, args, context, info) => {
            let { id } = args
            return photos.find(p => p.id === parseInt(id))
        }
    },
    Photo: {
        comments: (parent, args, context, info) => {
            return comments[parent.id]
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});