<?php

$time_start = microtime(true);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_PORT => "2000",
  CURLOPT_URL => "http://localhost:2000/journals/edit/112",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "PUT",
  CURLOPT_POSTFIELDS => "title=The%20Sun%20is%2C%20oh%2C%20so%20desperate%20to%20set%20tonight",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "content-type: application/x-www-form-urlencoded",
    "postman-token: 58b01fe4-086a-105c-77ec-20c1027e7dd5",
  ),
));

$response = curl_exec($curl);

curl_close($curl);

echo $response;

// $end = strtotime("now");
// $output = $start - $end / 1000;
$time_end = microtime(true);
$time = number_format($time_end - $time_start, 4);
echo "<hr>";
echo "\nProcess time execution: $time seconds\n";
