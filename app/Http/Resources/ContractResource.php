<?php

namespace App\Http\Resources;

use App\Http\Resources\ServiceResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ContractResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return   [
            'id'=>(string)$this->id,
            'attributes'=>[
                            'Contract_Type'=>$this->Contract_Type, 
                            'jobsnumber'=>(string)$this->jobsnumber,    
                            'serialnumber'=>(string)$this->serialnumber,
                            'faultdescription'=>$this->faultdescription,
                            'casestatus'=>$this->casestatus,
                            'earlierrepair'=>$this->earlierrepair,
                            'warantysiegel'=>$this->warantysiegel,
                            'waterdamage'=>$this->waterdamage,
                            'accesories'=>$this->accesories,
                            'paidstatus'=>$this->paidstatus,
                            'device'=>$this->device,    
                            'status'=>$this->status,                 
                            'created_at'=>$this->created_at,
                            'updated_at'=>$this->updated_at,

                          ],
            'relationships'=>[
                                'user'=>[
                                            'id'=>(string)$this->user->id,
                                            'attributes'=>[
                                                            'name'=>$this->user->name,
                                                            'email'=>$this->user->email,
                                                        ],
                                            'relationships'=>[
                                                'Address'=>AddressResource::collection($this->user->addresses),
                                            ]            
                                       ],
                                'services'=>ServiceResource::collection($this->services),
                           ]

       ];
    }
}
