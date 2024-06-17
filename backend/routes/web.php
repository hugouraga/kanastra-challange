<?php

use Illuminate\Support\Facades\Route;
use App\Mail\MyTestEmail;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/testEmail', function () {
    $name = 'Hugo Uraga';
    Mail::to('hugouraga61@gmail.com')->send(new MyTestEmail($name));
});