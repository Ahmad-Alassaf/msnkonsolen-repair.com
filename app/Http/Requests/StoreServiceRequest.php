<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
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
            'title'=>['required','max:255'],
            'device'=>['required','max:255'],
            'description'=>['required'],
            'prise'=>['required'],
            'waranty'=>['required'],
           
            'list'=>['required','exists:devices,id']
        ];
    }
}
