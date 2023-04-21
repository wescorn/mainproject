<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Vinelab\Tracing\Facades\Trace;

class HomeController extends Controller
{
    public function show(Request $request) {
        $span = Trace::startSpan('my span trace');

        return view('welcome');
    }
}
