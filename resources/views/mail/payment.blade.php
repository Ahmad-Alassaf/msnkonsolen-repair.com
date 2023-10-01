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


@endforeach
</ul>

</body>
</html>

 