<?php

namespace App\Http\Controllers;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UserResource::collection(User::all());
    }
    public function assignRole(Request $request,User $user)
    {
        //
        if(!$user->hasRole($request->role)){
            $user->assignRole($request->role);
            return 'Success';
        }
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
    public function store(Request $request,User $user)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
        return new UserResource($user);
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
    public function update(Request $request,User $user)
    {
        //
        if($request->type=='role')
        {
            $role=Role::where('name',$request->name )->first();
       $user->assignRole($role);

        }
        else{
            $permission=Permission::where('name',$request->name)->first();
            $user->givePermissionTo($permission);
        }      
        
       return new UserResource($user);
       
    }
    public function removerole(Request $request,User $user)
    {
        $role=Role::where('name',$request->name )->first();
        $user->removeRole($role);
        return new UserResource($user);

    }
    public function removepermission(Request $request,User $user)
    {
        $permission=Permission::where('name',$request->name )->first();
        $user->revokePermissionTo($permission);
        return new UserResource($user);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
