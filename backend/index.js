import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dbInit from "./dbInit.js";
import employeeModel from "./models/employee.js";
import moment from "moment/moment.js";

const typeDefs = `#graphql
  type Employee {
    firstName: String
    lastName: String
    dateOfBirth: String
    dateOfJoining: String
    department: String
    type: String
    id: ID
    status: Int
    title: String
  }
  input EmployeeInput {
    firstName: String!
    lastName: String!
    dateOfBirth: String!
    dateOfJoining: String!
    department: String!
    type: String!
    title: String!
  }
  input EmployeeEditInput {
    department: String!
    title: String!
    status: Int!
  }
  type Query {
    getEmployees(type: String, upcomingRetire: Boolean): [Employee]
    getEmployee(id: String!): Employee
  }
  type Mutation {
    createEmployee(input: EmployeeInput): Employee
    deleteEmployee(id: String!): String
    editEmployee(id: String!, input: EmployeeEditInput): Employee
  }
`;
const resolvers = {
  Query: {
    getEmployees: async (_, { type, upcomingRetire }) => {
      try {
        const query = {
          type: type ? type : undefined,
          dateOfBirth: upcomingRetire
            ? {
                $gte: moment().subtract(65, "years").toDate(),
                $lte: moment()
                  .subtract(64, "years")
                  .subtract(6, "months")
                  .toDate(),
              }
            : undefined,
        };
        const data = await employeeModel.find(
          JSON.parse(JSON.stringify(query))
        );
        return data;
      } catch (e) {
        return { msg: e.message };
      }
    },
    getEmployee: async (_, { id }) => {
      try {
        const data = await employeeModel.findById(id);
        return data;
      } catch (e) {
        return { msg: e.message };
      }
    },
  },
  Mutation: {
    createEmployee: async (_, { input }) => {
      try {
        const data = await employeeModel.create({
          ...input,
          dateOfBirth: new Date(input.dateOfBirth),
          dateOfJoining: new Date(input.dateOfJoining),
          status: 1,
        });
        return data;
      } catch (e) {
        return { msg: e.message };
      }
    },
    editEmployee: async (_, { id, input }) => {
      try {
        const data = await employeeModel.findByIdAndUpdate(id, {
          ...input,
        });
        return data;
      } catch (e) {
        return { msg: e.message };
      }
    },
    deleteEmployee: async (_, { id }) => {
      try {
        await employeeModel.findByIdAndDelete(id);
        return id;
      } catch (e) {
        return { msg: e.message };
      }
    },
  },
};
const init = async () => {
  try {
    await dbInit();
    console.log("DB init success!");
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`Server starts at: ${url}`);
  } catch (e) {
    console.log(e);
  }
};

init();
