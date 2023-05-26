const express = require('express')

const {ROUTES} = require("./routes");
const {setupRateLimit} = require("./ratelimit");
const {setupProxies} = require("./proxy");
const {setupAuth} = require("./auth");
const {setupCallbacks} = require("./callbacks");
const {setupTracing} = require("./setup-tracing");
const {setupRouteTracing} = require("./setup-route-tracing");
//const {SetupSwagger} = require("./swagger");

const app = express()
const PORT = 3400;
const HOST = '0.0.0.0';

setupTracing();
setupRouteTracing(app, ROUTES);
setupCallbacks(app, ROUTES);
setupRateLimit(app, ROUTES);
//setupAuth(app, ROUTES);
setupProxies(app, ROUTES);


app.listen(PORT,HOST, () => {
    console.log(`Example app listening at http://${HOST}:${PORT}`)
})