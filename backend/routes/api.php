<?php

use Illuminate\Support\Facades\Route;

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

// Public routes

Route::prefix('file')->group(function() {
  Route::post('/upload', [App\Http\Controllers\FileController::class, 'upload']);
  Route::get('/list', [App\Http\Controllers\FileController::class, 'getFiles']);
  Route::get('/details/{idFile}', [App\Http\Controllers\FileController::class, 'getFileDetails']);
});