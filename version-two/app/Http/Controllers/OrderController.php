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
        
        return "PDF ENDPOINT HERE!";
    }
}
