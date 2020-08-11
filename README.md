# simple-preact-ssr-boilerplate

So i didn't manage to find any simple preact ssr boilerplates.Most of what could be found looked
overcomplicated.

# How to

There are several commands

 - dev - hotreload devserver without ssr
 - build:client/build:server - builts resources
 - prod - builds everything and runs it with SSR in production mod
 - analyze - analyze client side bundle
 
 It doesn't have  an isomorphic fetch for a moment, but to implement it (basically) all you need to do is to install "node-fetch" and import it to a file
 where you use fetch. (though it will add it to client side bundle, which is not nice)

# Todo
    - Dev mode for ssr with hot reload
    - example of isomorphic fetch 
    - Typescript maybe?
    - Lighter routing module
    - SSR codespliting  (doubt I can manage it without hacks now)
    - Add storeon
