import fs from "node:fs";
import server from "./dist/server/server.js";

async function prerender() {
  const response = await server.fetch(new Request("http://localhost/"), {}, {});
  if (response.status !== 200) {
    throw new Error(`Prerender failed with HTTP status ${response.status}`);
  }
  const html = await response.text();
  if (html.includes("This page didn't load")) {
    throw new Error("Prerender produced error fallback page instead of invitation");
  }
  fs.writeFileSync("dist/client/index.html", html, "utf8");
  fs.writeFileSync("dist/client/_redirects", "/*  /index.html  200\n", "utf8");
  console.log("Prerendered dist/client/index.html and dist/client/_redirects successfully");
}

prerender();
