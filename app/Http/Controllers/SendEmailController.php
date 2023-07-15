<?php

namespace App\Http\Controllers;

use App\Mail\msnknsolenMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendEmailController extends Controller
{
    //
    public function send(Request $request)
    {
       
      if( mail($request->to,$request->subject,$request->content))
      {
        return response([
               "message"=> 'Email successuflly gesendet'
        ]);
      }

    }
}
