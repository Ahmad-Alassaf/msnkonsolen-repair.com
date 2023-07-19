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
       
      $mailData = [
        'to' => $request->to,
        'subject'=>$request->subject,
        'body' =>  $request->content,
    ];
     
    Mail::to($request->to,)->send(new msnknsolenMail($mailData));
       
    
    }
}
