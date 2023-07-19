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
        'from' => $request->from,
        'subject'=>$request->subject,
        'body' =>  $request->content,
    ];
     
    Mail::to( 'info@msnkonsolen-repair.com')->send(new msnknsolenMail($mailData));
       
    
    }
}
