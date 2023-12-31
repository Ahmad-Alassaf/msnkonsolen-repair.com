<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContractRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'Contract_Type'=>['required'],
            'device'=>['required','string','max:255'],
            'faultdescription'=>['required'], 
            'accesories'=>['required'],           
            'serialnumber'=>['required','max:255'],
            
          
           
            
        ];
    }
}
