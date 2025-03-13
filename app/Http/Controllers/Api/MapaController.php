<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class MapaController extends Controller
{
    //
    public function obtenerDatosCliente(Request $request){
		// if(Auth::user()){
		// 	$idEmpresa = Auth::user()->idEmpresa;
		// 	$idSucursal = Auth::user()->idSucursal;
		// 	$idSupervisor = Auth::user()->id;
		// }else{
			$idEmpresa = $request->idEmpresa;
			$idSucursal = $request->idSucursal;
			$idSupervisor =  $request->idSupervisor;
		// }

		$idZona = $request->zona;
		$idRuta = $request->ruta;
		$idVendedor = $request->vendedor;
		$rubros = $request->rubros;
        $oportunidad = $request->oportunidad;
        $atendido = $request->atendido;

		$lista = DB::select("exec web_obtenerClientesGeolocalizados ?,?,?,?,?,?,?,?,?,?", [$idEmpresa, $idSucursal, $idZona, $idRuta, $idVendedor, $idSupervisor, $oportunidad, $rubros, $atendido, 'all' ]);
		return response()->json($lista);
	}

    public function obtenerGeocercas(Request $request){
		// if(Auth::user()){
		// 	$idEmpresa = Auth::user()->idEmpresa;
		// 	$idSucursal = Auth::user()->idSucursal;
		// }else{
			$idEmpresa = $request->idEmpresa;
			$idSucursal = $request->idSucursal;
		// }

		$idZona = $request->zona;
		$idRuta = $request->ruta;

		$lista = DB::select("exec web_obtener_geocerca ?,?,?,?", [$idEmpresa, $idSucursal, $idZona, $idRuta ]);
		return response()->json($lista);
	}
}
