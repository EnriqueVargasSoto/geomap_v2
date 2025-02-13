<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    //
    protected $table = 'Web_Perfil';

    public $timestamps = true;
    protected $primaryKey = 'idPerfil';

    protected $fillable = [
        'descripcion',
        'abreviatura'
    ];
}
