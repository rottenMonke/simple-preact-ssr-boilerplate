import { NODE_ENV } from "../types/global";
import path from "path";

export const PORT = 5555;
export const isDevelopment = NODE_ENV  === 'development';
export const root = process.cwd();
export const distPath = path.resolve(root, "dist")