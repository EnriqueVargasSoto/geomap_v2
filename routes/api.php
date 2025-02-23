<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmpresaController;
use App\Http\Controllers\Api\MonitoreoController;
use App\Http\Controllers\RutaController;
use App\Http\Controllers\ZonaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);

Route::apiResource('empresas', EmpresaController::class);
Route::apiResource('zonas', ZonaController::class);
Route::apiResource('rutas', RutaController::class);

Route::get('gestion', [MonitoreoController::class, 'index']);

Route::get('gestion-inicializa-tabla', [MonitoreoController::class, 'gesttionInicializaTabla']);

Route::get('apps/users', [EmpresaController::class, 'usuarios']);
