<?php

namespace App\Http\Controllers;

use App\Prometheus\MetricsCollector;
use Illuminate\Http\Request;
use Promethus\Storage\Redis;
use Vinelab\Tracing\Facades\Trace;
use \Prometheus\Counter;

class OrderController extends Controller
{
    public function __construct()
    {
       
    }


    public function pdf() {

        //Well, nested spans seem to work. Good luck figuring out how to propagate the traceid to the Orders service, through RabbitMQ.

        //As you can see, i made my own custom startSpan helper function, cuz PHP doens't have the C# "using" syntax, that automatically 
        //ends/disposes of the given span. Using this startSpan helper function, i don't have to call the $span->finish(), and it will
        //automatically pass the "parent" context. And this way, it works kinda similar to how spans are done in C#.
        //You can modify the startSpan function if u want, in case we need the optional $timestamp parameter of the Trace::startSpan method.
        //In case your PHP extensions for VS code aren't working, u can find the startSpan method in the following file: version-two/app/helpers.php
        //Gonna look into logging too at some point i guess.

        $my_pdf_results = [];
        startSpan('Start Generating a pdf using startspan!', function($span1) use(&$my_pdf_results) {
            $span1->annotate('Found the requested order in the DB or some shit!');

            startSpan('Doing some stuff using startspan!', function($span2) use(&$my_pdf_results) {
                $span2->tag('pdf_stuff', collect(['some pdf data!', 'even more pdf data stuff!'])->toJson());
                $span2->annotate('Jep, something worth noting here!');

                startSpan('Should send trace to Orders service about now, JEP!', function($span3) use(&$my_pdf_results) {
                    $span3->annotate('Guess ill make an annotation here');

                    startSpan('and another span, why not', function($span4) use(&$my_pdf_results) {
                        $my_pdf_results = ['pdf1', 'pdf2', 'pdf3', 'pdf4'];
                    });
                });

                $span2->annotate('Hmm, span3 finished, so we back to span2 or?! HMMMM');
            });

            $span1->tag('pdf_results', json_encode($my_pdf_results));
        });

        return "PDF ENDPOINT HERE!";
    }
}
