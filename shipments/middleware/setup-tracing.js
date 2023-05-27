const { NodeTracerProvider } = require('@opentelemetry/node');
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const api = require('@opentelemetry/api')
const { GetUrl } = require('./../helpers/serviceurls');
const { AsyncHooksContextManager } = require('@opentelemetry/context-async-hooks');

const setupTracing = () => {

    const resource = Resource.default().merge(
      new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "shipment-service",
        [SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0",
      })
    );

    const provider = new NodeTracerProvider({
      resource: resource
    });
    const consoleExporter = new ConsoleSpanExporter();
    const spanProcessor = new SimpleSpanProcessor(consoleExporter);
    provider.addSpanProcessor(spanProcessor);
    console.log('ZIPKIN URL', `http://${GetUrl('zipkin')}/api/v2/spans`);
    const zipkinExporter = new ZipkinExporter({
      url: `http://${GetUrl('zipkin')}/api/v2/spans`,
      serviceName: 'ShipmentService'
    });
    const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
    const contextManager = new AsyncHooksContextManager();
    contextManager.enable();
    api.context.setGlobalContextManager(contextManager);
    provider.addSpanProcessor(zipkinProcessor)
    provider.register()

};

module.exports = { setupTracing };
