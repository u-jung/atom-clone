<?php

$q = strtolower($_GET["q"]);
$url="http://localhost/index.php/api/$q";
$apiKey = '5a0712435961ee39';
$headers = array(
     'REST-API-Key: '.$apiKey
);
$ch = curl_init($url);
// To save response in a variable from server, set headers;
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
// Get response
$response = curl_exec($ch);
// Decode

$result = json_decode($response);

echo json_encode($result, JSON_UNESCAPED_UNICODE );

 





?>
