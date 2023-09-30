<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ContractRequest;
use App\Http\Resources\ContractResource;

class ContractsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ContractResource::collection(Contract::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ContractRequest $request)
    {      
        $request->validated($request);      
        $contract=Contract::create([
            'Contract_Type'=>$request->Contract_Type,
            'jobsnumber'=>rand(1000,99999),
            'device'=>$request->device,
            'serialnumber'=>$request->serialnumber, 
            'faultdescription'=>$request->faultdescription,  
            'casestatus'=>$request->casestatus,  
            'waterdamage'=>$request->waterdamage,
            'earlierrepair'=>$request->earlierrepair,
            'accesories'=>'dsfsdfsdfsd',
            'paidstatus'=>'unpaid',
            'warantysiegel'=>$request->warantysiegel,        
            'status'=>'In ShoppingCart',
            'user_id'=>Auth::id(),
            'payment_id'=>1,
        ]);
        
        $contract->services()->attach($request->services);      
        return new ContractResource($contract);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Contract $contract)
    {
        //
        return new  ContractResource($contract);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contract $contract)
    {
        $contract->delete();
        return response(null,204);//204 mean no Content
    }
}
