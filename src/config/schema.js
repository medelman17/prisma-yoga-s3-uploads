import { makeExecutableSchema } from "graphql-tools";
import { Prisma } from "../generated/prisma";

import resolvers from "../resolvers";
import * as directiveResolvers from "../directives";

import typeDefs from "./schema.graphql";

export const db = new Prisma({
  endpoint: "https://us1.prisma.sh/michael-edelman-ba8919/prisma-s3-file-uploads/dev" || process.env.PRISMA_ENDPOINT,
  secret: "supersecret123" || process.env.PRISMA_SECRET,
  debug: process.env.env === "dev"
});

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers
});