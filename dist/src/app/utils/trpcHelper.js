"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@trpc/client");
const next_1 = require("@trpc/next");
const superjson_1 = __importDefault(require("superjson"));
// const { publicRuntimeConfig } = getConfig();
const publicRuntimeConfig = {
    // Will be available on both server and client
    APP_URL: "http://localhost:3000",
    WS_URL: "ws://localhost:3000",
};
const { APP_URL, WS_URL } = publicRuntimeConfig;
console.log(WS_URL, APP_URL);
const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        return "";
    }
    return `${APP_URL}`;
    // if (process.env.VERCEL_URL)
    //   // reference for vercel.com
    //   return `https://${process.env.VERCEL_URL}`;
    // // assume localhost
    // return `http://localhost:${process.env.PORT ?? 3000}`;
};
const trpc = (0, next_1.createTRPCNext)({
    config({ ctx }) {
        return {
            links: [
                // httpBatchLink({
                //   url: `${getBaseUrl()}/api/trpc`,
                //   async headers() {
                //     return {};
                //     // const { ctx } = opts;
                //     // if (!ctx?.req?.headers) {
                //     //   return {};
                //     // }
                //     // // To use SSR properly, you need to forward client headers to the server
                //     // // This is so you can pass through things like cookies when we're server-side rendering
                //     // return {
                //     //   cookie: ctx.req.headers.cookie,
                //     // };
                //   },
                // }),
                // wsLink({
                //   client: createWSClient({
                //     url: "ws://localhost:3000",
                //   }),
                // }),
                (0, client_1.splitLink)({
                    condition: (op) => {
                        console.log("in subs");
                        return op.type === "subscription";
                    },
                    true: (0, client_1.wsLink)({
                        client: (0, client_1.createWSClient)({
                            url: WS_URL,
                        }),
                    }),
                    false: (0, client_1.httpBatchLink)({
                        url: `${getBaseUrl()}/api/trpc`,
                        async headers() {
                            return {};
                            // const { ctx } = opts;
                            // if (!ctx?.req?.headers) {
                            //   return {};
                            // }
                            // // To use SSR properly, you need to forward client headers to the server
                            // // This is so you can pass through things like cookies when we're server-side rendering
                            // return {
                            //   cookie: ctx.req.headers.cookie,
                            // };
                        },
                    }),
                }),
            ],
            transformer: superjson_1.default,
        };
    },
    ssr: false, //  you can leave SSR disabled (the default) and use Server-Side Helpers to prefetch queries in getStaticProps or getServerSideProps.
});
exports.default = trpc;
