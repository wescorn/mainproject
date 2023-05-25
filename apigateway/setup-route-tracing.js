const { context, propagation, trace } = require("@opentelemetry/api");
const { GetIfContains, convertToTraceparent } = require('./util')

const setupRouteTracing = (app, routes) => {
    routes.forEach(r => {
        app.use(r.url, (req, res, next) => {
            const traceId = GetIfContains(req.headers, 'TraceId');
            const spanid = GetIfContains(req.headers, 'SpanId');
            const sampled = GetIfContains(req.headers, 'Sampled');
            propagatedContext = propagation.extract(context.active(), {traceparent: convertToTraceparent(traceId, spanid, sampled)})
            trace.getTracer('api-gateway-tracer').startActiveSpan(`Tracing request to ${r.url} in APIGateway`, {}, propagatedContext, span => {
                next();
                span.end();
            });
        });
    })
};

module.exports = { setupRouteTracing };