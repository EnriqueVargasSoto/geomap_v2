<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            //code...
            $empresas = Empresa::with('sucursales')->orderBy('idEmpresa', 'desc')->get();

            return response()->json(['data' => $empresas]);
        } catch (\Error $e) {
            //throw $th;
            return response()->json(['error'=> $e]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function usuarios(){
        $users = [
            [
                "id" => 1,
                "fullName" => "Galasasen Slixby",
                "company" => "Yotz PVT LTD",
                "role" => "editor",
                "username" => "gslixby0",
                "country" => "El Salvador",
                "contact" => "(479) 232-9151",
                "email" => "gslixby0@abc.net.au",
                "currentPlan" => "enterprise",
                "status" => "inactive",
                "avatar" => "avatar1.png",
                "billing" => "Manual-Credit Card"
            ],
            [
                "id" => 2,
                "fullName" => "Halsey Redmore",
                "company" => "Skinder PVT LTD",
                "role" => "author",
                "username" => "hredmore1",
                "country" => "Albania",
                "contact" => "(472) 607-9137",
                "email" => "hredmore1@imgur.com",
                "currentPlan" => "team",
                "status" => "pending",
                "avatar" => "avatar2.png",
                "billing" => "Auto debit"
            ],
            // Agrega más usuarios aquí...
        ];
        return response()->json(['users' => $users, 'totalUsers' => count($users)    ]);
    }
}
