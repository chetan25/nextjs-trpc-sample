import React, { useState } from "react";
import trpc from "@/app/utils/trpcHelper";
// import { useNameStore } from "@/app/hooks/states";
import {
  SubscriptionClientBlock,
  SubscriptionServertBlock,
} from "./CodeBlocks";

const ActiveSubscription = () => {
  //   const setName = useNameStore((state) => state.setName);

  trpc.onUpdate.useSubscription(undefined, {
    onData: (name) => {
      console.log(`updated id is ${name}`);
    },
    onError: () => {
      console.log("error in subscription");
    },
    onStarted: () => {
      console.log("started listening");
    },
  });

  return null;
};

const SubscriptionAction = () => {
  const [subs, setSubs] = useState(false);

  return (
    <article className="prose lg:prose-xl p-3">
      <h2>Subscription</h2>
      <p>
        A subscription is just like a web socket that can stream continous data
        from server to client and vice versa
      </p>
      <div>
        <h3>Client Code</h3>
        <SubscriptionClientBlock />
      </div>
      <div>
        <h3>Server Code</h3>
        <SubscriptionServertBlock />
      </div>
      <div>
        <h4>
          Fire subscription to start listening to name update and check console
        </h4>
        <button
          type="submit"
          onClick={() => {
            setSubs(true);
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Fire Subscription
        </button>
        {subs && <ActiveSubscription />}
      </div>
    </article>
  );
};

export default SubscriptionAction;
