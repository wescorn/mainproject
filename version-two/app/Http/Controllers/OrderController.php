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
    public $endpoint;

   

    public function __construct() {
        $this->endpoint = config('app.apigateway')."/orders";
    }

    public function index() {
        $user = new User();
        return InertiaTable::index($user, ['id', 'name', 'email', 'deleted_at']);
    }    

    public function getOrders(){
        $m_endpoint = "{$this->endpoint}/Order";
        Log::channel('seq')->info("Requesting All Orders (Laravel) from {$m_endpoint}");
        $response = Http::get("{$this->endpoint}/Order");
        $orders = Order::fromArray(json_decode($response->body()));
        
        return view("app", ['orders' => $orders]);
    }

    public function printOrder(Request $request) {
        startSpan('Endpoint to initiate Generating a PDF', function($span) use($request){
            $this->pdf(function($span1) use($request) {
                
                simple_amqp_send(['id' => $request->input('id')], [
                    'exchange' => 'OrderExchange',
                    'type' => 'topic',
                    'queue' => 'OrderPrintQueue',
                    'topic' => 'generate',
                    'headers' => [
                        'Type' => 'Orders.Models.GetOrderMessage'
                    ]
                ]);
                return to_route('home');
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
