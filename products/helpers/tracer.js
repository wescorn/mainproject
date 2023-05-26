const opentelemetry = require("@opentelemetry/api");

function getTracer() {
  return opentelemetry.trace.getTracer('products-tracer');
}

function startSpan(name, cb) {
  opentelemetry.trace.getTracer('products-tracer').startActiveSpan(name, span => {
    try {
      cb(span);
      span.setStatus({code: SpanStatusCode.OK});
    } catch (err) {
      console.log(err);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: err.message,
      });
      throw err;
    } finally {
      span.end();
    }
  });
}

module.exports = { getTracer, startSpan };
