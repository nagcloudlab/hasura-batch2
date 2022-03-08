import { ApolloServer, gql } from "apollo-server-cloud-functions";
import { auth } from "firebase-admin";

const typeDefs = gql`
  type UserProfile {
    id: ID!
    email: String
    displayName: String
  }
  type Query {
    get_user_profile(id: ID!): UserProfile
  }
`;

const resolvers = {
  Query: {
    get_user_profile: async (_: any, args: any) => {
      if (!args.id) return null;
      const { uid, email, displayName } = await auth().getUser(args.id);
      return {
        id: uid,
        email,
        displayName,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

export default server;

