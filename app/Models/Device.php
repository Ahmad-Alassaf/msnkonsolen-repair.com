<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;
    protected $fillable=[
        'title','platform_id'
    ];
     public function services()//many-to-many with devices
    {
        return $this->belongsToMany(Service::class,'services_devices','device_id','service_id');

    } 
    public function platform()
    {
        return $this->belongsTo(Platform::class);

    }   
}
