import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import { Task } from "@/models/Task";

const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    dueDate: String
    tags: [String!]!
  }

  type Query {
    hello: String
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String, tags: [String!]): Task!
    toggleTaskCompletion(id: ID!): Task!
    deleteTask(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Welcome to ProHabit API! Real-time features ready.",
    tasks: async () => {
      await dbConnect();
      return Task.find().sort({ createdAt: -1 });
    },
    task: async (_: any, { id }: { id: string }) => {
      await dbConnect();
      return Task.findById(id);
    },
  },
  Mutation: {
    createTask: async (_: any, { title, description, tags }: any) => {
      await dbConnect();
      const task = new Task({ title, description, tags: tags || [] });
      await task.save();
      return task;
    },
    toggleTaskCompletion: async (_: any, { id }: { id: string }) => {
      await dbConnect();
      const task = await Task.findById(id);
      if (!task) throw new Error("Task not found");
      task.completed = !task.completed;
      await task.save();
      return task;
    },
    deleteTask: async (_: any, { id }: { id: string }) => {
      await dbConnect();
      await Task.findByIdAndDelete(id);
      return true;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
