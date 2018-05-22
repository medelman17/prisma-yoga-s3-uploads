import { GraphQLServer } from "graphql-yoga";

import { db, schema } from "./src/config/schema";

const server = new GraphQLServer({ schema, context: { db } });
server.start(() => console.log("Server is running on localhost:4000"));