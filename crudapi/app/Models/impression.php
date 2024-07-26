<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class impression extends Model
{
    use HasFactory;
    protected $fillable = [
        'Date', 'Shift', 'Client', 'N_OF', 'Designation', 'Famille',
        'MATRUCULE', 'Nombre_piste', 'MACHINE', 'QTE', 'METRAGE',
    ];
}
