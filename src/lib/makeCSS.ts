import { StyleDefinition } from "used-styles/dist/es5/types";
import {
  getUsedStyles,
  getCriticalStyles,
} from "used-styles";

export default function makeCSS(
  html: string,
  stylesLookup: StyleDefinition
): {
  criticalCSS: string;
  preloadStyles: string;
} {
  const criticalCSS = getCriticalStyles(html, stylesLookup);
  const usedStyles = getUsedStyles(html, stylesLookup);
  const preloadStyles = usedStyles
    .map((style) => {
      return `<link rel="preload" href="${style}" as="style" onload="this.onload=null;this.rel='stylesheet'"/>\n`;
    })
    .join("");

  return {
    criticalCSS,
    preloadStyles,
  };
}
