<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Http\Resources\ServiceResource;
use App\Http\Requests\StoreServiceRequest;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return ServiceResource::collection(Service::all());
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
    public function store(StoreServiceRequest $request)
    {
       
        $request->validated($request->all());
      
        if($request->hasFile('foto'))
        {
            
            $image=$request->file('foto');
            $ext=$image->extension();
           
            $namewithextension = $image->getClientOriginalName();
            $name = explode('.', $namewithextension)[0]; // Filename 'filename'
            $file=$name.'.'.$ext;
            $image->move('storage/images',$file);
            $service=Service::create([
                'title'=>$request->title,
                'device'=>$request->device,
                'description'=>$request->description,
                'prise'=>$request->prise,
                'waranty'=>$request->waranty,
                'foto'=>$file,
            ]);
            
            $list=explode(",",$request->list);
            $service->devices()->attach($list);
            return new ServiceResource($service);
            
        }
        else
        return $this->error('','Credentials Or Foto Error',401);
       
       
       
       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        return new ServiceResource($service);
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
    public function update(Request $request, Service $service)
    {

          
        
               
                /* $image=$request->file('foto');              
                $ext=$image->extension();               
                $namewithextension = $image->getClientOriginalName();
                $name = explode('.', $namewithextension)[0]; // Filename 'filename'
                $file=$name.'.'.$ext;
                $image->move('storage/images',$file);
                $service->foto=$file; */

                $service->title=$request->title;
                $service->device=$request->device;
                $service->description=$request->description;
                $service->waranty=$request->waranty;
    
                $service->prise=$request->prise;
                $service->save();
                if($request->has('list'))
                {
                   
                    $service->devices()->sync($request->list);
                }
                return new ServiceResource($service);
               
        
       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
       
        $image_name = $service->foto;
      $image_path = public_path('/storage/images/'.$image_name);
      if(File::exists($image_path)) {
        File::delete($image_path);
      }
        $service->delete();
        return response(null,204);//204 mean no Content
    }
}
