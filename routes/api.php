<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\ContractsController;
use App\Http\Controllers\PlatformsController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\SendEmailController;
use App\Http\Controllers\ShoppingcartController;


//
Route::get('/verification',function(){
    return response()->json([
        'message'=>'the email account already confirmed'
    ]);
})->middleware('sanctum','verified');


//public Routes
Route::post('/login',[AuthController::class,'login']);
Route::post('/register',[AuthController::class,'register']);
Route::get('/services',[ServicesController::class,'index']);
Route::get('/services/{service}',[ServicesController::class,'show']);
Route::resource('/users', UserController::class);
Route::get('/devices',[DeviceController::class,'index']);
Route::get('/devices/{device}',[DeviceController::class,'show']);


// Protected Routes
Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::post('/logout',[AuthController::class,'logout']);
    Route::put('/removerole/{user}',[UserController::class,'removeRole']);
    Route::put('/removepermission/{user}',[UserController::class,'removepermission']);
    Route::resource('/roles', RoleController::class);
    Route::put('/roles/assignPermission/{role}',[RoleController::class,'assignPermission']);
    Route::resource('/permissions', PermissionController::class);

  
    
   

    Route::post('/devices',[DeviceController::class,'store']);   
    Route::put('/devices',[DeviceController::class,'update']);
    Route::delete('/devices/{device}',[DeviceController::class,'destroy']);
   

    Route::post('/services',[ServicesController::class,'store']);   
    Route::put('/services/{service}',[ServicesController::class,'update']);
    Route::delete('/services/{service}',[ServicesController::class,'destroy']);

    Route::resource('/platforms',PlatformsController::class);

    Route::resource('/address',AddressController::class);
    Route::resource('/contracts',ContractsController::class);
    Route::resource('/shoppincarts',ShoppingcartController::class);

 /*    Route::post('/payment',[PaymentController::class,'checkout']);
    Route::post('/success',[PaymentController::class,'success'])->name('success');
    Route::post('/cancel',[PaymentController::class,'cancel'])->name('cancel'); */

    Route::post('/getsession',[PaymentController::class,'getsession']);
    Route::post('/success',[PaymentController::class,'success'])->name('success');
    Route::post('/cancel',[PaymentController::class,'cancel'])->name('cancel');

    Route::post('/sendemail',[SendEmailController::class,'send']);

   
});