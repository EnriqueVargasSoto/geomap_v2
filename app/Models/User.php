<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    /* use HasFactory, Notifiable; */

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    /* protected $fillable = [
        'name',
        'email',
        'password',
    ]; */

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    /* protected $hidden = [
        'password',
        'remember_token',
    ]; */

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    /* protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    } */
    //use HasApiTokens, Notifiable;

    public $table = 'Web_Usuario';

    public $timestamps = true;

    protected $primaryKey = 'idUsuario';

    public $fillable = [ 'idPerfil','idEmpresa' ,'nombre', 'idSucursal', 'deleted' ];

    protected $hidden = array('usuario, clave');

    protected $casts = [ 'idEmpresa' => 'string' ,  'idSucursal' => 'string'];

    public function getEmpresa()
    {
        return $this->belongsTo(Empresa::class, 'idEmpresa', 'idEmpresa');
    }

    public function getSucursal()
    {
        return $this->belongsTo(Sucursal::class, 'idSucursal', 'idSucursal');
    }

    public function perfil()
    {
        return $this->belongsTo(Perfil::class, 'idPerfil');
    }

    public function scopeEliminated($query)
    {
        return $query->where('deleted',0);
    }
}
