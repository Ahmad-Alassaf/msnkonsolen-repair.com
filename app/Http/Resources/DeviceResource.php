<?php

namespace App\Http\Resources;

use App\Http\Resources\ServiceResource;
use Illuminate\Http\Resources\Json\JsonResource;

class DeviceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return  [
                    'id'=>(string)$this->id,
                    'attributes'=>[
                                    'title'=>(string)$this->title,              
                                    'created_at'=>$this->created_at,
                                    'updated_at'=>$this->updated_at,

                                  ],
                    'relationships'=>[
                                        'platform'=>[
                                                        'id'=>(string)$this->platform->id,
                                                        'platform'=>$this->platform->platform,
                                                    ],
                                        'services'=>$this->services
                                        
                                                    
                                   ]

               ];
    }
}
