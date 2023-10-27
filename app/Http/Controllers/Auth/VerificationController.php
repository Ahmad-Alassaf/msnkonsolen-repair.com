<?php

namespace App\Http\Controllers\Auth;
use Illuminate\Auth\Events\Verified;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\VerifiesEmails;
use illuminate\foundation\auth\emailverificationrequest;

class VerificationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Email Verification Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling email verification for any
    | user that recently registered with the application. Emails may also
    | be re-sent if the user didn't receive the original email message.
    |
    */

    use VerifiesEmails;

    /**
     * Where to redirect users after verification.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }
    public function __invoke(emailverificationrequest $request)
  {
    if ($request->user()->hasverifiedemail()) {
      return response()->json(
        [
          "message" => "given email is already verified.",
        ],
        400
      );
    }

    if ($request->user()->markemailasverified()) {
      event(new verified($request->user()));
    }

    return response()->json(
      [
        "message" => "verification complete.",
      ]
    );
  }
}
