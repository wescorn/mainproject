const { context, propagation, trace } = require("@opentelemetry/api");
const { RenameObjKey } = require('./util')

const setupRouteTracing = (app, routes) => {
    routes.forEach(r => {
        app.use(r.url, (req, res, next) => {
            const traceid = req.headers['x-b3-traceid'];
            const spanid = req.headers['x-b3-spanid'];
            trace.getTracer('api-gateway-tracer').startActiveSpan(`Tracing request to ${r.url} in APIGateway`, span => {
                //if(traceid) span.spanContext().traceId = traceid;
                //if(spanid) span.parentSpanId = spanid;
                next();
                span.end();
            });
                    

        });
    })
};

module.exports = { setupRouteTracing };