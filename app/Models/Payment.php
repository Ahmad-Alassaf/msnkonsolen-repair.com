<?php

namespace App\Models;

use App\Models\Contract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        
        'session_id',
        'customer',
    ];

    public function contract()// One Payment to One Contract
    {
        return $this->hasOne(Contract::class);
    }
}
