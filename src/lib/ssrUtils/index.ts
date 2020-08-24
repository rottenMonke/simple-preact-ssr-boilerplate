import path from "path";
import { readFileSync } from "fs";
import { NODE_ENV } from '../../types/global'

export const getCSS = (assetManifest) => {
    const root = process.cwd();
    const distPath = path.resolve(root, "dist")
    const cssPath = distPath + assetManifest['main.css'];
    const isProduction = NODE_ENV === 'production';
    // Read once for production and read on every new request for development
    if(isProduction) {
        const css = readFileSync(cssPath, 'utf8');
        return () => css
    } else {
        return () => readFileSync(cssPath, 'utf8');
    }
}