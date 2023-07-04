<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDeviceRequest;
use App\Models\Device;
use Illuminate\Http\Request;
use App\Http\Resources\DeviceResource;
class DeviceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DeviceResource::collection(Device::all());
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
    public function store(StoreDeviceRequest $request)
    {
        $request->validated($request->all());
        $device=Device::create([
            'title'=>$request->title,
            'platform_id'=>$request->platform_id

        ]);
        return new DeviceResource($device);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Device $device)
    {
      
       
       
        return new DeviceResource($device);
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
    public function update(Request $request,Device $device)
    {
        $device->update($request->all());
        return new DeviceResource($device);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Device $device)
    {
        $device->delete();
        return response(null,204);//204 mean no Content
    }
}
