import app from "./app";
import { env } from "./config/env";

const port = env.PORT;

const server = app.listen(port, () => {
    console.log(`Serverot e startuvan na porta ${port} (${env.NODE_ENV} okolina)`);
});

process.on("SIGINT", () => {
    console.log("Se zatvora serverot...");
    server.close(() => {
        console.log("Serverot e uspesno zatvoren.");
        process.exit(0);
    });
});

process.on("SIGTERM", () => {
    console.log("Se zatvora serverot...");
    server.close(() => {
        console.log("Serverot e uspesno zatvoren.");
        process.exit(0);
    });
});
