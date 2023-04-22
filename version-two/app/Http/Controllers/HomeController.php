<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Psy\Readline\Hoa\Console;
use Zipkin\Endpoint;
use Zipkin\Propagation\CurrentTraceContext;
use Zipkin\Reporters\Http;
use Zipkin\Samplers\BinarySampler;
use Zipkin\Tracer;
use Zipkin\TracingBuilder;
use \Vinelab\Tracing\Facades\Trace;

class HomeController extends Controller
{
    public function show(Request $request) {
        // create the local endpoint
        $endpoint = Endpoint::create('my-service', '127.0.0.1', null, 80);

        // create the reporter
        $reporter = new Http(['endpoint_url' => 'http://localhost:9411/zipkin/']);

        // create the sampler
        $sampler = BinarySampler::createAsAlwaysSample();

        // create the current trace context
        $currentTraceContext = new CurrentTraceContext;
        
        // Build the tracer
        /*
        $tracingBuilder = TracingBuilder::create()
        ->havingLocalEndpoint($endpoint)
        ->havingReporter($reporter)
        ->havingSampler($sampler)
        ->havingCurrentTraceContext($currentTraceContext);
        */

        $tracingBuilder = TracingBuilder::create()
        ->havingReporter($reporter)
        ->havingSampler($sampler)
        ->build();

        $tracer = $tracingBuilder->getTracer();

        // create a new tracer
        //$tracer = new Tracer($endpoint, $reporter, $sampler, true, $currentTraceContext, true, true, true);
        
        // Start a new span
        $span = $tracer->newTrace();

        // Add some annotations to the span
        $span->start();
        $span->annotate('Starting operation');
        $span->annotate('Finishing operation');

        // Finish the span
        $span->finish();

        // Flush any remaining trace data to the Zipkin server
        $tracer->flush();

        return view('welcome');
    }
}

