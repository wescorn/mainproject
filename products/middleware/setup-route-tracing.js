const { context, propagation, trace } = require("@opentelemetry/api");
const { GetIfContains, convertToTraceparent } = require('./../helpers/util')

const setupRouteTracing = (app) => {
    app.use((req, res, next) => {
        const traceId = GetIfContains(req.headers, 'TraceId');
        const spanid = GetIfContains(req.headers, 'SpanId');
        const sampled = GetIfContains(req.headers, 'Sampled');
        propagatedContext = propagation.extract(context.active(), {traceparent: convertToTraceparent(traceId, spanid, sampled)})
        trace.getTracer('products-tracer').startActiveSpan(`Tracing request to ${req.url} in Products`, {}, propagatedContext, span => {
            next();
            span.end();
        });
    });
};

module.exports = { setupRouteTracing };