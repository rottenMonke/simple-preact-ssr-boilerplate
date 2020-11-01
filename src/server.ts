import express from "express";
import ssr from "./ssr";
import compression from "compression";
//@ts-ignore
import assetManifest from "../dist/manifest.json";
import { discoverProjectStyles } from 'used-styles';
import { fetchInitialData } from "./routingConfig";
import makeCSS from "./lib/makeCSS";
import{ PORT, isDevelopment, distPath } from '../src/lib/ssrConstants'
// generate lookup table on server start
let stylesLookup = discoverProjectStyles(distPath);


const app = express();
app.use(compression());
app.use(express.static(distPath));

// Dummy api endpoint, just to show an example of a basic isomorphic fetch
app.get("/api/getCharacters", (_req,res) => res.send([
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

// Development middleware for updating style map on each new request
if(isDevelopment) {
  app.get("*", async (_req,_res,next) => { 
    stylesLookup = discoverProjectStyles(distPath);
    await stylesLookup;
    next();
  })
}

app.get("*", async (req, res) => {
  const pageData = await fetchInitialData(req.url);
  const renderedApp = ssr({ url: req.url, pageData });
  const { criticalCSS, preloadStyles } = makeCSS(renderedApp,stylesLookup);
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        ${criticalCSS}
        ${preloadStyles}
        <link rel="shortcut icon" href="https://preactjs.com/favicon.ico">
        <title>Preact ssr boilerplate</title>
        </head>
        <body>
        <div id="root">${renderedApp}</div>
        </body>
        ${pageData ? `<script>window.PAGE_DATA = ${JSON.stringify(pageData)}</script>`: ''}
        <script async type="text/javascript" src="${assetManifest['main.js']}" ></script>
    </html>
    `;
  res.send(html);
  res.end();
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`SSR Running on port ${PORT}`);
});
