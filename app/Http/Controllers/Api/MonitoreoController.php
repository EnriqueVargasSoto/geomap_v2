<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Illuminate\Database\QueryException;

class MonitoreoController extends Controller
{
    //
    public function index(Request $request){
        /* if(Auth::user()){
			$idEmpresa = Auth::user()->idEmpresa;
			$idSucursal = Auth::user()->idSucursal;
			$idSupervisor = Auth::user()->id;
		}else{ */
			$idEmpresa = $request->idEmpresa;
			$idSucursal = $request->idSucursal;
			$idSupervisor =  $request->idSupervisor;
		//}

        $idRuta = $request->ruta;
        $idZona = $request->zona;
        $fecha = $request->fecha;
		$idVendedor = $request->idVendedor;

        $page = $request->input('page', 1); // Página actual (por defecto 1)
        $perPage = $request->input('per_page', 10); // Elementos por página (por defecto 10)

		$itemDefecto = array( "vendedorx" => null ) ;

		try{
			$lista = DB::select("exec web_obtenerResumenVentasPreventa ?,?,?,?,?,?,?", [$idEmpresa, $idSucursal, $idRuta , $idZona, $fecha , $idSupervisor, $idVendedor ]);

			if( sizeof($lista) > 0){
				$item = $lista[0];
				if($item->vendedorx == null){
					return  response()->json( $item );
				}else{
                    $total = count($lista); // Total de registros
                    $offset = ($page - 1) * $perPage; // Calcular desde qué registro empezar
                    $items = array_slice($lista, $offset, $perPage); // Aplicar paginación manual

					return response()->json([
                        'data' => $items,
                        'recordsTotal' => $total,
                        'page' => $page,
                        'per_page' => $perPage,
                        'total_pages' => ceil($total / $perPage),
                        'sp' => 'exec web_obtenerResumenVentasPreventa'
                    ]);
				}
			}else {
				return  response()->json( $itemDefecto );
			}
		}catch(QueryException $ex){
			return response()->json(['error' => $ex->getMessage()]);
		}
    }

    public function gestionInicializaTabla(){
        $headers = [
            ['title' => 'Jefe de Unidad de Negocio', 'key' => 'nombrex', 'sortable' => true, 'fixed' => 'start'],
            ['title' => 'Teléfono', 'key' => 'telefonox', 'sortable' => true, 'fixed' => true],
            ['title' => 'Zona', 'key' => 'zona', 'sortable' => true, 'fixed' => true],
            ['title' => 'Ruta', 'key' => 'ruta', 'sortable' => true, 'fixed' => true],
            ['title' => 'Establecimientos', 'key' => 'clientes', 'sortable' => true, 'fixed' => true],
            ['title' => 'Establecimientos Atendidos', 'key' => 'efectivos', 'sortable' => true, 'fixed' => true],
            ['title' => 'Establecimientos Atendidos %', 'key' => 'efectivos', 'sortable' => true, 'fixed' => true],
            ['title' => 'Establecimientos Atendidos %', 'key' => 'efectivos', 'sortable' => true, 'fixed' => true],
            ['title' => 'Establecimientos Atendidos %', 'key' => 'efectivos', 'sortable' => true, 'fixed' => true],
            ['title' => 'Establecimientos Atendidos %', 'key' => 'efectivos', 'sortable' => true, 'fixed' => true],
            ['title' => 'Establecimientos Atendidos %', 'key' => 'efectivos', 'sortable' => true, 'fixed' => true],

        ];

        $buttons = [

        ];

        $itemSelects = [
            ['title' => '5', 'value' => 5],
            ['title' => '10', 'value' => 10],
            ['title' => '25', 'value' => 25],
            ['title' => '50', 'value' => 50],
            ['title' => '100', 'value' => 100],
        ];

        $data = [
            'headers' => $headers,
            'per_page' => 10,
            'page' => 1,
            'title' => 'Ejemplo',
            'buttons' => $buttons,
            'filters' => [],
            'check' => false,
            'item_selects' => $itemSelects
        ];

        return response()->json(['data' => $data]);
    }

    public function cobranzaInicializaTabla(){
        $headers = [
            ['title' => 'Jefe de Unidad de Negocio', 'key' => 'nombrex', 'sortable' => true, 'fixed' => true],
            ['title' => 'Teléfono', 'key' => 'telefonox', 'sortable' => true, 'fixed' => true],
            ['title' => 'Zona', 'key' => 'zona', 'sortable' => true, 'fixed' => true],
            ['title' => 'Ruta', 'key' => 'ruta', 'sortable' => true, 'fixed' => true],
            ['title' => 'Establecimientos', 'key' => 'clientes', 'sortable' => true, 'fixed' => true],
            ['title' => 'Establecimientos Atendidos', 'key' => 'efectivos', 'sortable' => true, 'fixed' => true],
        ];

        $buttons = [

        ];

        $itemSelects = [
            ['title' => '5', 'value' => 5],
            ['title' => '10', 'value' => 10],
            ['title' => '25', 'value' => 25],
            ['title' => '50', 'value' => 50],
            ['title' => '100', 'value' => 100],
        ];

        $data = [
            'headers' => $headers,
            'per_page' => 10,
            'page' => 1,
            'title' => 'Ejemplo',
            'buttons' => $buttons,
            'filters' => [],
            'check' => false,
            'item_selects' => $itemSelects
        ];

        return response()->json(['data' => $data]);
    }
}
