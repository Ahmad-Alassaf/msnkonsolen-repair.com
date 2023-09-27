<?php

namespace App\Http\Controllers;

use Stripe\Charge;
use Stripe\Stripe;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Models\Payment;
use GuzzleHttp\Psr7\Message;
use Stripe\Payout;

use function Psy\debug;

class PaymentController extends Controller
{
    //
    public $session_id='';
    public function checkout(Request $request){
        header( "Access-Control-Allow-Origin : *");
        header("Access-Control-Allow-Credentials:true");
    \Stripe\Stripe::setApiKey('sk_test_51NRR9iJmrCQ5cBeWajcAxsEDerscCcc8LGMCmj5z78Ufmy5ZXYMSf2WFnYI7pjRg9b2LNH4NCb9mePia0ODNrsWW00tCO9JVrW');
        $linitems= [
                        [
                            "price_data" =>[ 
                                "currency"=> "eur", 
                                "product_data"=>[
                                    'name'=>'T-Shirt'

                                ],
                                "unit_amount"=> 2000,
                            ],
                            'quantity'=>1
                           
                            
                      ]
                  ];
    $session=Session::create([
        'line_items' =>$linitems,
          'mode' => 'payment',
          'success_url' => route(name:'success'),
          'cancel_url' => route(name:'cancel')

    ]);
       
          
    return redirect($session->url);
      
       
    }
    public function getsession( Request $request)
    {
         foreach($request->contractslist as $contract)
         {
            $contractprise=0;
            $productdata=[];
            if($contract['relationships']['services'] !=null )
            foreach($contract['relationships']['services'] as $service)
            {
                $contractprise +=$service['attributes']['prise'];
                $productdata=[
                    'name'=>$service['attributes']['title']

                ];
            }
            $lineitems[]= [
                'price_data' =>[
                                'currency'=>'usd',
                                'unit_amount'=>(int)$contractprise*100,
                                'product_data'=> $productdata
                            ] ,
                'quantity' => 1,
              ];
         }        
       $stripe = new \Stripe\StripeClient(env('STRIPE_API_KEY'));
      $api_key=env('STRIPE_API_KEY');
      $checkout=  $stripe->checkout->sessions->create([
       //'success_url'  =>  'http://127.0.0.1:8000/success',
        'success_url' => 'https://msnkonsolen-repair.com/success',
       //   'cancel_url' => 'http://127.0.0.1:8000/cancel',
      'cancel_url' => 'https://msnkonsolen-repair.com/cancel',
            'line_items' => $lineitems,
            'mode' => 'payment',
          ]);
     
        return $checkout;
                   
        }
        public function success(Request $request )
        {
            $stripe = new \Stripe\StripeClient(env('STRIPE_API_KEY'));
          
            $checkout=  $stripe->checkout->sessions->retrieve($request->sessionID);
           
            return   $checkout;
           
            

        }
    

    
   
}
