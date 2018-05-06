/*
Electron has 2 main processes a "main" and "render" process
In TradingPost they do the following:

"main" (known as "server" in app):
    - Does: database (SQLite3) interactions, CSV file processing, etc.
    - Development: Have to close the app to reload

"render" :
    - Does: React, Redux processing, UI/UX that displayed to the user
    - Development: Has the react-hot-loader dependency so everything is reloaded on change
*/

// Listener on the "main" process
export const IPC_TO_SERVER = "ipc_to_server";

// Listener on the "render" React/Redux process
export const IPC_TO_RENDER = "ipc_to_render";
