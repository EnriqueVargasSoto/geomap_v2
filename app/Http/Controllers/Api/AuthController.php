<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function login(Request $request){
        // Validar los datos
        $request->validate([
            'idEmpresa' => 'required|string',
            'idSucursal' => 'required|string',
            'usuario' => 'required|string',
            'clave' => 'required|string',
        ]);
        // Buscar el usuario en la base de datos
        $user = User::with('getEmpresa','getSucursal','perfil')->where('idEmpresa', $request->idEmpresa)
                    ->where('idSucursal', $request->idSucursal)
                    ->where('usuario', $request->usuario)
                    ->first();

        // Verificar si existe y la contraseña es correcta
        if (!$user || (MD5(SHA1($request->clave)) !== $user->clave)) {
            return response()->json(['usuario' => ['Las credenciales proporcionadas son incorrectas.'],], 500);
            /* throw ValidationException::withMessages([
                'usuario' => ['Las credenciales proporcionadas son incorrectas.'],
            ]); */
        }

        // Generar token
        $token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.fhc3wykrAnRpcKApKhXiahxaOe8PSHatad31NuIZ0Zg';//$user->createToken('auth_token')->plainTextToken;

        // Responder con el token
        return response()->json([
            'token' => $token,
            'user' => $user,
        ], 200);
    }
}
