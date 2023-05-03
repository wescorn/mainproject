<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class OpenTelemetryLogMiddleware
{

    public function handle($request, Closure $next)
    {
        $span = \Vinelab\Tracing\Facades\Trace::getCurrentSpan();
        if (!$span) {
            return $next($request);
        }

        $context = $span->getContext()->getRawContext();
        $spanId = $context->getSpanId();
        $traceId = $context->getTraceId();
        $parentId = $context->getParentId();

        Log::withContext([
            'extra' => [
                'Machine' => gethostname(),
                'ParentId' => $parentId,
                'SpanId' => $spanId,
                'TraceId' => $traceId,
            ]
        ]);

        return $next($request);
    }
}
