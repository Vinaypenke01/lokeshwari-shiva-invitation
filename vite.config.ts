import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

function devSsrPlugin(): Plugin {
  return {
    name: "dev-ssr-handler",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "/";

        // Prevent Chrome DevTools workspace probing from hitting default 404 with restrictive CSP
        if (url.startsWith("/.well-known/")) {
          res.statusCode = 204;
          res.end();
          return;
        }

        // Only handle GET document navigation requests
        if (req.method !== "GET") return next();
        if (url.startsWith("/@") || url.startsWith("/src/") || url.includes(".")) {
          return next();
        }

        try {
          const ssrEnv = server.environments["ssr"];
          if (!ssrEnv) return next();

          const mod = (await (ssrEnv as any).runner.import("virtual:tanstack-start-server-entry")) as {
            default: { fetch: (req: Request) => Promise<Response> };
          };

          const host = req.headers.host || "localhost:5173";
          const protocol = server.config.server.https ? "https" : "http";
          const webReq = new Request(`${protocol}://${host}${url}`, {
            headers: req.headers as HeadersInit,
            method: "GET",
          });

          const webRes = await mod.default.fetch(webReq);
          res.statusCode = webRes.status;
          for (const [k, v] of webRes.headers.entries()) {
            res.setHeader(k, v);
          }
          const html = await webRes.text();
          res.end(html);
        } catch (e) {
          console.error("[devSsrPlugin error]:", e);
          next(e);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    devSsrPlugin(),
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
  ],
});
