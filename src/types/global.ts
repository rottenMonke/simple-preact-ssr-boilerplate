

declare global {
    interface Window { 
        PAGE_DATA: any;
    }
}

declare const NODE_ENV: string;
const _NODE_ENV = NODE_ENV;
export {_NODE_ENV as NODE_ENV};
