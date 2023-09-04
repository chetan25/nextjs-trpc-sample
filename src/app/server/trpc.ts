// import { Context } from './context';
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

// const Context
const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const procedure = t.procedure;
export const subscription = t.procedure.subscription;
export const middleware = t.middleware;
