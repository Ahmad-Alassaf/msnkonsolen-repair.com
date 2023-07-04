<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract_Service extends Model
{
    use HasFactory;
    protected $fillable=['service_id','contract_id'];
}
