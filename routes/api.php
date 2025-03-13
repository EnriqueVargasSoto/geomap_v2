<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmpresaController;
use App\Http\Controllers\Api\MapaController;
use App\Http\Controllers\Api\MonitoreoController;
use App\Http\Controllers\RutaController;
use App\Http\Controllers\ZonaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);

Route::apiResource('empresas', EmpresaController::class);
Route::apiResource('zonas', ZonaController::class);
Route::apiResource('rutas', RutaController::class);

Route::get('gestion', [MonitoreoController::class, 'index']);
Route::get('clientes-por-vendedor', [MonitoreoController::class, 'obtenerClientesxVendedor']);
Route::get('vistaxsegmento', [MonitoreoController::class, 'obtenerVistaxSegmento']);

Route::get('gestion-inicializa-tabla', [MonitoreoController::class, 'gestionInicializaTabla']);
Route::get('cobranza-inicializa-tabla', [MonitoreoController::class, 'cobranzaInicializaTabla']);
Route::get('clientes-inicializa-tabla', [MonitoreoController::class, 'clientesInicializaTabla']);
Route::get('segmentos-inicializa-tabla', [MonitoreoController::class, 'segmentosInicializaTabla']);

Route::get('export-excel', [MonitoreoController::class, 'reporteTodosVendedoresPedidos']);

Route::get('apps/users', [EmpresaController::class, 'usuarios']);



Route::get('clientes', [MapaController::class,'obtenerDatosCliente']);
Route::get('geocercas', [MapaController::class, 'obtenerGeocercas']);

Route::middleware('auth:api')->group(function () {


});
