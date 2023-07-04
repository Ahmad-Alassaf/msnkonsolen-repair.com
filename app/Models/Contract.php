<?php

namespace App\Models;

use App\Models\User;
use App\Models\Device;

use App\Models\Service;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contract extends Model
{
    use HasFactory;
    protected $fillable=[
                        'Contract_Type',
                        'jobsnumber',
                        'serialnumber',
                        'device',
                        'faultdescription',
                        'accesories',
                        'warantysiegel',
                        'waterdamage',
                        'user_id',
                        'payment_id',
                        'status',
                        'casestatus',
                        'earlierrepair'
                        
                    ];
    
                  
    public function services()
    {
        return $this->belongsToMany(Service::class,'contracts_services');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
 

}
