import { z } from "zod";
import { observable } from "@trpc/server/observable";
import { procedure, router, subscription } from "../../trpc";
import { EventEmitter } from "events";

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

const eventEmitter = new EventEmitter();

export const chatRouter = router({
  getMessages: procedure
    .output(
      z
        .object({
          id: z.number(),
          text: z.string(),
        })
        .array()
    )
    .query(() => {
      return messages;
    }),
  update: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation((req) => {
      console.log(`Message to update is -- ${req.input.id}`);
      eventEmitter.emit("update", req.input.id);
      console.log("Done emitting");
      return { id: req.input.id };
    }),
  onUpdate: subscription(() => {
    console.log("inside subscription");
    return observable<number>((emit) => {
      const afterUpdate = (id: number) => {
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
});
