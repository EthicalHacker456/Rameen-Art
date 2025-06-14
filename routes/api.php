<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SaleController;
use App\Http\Controllers\Api\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();   
})->middleware('auth:sanctum');

Route::post('/storeProduct', [ProductController::class, 'store']);
Route::get('/deleteProduct/{id}', [ProductController::class, 'destroy']);
Route::post('/updateProduct/{id}', [ProductController::class, 'updateProduct']);   

Route::post('/addSale', [SaleController::class, 'store']);

Route::get('/getCategories', [ProductController::class, 'categoryIndex']);

Route::post('/register', [AuthController::class, 'store']);





