<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Sucursal;

class Empresa extends Model
{
    //
    public $table = 'Empresa';

    public $timestamps = false;
    protected $primaryKey = 'idEmpresa';

	protected $casts = [ 'idEmpresa' => 'string' ];

    public $fillable = [
        'ruc',
        'razonSocial'
    ];

	public function sucursales()
    {
        return $this->hasMany(Sucursal::class, 'idEmpresa');
    }
}
