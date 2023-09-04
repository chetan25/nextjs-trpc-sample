const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { applyWSSHandler } = require("@trpc/server/adapters/ws");
const ws = require("ws");
import { appRouter } from "./routers/root/index";

console.log(process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
// const app = next({ dev });
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  //@ts-ignore

  const server = createServer((req, res) => {
    // const proto = req.headers["x-forwarded-proto"];
    // if (proto && proto === "http") {
    //   // redirect to ssl
    //   res.writeHead(303, {
    //     location: `https://` + req.headers.host + (req.headers.url ?? ""),
    //   });
    //   res.end();
    //   return;
    // }
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const wss = new ws.Server({ server });
  const handler = applyWSSHandler({
    wss,
    router: appRouter,
    createContext: () => {},
  });

  //@ts-ignore
  console.log("✅ WebSocket Server listening on ws://localhost:3000");

  process.on("SIGTERM", () => {
    console.log("SIGTERM");
    handler.broadcastReconnectNotification();
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
