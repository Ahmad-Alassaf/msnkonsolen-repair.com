<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class Role extends Model
{
    use HasFactory,HasPermissions,HasRoles;
    protected $fillable=['name','guard_name'];
    
}
