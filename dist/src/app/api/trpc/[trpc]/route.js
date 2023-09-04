"use strict";
// import * as trpcNext from "@trpc/server/adapters/next";
// import { appRouter } from "../../../server/router";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
// export default trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext: () => ({}),
// });
const fetch_1 = require("@trpc/server/adapters/fetch");
const root_1 = require("../../../server/routers/root");
const handler = (req) => (0, fetch_1.fetchRequestHandler)({
    endpoint: "/api/trpc",
    req,
    router: root_1.appRouter,
    createContext: () => ({}),
});
exports.GET = handler;
exports.POST = handler;
