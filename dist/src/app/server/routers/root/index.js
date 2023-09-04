"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const zod_1 = require("zod");
const observable_1 = require("@trpc/server/observable");
const chat_1 = require("../chat");
const trpc_1 = require("../../trpc");
const events_1 = require("events");
const eventEmitter = new events_1.EventEmitter();
exports.appRouter = (0, trpc_1.router)({
    hello: trpc_1.procedure
        .input(zod_1.z.object({
        text: zod_1.z.string(),
    }))
        .query((opts) => {
        console.log("query");
        return {
            greeting: `hello ${opts.input.text}`,
        };
    }),
    update: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.number(),
    }))
        .mutation((req) => {
        console.log(`Message to update is -- ${req.input.id}`);
        eventEmitter.emit("update", req.input.id);
        console.log("Done emitting");
        return { id: req.input.id };
    }),
    onUpdate: (0, trpc_1.subscription)(() => {
        console.log("inside subscription");
        return (0, observable_1.observable)((emit) => {
            const afterUpdate = (id) => {
                console.log("afterUpdate");
                emit.next(id);
            };
            eventEmitter.on("update", afterUpdate);
            // close
            return () => {
                eventEmitter.off("update", afterUpdate);
            };
        });
    }),
    chat: chat_1.chatRouter,
});
