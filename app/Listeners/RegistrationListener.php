<?php

namespace App\Listeners;

use App\Models\User;
use App\Events\neuUserRegistration;
use Illuminate\Support\Facades\Mail;
use App\Mail\NeuUserVerificationEmail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class RegistrationListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(neuUserRegistration $event)
    {
        Mail::to($event->email)->send(new NeuUserVerificationEmail($event->verificationcode));
        $user=User::where('email',$event->email)->first();
        $user->verificationcode=$event->verificationcode;
        $user->isverified=0;
        $user->save();
    }
}
