import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";

const QueryClient = `
import trpc from "@/app/utils/trpcHelper";

const Component = () => {
    // calling the greeting query procedure on trpc instance
    const hello = trpc.greeting.useQuery({ text: "Bingo" });

    return <h4>{!hello.data ? 'loading....' : hello.data.greeting} </h4>
}
`;

const QueryServer = `
const appRouter = router({
    greeting: procedure
      .input(
        z.object({
          text: z.string(),
        })
      )
      .query(async (opts) => {
        const greeting = await new Promise<string>((res) => {
          setTimeout(() => {
            res("Welcome user: " +   opts.input.text);
          }, 500);
        });
  
        return {
          greeting,
        };
      }),
    });  
`;

const MutationClient = `
import trpc from "@/app/utils/trpcHelper";

const Component = () => {
    const [name, setName] = useState();
    // create a reference to be fired in OnCLick 
    const mutation = trpc.update.useMutation();
    
    const onChange = (e) => {
       setName(e.currentTarget.value);
    }

    const handleClick = () => {
      mutation.mutate({ name: name });
    };

    return <>
      <input value={name} placeholder="Enter Name" onChange={onChange} />
      <button onClick={handleClick}>Update Name</button>
    </>
}
`;

const MutationServer = `
let name = '';
const appRouter = router({
  update: procedure
  .input(
    z.object({
      name: z.string(),
    })
  )
  .mutation((req) => {
    // local name store in server for simplicity
    name = req.input.name;
    return { name: req.input.name };
  }),   
});  
`;

const SubscriptionClient = `
import trpc from "@/app/utils/trpcHelper";

const Component = () => {
  // setup listener
  trpc.onUpdate.useSubscription(undefined, {
    onData: (id) => {
      console.log("updated id is" +  id);
    },
    onError: () => {
      console.log("error in subscription");
    },
    onStarted: () => {
      console.log("started listening");
    },
  });
  const handleClick = () => {
    mutation.mutate({ name: name });
  };

  return <>
    <input value={name} placeholder="Enter Name" onChange={onChange} />
    <button onClick={handleClick}>Update Name</button>
  </>
}
`;

const SubscriptionServer = `
import { EventEmitter } from "events";

const eventEmitter = new MyEventEmitter();

const appRouter = router({
  update: procedure
  .input(
    z.object({
      name: z.string(),
    })
  )
  .mutation(async (req) => {
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
    return observable<number>((emit) => {
      const afterUpdate = (id: number) => {
        console.log("afterUpdate in subsciption");
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
`;

const Block = ({ language, code }: { language: string; code: string }) => {
  return (
    <CopyBlock
      // @ts-ignore
      language={language}
      // @ts-ignore
      text={code}
      showLineNumbers={false}
      theme={dracula}
      wrapLines={true}
      codeBlock
    />
  );
};

export const QueryClientBlock = () => {
  return <Block language="jsx" code={QueryClient} />;
};

export const QueryServerBlock = () => {
  return <Block language="js" code={QueryServer} />;
};

export const MutationClientBlock = () => {
  return <Block language="js" code={MutationClient} />;
};

export const MutationServertBlock = () => {
  return <Block language="js" code={MutationServer} />;
};

export const SubscriptionClientBlock = () => {
  return <Block language="js" code={SubscriptionClient} />;
};

export const SubscriptionServertBlock = () => {
  return <Block language="js" code={SubscriptionServer} />;
};
