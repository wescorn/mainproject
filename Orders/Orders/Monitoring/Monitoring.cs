using OpenTelemetry;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using System.Diagnostics;
using System.Reflection;
using Serilog;
using Serilog.Enrichers.Span;
using Serilog.Events;

public static class Monitoring
{
    public static readonly ActivitySource ActivitySource = new("Orders_" + Assembly.GetEntryAssembly()?.GetName().Name, "1.0.0");

    static Monitoring()
    {
        Sdk.CreateTracerProviderBuilder()
            .AddZipkinExporter(opts => opts.Endpoint = new Uri("http://zipkin:9411/api/v2/spans"))
            .AddConsoleExporter()
            .AddSource(ActivitySource.Name)
            .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(serviceName: ActivitySource.Name))
            .Build();
            
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            .Enrich.WithSpan()
            .WriteTo.Seq("http://seq:5341")
            .WriteTo.Console()
            .CreateLogger();
    }
}