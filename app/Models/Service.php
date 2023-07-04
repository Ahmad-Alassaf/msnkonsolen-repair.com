<?php

namespace App\Models;



use App\Models\Device;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Service extends Model
{
    use HasFactory;
    protected $fillable=[
           'title','device','description','prise','waranty','foto'
    ];
    public function devices(){
        return $this->belongsToMany(Device::class,'services_devices','service_id','device_id');
    }
   
}
