// import * as trpcNext from "@trpc/server/adapters/next";
// import { appRouter } from "../../../server/router";

// export default trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext: () => ({}),
// });

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../server/routers/root";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  });
export { handler as GET, handler as POST };
