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
        'title' => $request->to,
        'subject'=>$request->subject,
        'body' =>  $request->content,
    ];
     
    Mail::to('ahmad312alassaf@gmail.com')->send(new msnknsolenMail($mailData));
       
    
    }
}
