"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_module_css_1 = __importDefault(require("./page.module.css"));
const trpcHelper_1 = __importDefault(require("./utils/trpcHelper"));
const Home = () => {
    const mutation = trpcHelper_1.default.update.useMutation();
    const hello = trpcHelper_1.default.hello.useQuery({ text: "client" });
    console.log({ hello });
    // const chat = trpc.chat.getMessages.useQuery();
    // console.log(chat.data);
    trpcHelper_1.default.onUpdate.useSubscription(undefined, {
        onData: (id) => {
            console.log(`updated id is ${id}`);
        },
        onError: () => {
            console.log("error in subscription");
        },
        onStarted: () => {
            console.log("started listening");
        },
    });
    const handleClick = () => {
        console.log("dsdsdsds");
        mutation.mutate({ id: 2 });
        console.log("after");
    };
    if (!hello.data) {
        return <div>Loading...</div>;
    }
    return (<main className={page_module_css_1.default.main}>
      <div>
        <h2>Get started by editing</h2>
        <button onClick={handleClick}>Update messgae</button>
        <p>{hello.data.greeting}</p>
      </div>
    </main>);
};
exports.default = trpcHelper_1.default.withTRPC(Home);
