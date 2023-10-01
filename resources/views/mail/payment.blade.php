<!DOCTYPE html>
<html>
<head>
    <title>Zahlung Bestätigung</title>
</head>
<body>
  
<ul>
@foreach ($contracts as $contract)
    <li>
        {{$contract->jobsnubmer}}-{{$contract->device}} -{{$contract->serialnumber}}
    </li>
    <li>
            @foreach ($contract['relationships']['services'] as $service)
                <li>{{$service->title}} - {{$service->prise}}</li>
            @endforeach
    </li>
@endforeach
</ul>
  
</body>
</html>
<h1>
    customer has payed 
   
</h1>
 