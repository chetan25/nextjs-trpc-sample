"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const zod_1 = require("zod");
// import { observable } from "@trpc/server/observable";
const trpc_1 = require("../../trpc");
// import { EventEmitter } from "events";
const messages = [
    {
        id: 1,
        text: "Hello World",
    },
    {
        id: 2,
        text: "Sunny Day",
    },
    {
        id: 3,
        text: "Bonjour",
    },
];
// const eventEmitter = new EventEmitter();
exports.chatRouter = (0, trpc_1.router)({
    getMessages: trpc_1.procedure
        .output(zod_1.z
        .object({
        id: zod_1.z.number(),
        text: zod_1.z.string(),
    })
        .array())
        .query(() => {
        return messages;
    }),
    // update: procedure
    //   .input(
    //     z.object({
    //       id: z.number(),
    //     })
    //   )
    //   .mutation((req) => {
    //     console.log(`Message to update is -- ${req.input.id}`);
    //     eventEmitter.emit("update", req.input.id);
    //     console.log("Done emitting");
    //     return { id: req.input.id };
    //   }),
    // onUpdate: subscription(() => {
    //   console.log("inside subscription");
    //   return observable<number>((emit) => {
    //     const afterUpdate = (id: number) => {
    //       console.log("afterUpdate");
    //       emit.next(id);
    //     };
    //     eventEmitter.on("update", afterUpdate);
    //     // close
    //     return () => {
    //       eventEmitter.off("update", afterUpdate);
    //     };
    //   });
    // }),
});
