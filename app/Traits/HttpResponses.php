<?php
namespace App\Traits;
trait HttpResponses{
    protected function success($data,$message=null,$code=200)
    {
        //data to send back
        return response()->json([
            'status'=>'Request was successfull. ',
            'message'=>$message,
            'data'=>$data

        ],$code);

    }
    protected function error($data,$message=null,$code)
    {
        //data to send back
        return response()->json([
            'status'=>'Error has  occured... ',
            'message'=>$message,
            'data'=>$data

        ],$code);

    }
}