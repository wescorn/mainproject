<?php

use App\Http\Controllers\API\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
 
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/user', function (Request $request) {
    return User::all();
});

Route::get('/order', [OrderController::class, 'index'])->name('api.order.index');
Route::post('/order', [OrderController::class, 'store'])->name('api.order.store');
Route::get('/order/{id}', [OrderController::class, 'show'])->name('api.order.show');