<?php

if (!function_exists('startSpan')) {
  function startSpan($name, $func)
  {
    static $last_span = null;

    try {
      $parent_span = $last_span ?: \Vinelab\Tracing\Facades\Trace::getCurrentSpan();
      $span = \Vinelab\Tracing\Facades\Trace::startSpan($name, $parent_span ? $parent_span->getContext() : null);
      $last_span = $span; // update the last created span
      return $func($span);
    } finally {
      $span->finish();
      $last_span = $parent_span; // restore the last created span
    }
  }
}



if (!function_exists('array_is_list')) {
  function array_is_list(array $arr)
  {
    if ($arr === []) {
      return true;
    }
    return array_keys($arr) === range(0, count($arr) - 1);
  }
}


if (!function_exists('simple_amqp_send')) {
  function simple_amqp_send($message, $options = [], $message_props = [])
  {

    

    $connection = new \PhpAmqpLib\Connection\AMQPStreamConnection(
      config('amqp.properties.production.host'),
      config('amqp.properties.production.port'),
      config('amqp.properties.production.username'),
      config('amqp.properties.production.password'),
      config('amqp.properties.production.vhost'),
    );
    $channel = $connection->channel();
    // define the message headers
    $headers = new \PhpAmqpLib\Wire\AMQPTable(Arr::get($message_props, 'headers', Arr::get($options, 'headers', [])));
    $m_message = $message;
    if(!($message instanceof \PhpAmqpLib\Message\AMQPMessage)) {
      
      if(is_array($m_message)) {
        try {
          $m_message = json_encode($m_message);
        } catch (\Throwable $th) {}
      }
      
      $message = new \PhpAmqpLib\Message\AMQPMessage($m_message, array(
        ...$message_props,
        'application_headers' => $headers,
        'content_type' => Arr::get($message_props, 'content_type', 'application/json'),
        'delivery_mode' => Arr::get($message_props, 'delivery_mode', 2),
      )
      );
    } 
    

    $topic = Arr::get($options, 'topic', 'default_topic');
    $exchange = Arr::get($options, 'exchange', 'DefaultExchange');
    $queue = Arr::get($options, 'queue', 'DefaultQueue');

    

    $message = \Vinelab\Tracing\Facades\Trace::inject($message, \Vinelab\Tracing\Propagation\Formats::AMQP);
    // declare the exchange with the specific type
    $channel->exchange_declare($exchange, Arr::get($options, 'type', 'topic'), Arr::get($options, 'passive', false), Arr::get($options, 'durable', true), Arr::get($options, 'auto_delete', false));
    // declare the queue
    $channel->queue_declare($queue, Arr::get($options, 'queue_passive', false), Arr::get($options, 'queue_durable', true), Arr::get($options, 'queue_exclusive', false),Arr::get($options, 'queue_auto_delete', false));
    // bind the queue to the exchange with the routing key
    $channel->queue_bind($queue, $exchange, $topic);
    // publish the message to the exchange
    $channel->basic_publish($message, $exchange, $topic);
    // close the channel and the connection
    $channel->close();
    $connection->close();

    Log::channel('seq')->info("AMQP Message Published (From Laravel)", ['topic' => $topic, 'exchange' => $exchange, 'queue' => $queue, 'message' => $m_message]);
  }
}


if (!function_exists('guzzle')) {
  function guzzle($config = [])
  {
    $stack = new GuzzleHttp\HandlerStack();
    $stack->setHandler(new GuzzleHttp\Handler\CurlHandler());
    $stack->unshift(GuzzleHttp\Middleware::mapRequest(function (Psr\Http\Message\RequestInterface $request) {
        $context = \Vinelab\Tracing\Facades\Trace::getCurrentSpan()->getContext()->getRawContext();
        $request = $request->withHeader(
          'SpanId', $context->getSpanId())->withHeader(
          'TraceId', $context->getTraceId())->withHeader(
          'Sampled', $context->isSampled() ? 1 : 0);
        return $request;
    }));

    $client = new GuzzleHttp\Client(['handler' => $stack, ...$config]);
    return $client;
  }
}

if (!function_exists('object_to_array')) {
  function object_to_array($data)
  {
      if (is_array($data) || is_object($data))
      {
          $result = [];
          foreach ($data as $key => $value)
          {
              $result[$key] = (is_array($value) || is_object($value)) ? object_to_array($value) : $value;
          }
          return $result;
      }
      return $data;
  }
}