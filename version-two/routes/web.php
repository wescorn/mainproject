<?php

use App\Http\Controllers\DevController;
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

Route::redirect('/', '/orders');

Route::get('/orders/pdf', [OrderController::class, 'pdf'])->name('orders.pdf');
//TODO Make function to print pdf
Route::get('/test', [DevController::class, 'test'])->name('test');

Route::get('/orders', function () {
    return Inertia::render('Order', [
        'orders' => Order::with(['orderLines.product', 'shipments.carrier'])->take(100)->get(),
    ]);
})->name('orders');

Route::get('/orders_m', function () {
    $orders = (new \App\Http\Controllers\API\OrderController())->index();
    return Inertia::render('Order', [
        'orders' => $orders
    ]);
})->name('orders_m');

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');




Route::post('/print', [OrderController::class, 'printOrder'])->name('orders.printOrder');
Route::get('/orders/test', [OrderController::class, 'test'])->name('orders.test');
