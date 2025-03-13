<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\Configuracion;

use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    //
    public function login(Request $request){
        // Validar los datos
        $request->validate([
            'empresa' => 'required|string',
            'sucursal' => 'required|string',
            'usuario' => 'required|string',
            'clave' => 'required|string',
        ]);
        // Buscar el usuario en la base de datos
        $user = User::with('getEmpresa','getSucursal','perfil')->where('idEmpresa', $request->empresa)
                    ->where('idSucursal', $request->sucursal)
                    ->where('usuario', $request->usuario)
                    ->first();
        //.return response()->json($user);
        // Verificar si existe y la contraseña es correcta
        if (!$user || (MD5(SHA1($request->clave)) !== $user->clave)) {
            return response()->json(['usuario' => ['Las credenciales proporcionadas son incorrectas.'],], 500);
            /* throw ValidationException::withMessages([
                'usuario' => ['Las credenciales proporcionadas son incorrectas.'],
            ]); */
        }

        // Generar el token JWT
        $token = JWTAuth::fromUser($user);

        // Generar token
        //$token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.fhc3wykrAnRpcKApKhXiahxaOe8PSHatad31NuIZ0Zg';//$user->createToken('auth_token')->plainTextToken;
        // Agregar un nuevo atributo al usuario
        $user->fecha = str_replace('-', '/', Configuracion::getSetting($user->idEmpresa, $user->idSucursal) );//'valor personalizado'; // Puedes cambiarlo según lo que necesites.
        // Responder con el token
        return response()->json([
            'token' => $token,
            'user' => $user,
        ], 200);
    }

    // Logout (invalidar token)
    public function logout()
    {
        Auth::guard('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    // Refrescar el token JWT
    public function refresh()
    {
        return $this->respondWithToken(Auth::guard('api')->refresh());
    }

    // Estructura de la respuesta con el token
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('api')->factory()->getTTL() * 60 // Tiempo en segundos
        ]);
    }
}
