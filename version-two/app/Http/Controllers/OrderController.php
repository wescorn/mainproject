<?php

namespace App\Http\Controllers;

use Bschmitt\Amqp\Amqp;
use App\Prometheus\MetricsCollector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Promethus\Storage\Redis;
use Vinelab\Tracing\Facades\Trace;
use \Prometheus\Counter;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Arr;
use App\Models\Order;
use App\Models\OrderLine;
use Vinelab\Tracing\Propagation\Formats;

class OrderController extends Controller
{
    public function __construct()
    {
       
    }

    public function getOrders(){
        $response = Http::get("http://orders/Order");

        $orders = [];
        foreach (json_decode($response->body()) as $order) {
            $mOrder = new Order(["id" => Arr::get($order, 'id', 1)]);
            $lines = [];
            foreach (Arr::get($order, 'orderLines', [1]) as $index => $line) {
                $mLine = new OrderLine([
                    "id" => Arr::get($line, 'id', $index),
                    "order_id" => Arr::get($order, 'id', 1),
                    "product_id" => Arr::get($line, 'product_id', $index ?: 1),
                    "quantity" => Arr::get($line, 'quantity', $index ?: 1)
                ]);
            
                array_push($lines, $mLine);
            }
            $mOrder->orderLines = $lines;
            array_push($orders, $mOrder);
        }
        
        //dd($orders->body());

        //dump($orders->body());

        return view("welcome", ['orders' => $orders]);
    }

    public function printOrder(Request $request) {
        startSpan('Endpoint to initiate Generating a PDF', function($span) use($request){
            $this->pdf(function($span1) use($request) {
                Log::channel('seq')->debug("message for seq from Laravel!");
                $connection = new \PhpAmqpLib\Connection\AMQPStreamConnection(
                    config('amqp.properties.production.host'),
                    config('amqp.properties.production.port'),
                    config('amqp.properties.production.username'),
                    config('amqp.properties.production.password'),
                    config('amqp.properties.production.vhost'),
                );
                $channel = $connection->channel();
            
                // define the exchange name and type
                $exchangeName = 'OrderExchange';
                $exchangeType = 'topic';
                // define the queue name
                $queueName = 'OrderPrintQueue';
                // define the routing key
                $routingKey = 'generate';
                // define the message headers
                $headers = new \PhpAmqpLib\Wire\AMQPTable([
                    'Type' => 'Orders.Models.GetOrderMessage'
                ]);

                $msg_data = [
                    'id' => $request->input('id')
                ];
                // create a new message object
                $message = new \PhpAmqpLib\Message\AMQPMessage(json_encode($msg_data), array(
                    'application_headers' => $headers,
                    'content_type' => 'application/json',
                    'delivery_mode' => 2,
                ));

                $message = Trace::inject($message, Formats::AMQP);
                // declare the exchange with the specific type
                $channel->exchange_declare($exchangeName, $exchangeType, false, true, false);
                // declare the queue
                $channel->queue_declare($queueName, false, true, false, false);
                // bind the queue to the exchange with the routing key
                $channel->queue_bind($queueName, $exchangeName, $routingKey);
                // publish the message to the exchange
                $channel->basic_publish($message, $exchangeName, $routingKey);
                // close the channel and the connection
                $channel->close();
                $connection->close();
            });
        });
    }

    public function pdf($cb) {

        //Well, nested spans seem to work. Good luck figuring out how to propagate the traceid to the Orders service, through RabbitMQ.

        //As you can see, i made my own custom startSpan helper function, cuz PHP doens't have the C# "using" syntax, that automatically 
        //ends/disposes of the given span. Using this startSpan helper function, i don't have to call the $span->finish(), and it will
        //automatically pass the "parent" context. And this way, it works kinda similar to how spans are done in C#.
        //You can modify the startSpan function if u want, in case we need the optional $timestamp parameter of the Trace::startSpan method.
        //In case your PHP extensions for VS code aren't working, u can find the startSpan method in the following file: version-two/app/helpers.php
        //Gonna look into logging too at some point i guess.

        $my_pdf_results = [];
        startSpan('Start Generating a pdf using startspan!', function($span1) use(&$my_pdf_results, $cb) {
            $span1->annotate('Found the requested order in the DB or some shit!');

            startSpan('Doing some stuff using startspan!', function($span2) use(&$my_pdf_results, $cb) {
                $span2->tag('pdf_stuff', collect(['some pdf data!', 'even more pdf data stuff!'])->toJson());
                $span2->annotate('Jep, something worth noting here!');
                usleep(200000);
                startSpan('Should send trace to Orders service about now, JEP!', function($span3) use(&$my_pdf_results, $cb) {
                    $span3->annotate('Guess ill make an annotation here');

                    startSpan('and another span, why not', function($span4) use(&$my_pdf_results, $cb) {
                        $cb($span4);
                        $my_pdf_results = ['pdf1', 'pdf2', 'pdf3', 'pdf4'];
                    });
                });

                $span2->annotate('Hmm, span3 finished, so we back to span2 or?! HMMMM');
                startSpan('How about another span3 after the inner callback?', function($span3) {
                    $span3->tag('this is the 2nd span3');
                });
            });
            usleep(500000);
            startSpan('Perhaps another span2?', function($span2) {
                $span2->tag('this is the 2nd span2');
                startSpan('And a span 3 instide the 2nd span2?', function($span3) {
                    $span3->tag('this is the 2nd span3 inside the 2nd span2');
                    usleep(700000);
                });
            });
            $span1->tag('pdf_results', json_encode($my_pdf_results));
        });

        return "PDF ENDPOINT HERE!";
    }

    public function test() {

        return 'Jep';
    }

}
