import express from "express";
import ssr from "./ssr";
import path from "path";
import compression from "compression";
import assetManifest from "../dist/manifest.json";
import { readFileSync } from "fs";
import { fetchInitialData } from "./routingConfig";

const port = 5555;
const app = express();

const root = process.cwd();
const distPath = path.resolve(root, "dist")
const cssPath = distPath + assetManifest['main.css'];
const css = readFileSync(cssPath, 'utf8');

app.use(compression());
app.use(express.static(distPath));

// Dummy api endpoing for showing isomorphic fetch
app.get("/api/getCharacters", (req,res) => res.send([
  {
    id: 1,
    name: 'Jolyne',
  },
  {
    id: 3,
    name: 'Jotaro',
  },
  {
    id: 2,
    name: 'Dio',
  }
]));


app.get("*", async (req, res) => {
  const pageData = await fetchInitialData(req.url);
  const renderedApp = ssr({ url: req.url, pageData });
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <style>${css}</style>
        <link rel="shortcut icon" href="https://preactjs.com/favicon.ico">
        <title>Preact ssr boilerplate</title>
      </head>
      <body>
        <div id="root">${renderedApp}</div>
      </body>
      <script>${pageData ? `window.PAGE_DATA = ${JSON.stringify(pageData)}`: ''}</script>
      <script async type="text/javascript" src="${assetManifest['main.js']}" ></script>
    </html>
    `;
  res.send(html);
  res.end();
});

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`SSR Running on port ${port}`);
});
