import { httpBatchLink, wsLink, splitLink, createWSClient } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../server/routers/root";
import superjson from "superjson";
import getConfig from "next/config";

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

function getEndingLink() {
  if (typeof window === "undefined") {
    return httpBatchLink({
      url: `${APP_URL}/api/trpc`,
      // headers() {
      // if (!ctx?.req?.headers) {
      //   return {};
      // }
      // on ssr, forward client's headers to the server
      // return {
      //   ...ctx.req.headers,
      //   "x-ssr": "1",
      // };
      // },
    });
  }
  const client = createWSClient({
    url: WS_URL,
  });
  return wsLink<AppRouter>({
    client,
  });
}

const trpc = createTRPCNext<AppRouter>({
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
        getEndingLink(),
        // does not work for some reason
        // splitLink({
        //   condition: (op) => {
        //     console.log("in subs", op.type);
        //     return op.type === "subscription";
        //   },
        //   true: wsLink<AppRouter>({
        //     client: createWSClient({
        //       url: WS_URL,
        //     }),
        //   }),
        //   false: httpBatchLink({
        //     url: `${getBaseUrl()}/api/trpc`,
        //     async headers() {
        //       return {};
        //       // const { ctx } = opts;
        //       // if (!ctx?.req?.headers) {
        //       //   return {};
        //       // }
        //       // // To use SSR properly, you need to forward client headers to the server
        //       // // This is so you can pass through things like cookies when we're server-side rendering
        //       // return {
        //       //   cookie: ctx.req.headers.cookie,
        //       // };
        //     },
        //   }),
        // }),
      ],
      transformer: superjson,
    };
  },
  ssr: false, //  you can leave SSR disabled (the default) and use Server-Side Helpers to prefetch queries in getStaticProps or getServerSideProps.
});

export default trpc;
