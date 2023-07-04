<?php

namespace App\Http\Resources;

use App\Http\Resources\DeviceResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
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
                            'title'=>(string)$this->title,
                            'description'=>$this->description,
                            'prise'=>$this->prise,
                            'waranty'=>$this->waranty,
                            'foto'=>$this->foto,
                            'created_at'=>$this->created_at,
                            'updated_at'=>$this->updated_at
                          ],
            'relationships'=>[
                'devices'=>DeviceResource::collection($this->devices)
              
               
               
               
                
                
            ]
            ];
    }
}
