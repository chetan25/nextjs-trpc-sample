import { z } from "zod";
import { observable } from "@trpc/server/observable";
import { chatRouter } from "../chat";
import { procedure, router, subscription } from "../../trpc";
import { EventEmitter } from "events";

class MyEventEmitter extends EventEmitter {}

const eventEmitter = new MyEventEmitter();

let userName = null;

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      const greeting = await new Promise<string>((res) => {
        setTimeout(() => {
          res(`Welcome user:  ${opts.input.text}`);
        }, 500);
      });

      console.log(greeting, "greeting");
      return {
        greeting,
      };
    }),
  getJoke: procedure.query(async () => {
    return new Promise<string>((res) => {
      setTimeout(() => {
        res(
          "Did you hear about the monkeys who shared an Amazon account? They were Prime mates."
        );
      }, 500);
    });
  }),
  update: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async (req) => {
      console.log(`Message to update is -- ${req.input.name}`);
      eventEmitter.emit("update", req.input.name);
      console.log("Done emitting in mutation");
      return new Promise<{ name: string }>((res) => {
        setTimeout(() => {
          res({
            name: req.input.name,
          });
        }, 500);
      });
    }),

  onUpdate: procedure.subscription(() => {
    console.log("inside subscription");
    return observable<string>((emit) => {
      console.log("inside subscription observable");
      const afterUpdate = (name: string) => {
        console.log("afterUpdate in subsciption");
        emit.next(name);
      };
      eventEmitter.on("update", afterUpdate);

      // close
      return () => {
        eventEmitter.off("update", afterUpdate);
      };
    });
  }),
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
