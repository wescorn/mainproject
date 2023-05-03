<?php

namespace App\Logging;

use Gelf\Message;
use Monolog\Formatter\GelfMessageFormatter;

class CustomGelfMessageFormatter extends GelfMessageFormatter
{
    /**
     * {@inheritDoc}
     */
    public function format(array $record): Message
    {
        $record['extra']['Machine'] = gethostname();
        $span = \Vinelab\Tracing\Facades\Trace::getCurrentSpan();
        if ($span) {
            $context = $span->getContext()->getRawContext();
            $record['extra']['ParentId'] = $context->getParentId();
            $record['extra']['SpanId'] = $context->getSpanId();
            $record['extra']['TraceId'] = $context->getTraceId();
        }
        // Call the parent format method to format the $record as a GELF message
        return parent::format($record);
    }
}
