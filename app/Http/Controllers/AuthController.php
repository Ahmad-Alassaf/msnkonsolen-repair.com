<?php

namespace App\Http\Controllers;

use App\Events\neuUserRegistration;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use Nette\Utils\Random;
use Throwable;

class AuthController extends Controller
{
    use HttpResponses;//trait
  
    public function login(LoginUserRequest $request)
    {
        try{
            $request->validated($request->all());
            if(Auth::attempt($request->only(['email','password'])))
            {
                $user=User::where('email',$request->email)->first();
                return $this->success([
                 'user'=>new UserResource($user),
                  'token'=>$user->createToken('Api Token Of User'.$user->name)->plainTextToken
         
                ]);  
            
            }
            else{
                return $this->error('','Credentials do not match',401);
            }
           

        }
        catch(\Throwable $th)
        {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);


        }
             
    }
    public function register(StoreUserRequest $request)
    {
        $request->validated($request->all());
        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
           
         
        ]);
        $token=$user->createToken('Api Token Of User:'.$user->name)->plainTextToken;
       // $user->sendEmailVerificationNotification();
       $verificationcode=rand(1000,99999);
       event(new neuUserRegistration($request->email,$verificationcode));
        return $this->success([
            'user'=>new UserResource($user),
            'token'=>$token]);
      
    }
    public function logout(Request $request)
    {
       
        auth()->user()->tokens()->delete();
       return $this->success([
             'message'=>'You have been successfully logged out !!!!!!'

        ]);
    }
    public function verifyemail(Request $request)
    {
        $user=User::where('email',$request->email)->first();
        $user->isverified=1;
        $user->save();
        return $this->success([
            'message'=>'Your Email verified succefully verified !!!!!!'

       ]);
        

    }

    
    public function resendverificationcode(Request $request)
    {
        $verificationcode=rand(1000,99999);
        event(new neuUserRegistration($request->email,$verificationcode));
        return response([
            'message'=>' Verification Code resended'

        ]);
        

       

    }

}
