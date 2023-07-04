<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddressRequest extends FormRequest
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
            'street'=>['required','string','max:255'],
            'user_id'=>['exists:users,id'],
            'hausnumber'=>['required'],
            'postal'=>['required'],
            'city'=>['required','string','max:255'],
           

        ];
    }
}
