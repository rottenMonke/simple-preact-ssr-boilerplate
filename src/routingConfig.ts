import Main from "./pages/Main";
import List from "./pages/List";
import { fetchCharacters } from './api'
import { ComponentType } from "preact";



export interface IRoute {
    path: string
    Component: ComponentType<any>
    initPageData?: () => Promise<any>
}

export const routes: IRoute[] = [
    {
        path: "/",
        Component: Main
    },
    {
        path: "/list",
        Component: List,
        initPageData: async () => await fetchCharacters()
    },
];

export const fetchInitialData = async (url) => {
    const route = routes.find(({ path }) => path === url );
    let data = null;
    if(route && route.initPageData)  data = await route.initPageData();
    return data;
}