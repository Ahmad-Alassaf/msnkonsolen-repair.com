<?php

namespace App\Http\Controllers;

use App\Models\Contract;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class PDFController extends Controller
{
    //

    public function save(){
        $data = [
            'title' => 'Welcome to ItSolutionStuff.com',
            'date' => date('m/d/Y'),
            'contract' =>'test'
        ]; 

       // $path =  public_path('images').'/pdf/test.pdf';

        $pdf = PDF::loadView('pdfviews.contractspdf', compact('data'));
        $pdf->setOption('javascript-delay', 3000);
     //   $pdf->save($path);

        $headers = [
            'responseType' => 'blob'
         ];   
        return response()->download($pdf, $headers);

    }
}
