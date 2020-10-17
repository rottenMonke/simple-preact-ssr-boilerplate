import express from "express";
import ssr from "./ssr";
import path from "path";
import compression from "compression";
//@ts-ignore
import assetManifest from "../dist/manifest.json";
import { discoverProjectStyles, getUsedStyles, getCriticalStyles } from 'used-styles';
import { fetchInitialData } from "./routingConfig";

const port = 5555;
const app = express();

const root = process.cwd();
const distPath = path.resolve(root, "dist")
// generate lookup table on server start
const stylesLookup = discoverProjectStyles(distPath);


app.use(compression());
app.use(express.static(distPath));

// Dummy api endpoint, just to show an example of a basic isomorphic fetch
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
  await stylesLookup;
  const criticalCSS = getCriticalStyles(renderedApp, stylesLookup);
  const usedStyles = getUsedStyles(renderedApp, stylesLookup);
  const prefetchStyles = usedStyles.map(style => {
    return`<link rel="prefetch" as="style" href="${style}">\n`;
    // append this link to the header output or to the body
  }).join('');
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        ${criticalCSS}
        <link rel="shortcut icon" href="https://preactjs.com/favicon.ico">
        <title>Preact ssr boilerplate</title>
      </head>
      <body>
      <div id="root">${renderedApp}</div>
      </body>
      ${pageData ? `<script>window.PAGE_DATA = ${JSON.stringify(pageData)}</script>`: ''}
      <script async type="text/javascript" src="${assetManifest['main.js']}" ></script>
      ${prefetchStyles}
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
