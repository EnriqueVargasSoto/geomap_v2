<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmpresaController;
use App\Http\Controllers\ZonaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);

Route::apiResource('empresas', EmpresaController::class);
Route::apiResource('zonas', ZonaController::class);

Route::get('apps/users', [EmpresaController::class, 'usuarios']);
