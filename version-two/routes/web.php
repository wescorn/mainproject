<?php

use App\Models\Order;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use Inertia\Inertia;
use App\Models\User;
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

//Route::get('/', [HomeController::class, 'show']);

Route::get('/orders/pdf', [OrderController::class, 'pdf'])->name('orders.pdf');
//TODO Make function to print pdf
Route::get('/', function () {
    $orders = (new \App\Http\Controllers\API\OrderController())->index();
    return Inertia::render('Index', [
        'orders' => $orders
    ]);
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::get('/test', function () {

    return Inertia::render('Test', [
        'laravel' => \Illuminate\Foundation\Application::VERSION,
        'php' => PHP_VERSION,
    ]);

});


Route::post('/print', [OrderController::class, 'printOrder'])->name('orders.printOrder');
Route::get('/orders/test', [OrderController::class, 'test'])->name('orders.test');
