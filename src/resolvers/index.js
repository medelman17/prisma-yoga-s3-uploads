import * as queries from "./queries";
import * as mutations from "./mutations";

const resolvers = {
  Query: {
    ...queries
  },
  Mutation: {
    ...mutations
  }
};

export default resolvers;