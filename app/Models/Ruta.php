<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ruta extends Model
{
    //
    public $table = 'Ruta';

    public $timestamps = false;
    protected $primaryKey = 'idRuta';
	protected $casts = [ 'idRuta' => 'string' ];
    public $fillable = [
		'idEmpresa',
		'idSucursal',
		'idRuta',
		'descripcion',
		'idZona'
    ];
}
