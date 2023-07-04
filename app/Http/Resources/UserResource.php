<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>(string)$this->id,
            'attributes'=>[
                            'name'=>$this->name,
                            'email'=>$this->email,               
                           ],
            'roles'=>RoleResource::collection($this->roles),
            'permissions'=>PermissionResource::collection($this->permissions),
            'Address'=>AddressResource::collection($this->addresses),
            'contracts'=>$this->contracts
           
            

        ];
    }
}
