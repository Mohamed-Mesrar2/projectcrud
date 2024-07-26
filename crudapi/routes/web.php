<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImpressionController;
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

Route::get('/', function () {
    return view('welcome');
});
Route::get('vv',function(){
    return 'simcco';
  });
  Route::get('index', [ImpressionController::class, 'index']);
  Route::post('create', [ImpressionController::class, 'create']);
  Route::get('show/{N_OF}', [ImpressionController::class, 'show']);
  Route::delete('destroy/{id}', [ImpressionController::class, 'destroy']);