<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
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
                            'street'=>$this->street,              
                            'hausnumber'=>(string)$this->hausnumber,
                            'postal'=>(string)$this->postal,
                            'city'=>$this->city,

                          ],
           

       ];
    }
}
