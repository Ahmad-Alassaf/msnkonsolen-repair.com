<?php

namespace App\Listeners;

use App\Events\neuUserRegistration;
use App\Mail\NeuUserVerificationEmail;
use Illuminate\Support\Facades\Mail;
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
        Mail::to($event->email)->send(new NeuUserVerificationEmail(123));
    }
}
