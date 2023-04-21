<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use Prometheus\CollectorRegistry;
use Prometheus\Storage\InMemory;
use Prometheus\RenderTextFormat;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'show']);



Route::get('/metrics', function () {
    $registry = new CollectorRegistry(new InMemory());

    // Register a counter metric for the number of requests
    $counter = $registry->registerCounter('myapp', 'requests_total', 'The total number of requests');

    $counter->inc();

    $renderer = new RenderTextFormat();

    return $renderer->render($registry->getMetricFamilySamples());
});