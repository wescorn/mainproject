<?php

function startSpan($name, $func) {
    static $last_span = null;
  
    try {
      $parent_span = $last_span;
      $span = \Vinelab\Tracing\Facades\Trace::startSpan($name, $parent_span ? $parent_span->getContext() : null);
      $last_span = $span; // update the last created span
      return $func($span);
    } finally {
      $span->finish();
      $last_span = $parent_span; // restore the last created span
    }
  }