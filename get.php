<?php
$servername = "localhost";
$username = "root";
$password = "{your password}";
$dbname = "atom";
$charset = 'utf8mb4';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//$q = strtolower($_GET["q"]);
$sql = "SELECT * from term";



$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
$dsn = "mysql:host=$servername;dbname=$dbname;charset=$charset";
try {
     $pdo = new PDO($dsn, $username, $password, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}


//echo gettype($sql);
//echo $sql;
//$sql = "SELECT $q";
//$sql = $conn->real_escape_string($sql);
//$sql= addcslashes($sql, '%_');
//$sql="select distinct a.id, authorized_form_of_name, r.identifier, c.street_address, c.website,c.email,c.telephone, c.postal_code,c.longitude,c.latitude, ci.city, ci.note,ci.culture  from actor\_i18n a join repository\_i18n ri on a.id=ri.id join repository r on r.id=ri.id left join contact\_information c on a.id=c.actor\_id left join contact\_information_i18n ci on c.id=ci.id  where a.culture='de' and ci.culture='de'";

$sql="select distinct a.id as id, authorized_form_of_name as name, r.identifier as repository, c.street_address as street, c.website as url,c.email as email,c.telephone as phone, c.postal_code as postal ,c.longitude as lon,c.latitude as lat, ci.city as city, ci.note as note,ci.culture as culture from actor_i18n a join repository r on a.id=r.id left join repository_i18n ri on r.id=ri.id left join contact_information c on a.id=c.actor_id left join contact_information_i18n ci on c.id=ci.id  where a.culture='de' and ci.culture='de'";


$sql="select distinct a.id as id, authorized_form_of_name as name, r.identifier as repository, c.street_address as street, c.website as url,c.email as email,c.telephone as phone, c.postal_code as postal ,c.longitude as lon,c.latitude as lat, ci.city as city, ci.note as note,ci.culture as culture, slug from actor_i18n a join repository r on a.id=r.id left join repository_i18n ri on r.id=ri.id left join contact_information c on a.id=c.actor_id left join contact_information_i18n ci on c.id=ci.id join slug s on s.object_id=a.id where a.culture='de' and ci.culture='de'";

//echo $sql;

$test=shell_exec('mysql -u root -p{your password} -D atom -B -e "'.$sql.'"');

$test=utf8_encode($test);
//echo $test;




//we split the single lines
$lines = explode("\n", $test);

$linesArray = array();

//we split each line in a set of elements
foreach($lines as $line){
   $linesArray[] = explode("\t",$line);
}
//we use the first line of data as an array of headers
$headers = $linesArray[0];

//and remove it
unset($linesArray[0]);

$jsonArray = [];


foreach($linesArray as $l=>$ln){
	$geometry=["type"=>"Point"];
	$properties=[];
	$lon=0;
	$lat=0;
	$address="";
    foreach($ln as $k=>$part){
        //we re-build an array with the right headers
        //$jsonArray[$l][$headers[$k]] = $part;
        //echo($headers[$k] . "----" . $part ."|\n");
        switch ($headers[$k]){
			case "name":
				$properties["name"] = html_entity_decode($part);
				break;
			case "street":
				($part != "NULL") ? $address = $part : $address = "" ;
				break;
			case "postal":
				($part != "NULL") ? $address = $address . "," . $part: $address = $address . ", " ;			
				break;
			case "city":
				 ($part != "NULL") ? $address = $address . " " . $part: $address = $address  ;		
				break;
			case "phone":
				($part != "NULL") ? $properties["phone"] = $part: $properties["phone"]="" ;
				break;
			case "email":
				 ($part != "NULL") ? $properties["email"] = $part : $properties["email"]="";
				break;
			case "url":
				 ($part != "NULL") ? $properties["url"] = $part: $properties["url"]="";
				break;
			case "note":
				 ($part != "NULL") ? $properties["note"] = $part: $properties["note"]="";
				break;
			case "slug":
				 ($part != "NULL") ? $properties["slug"] = $part: $properties["slug"]="";
				break;
			case "lon":
				$lon = floatval($part);
				break;
			case "lat":
				$lat = floatval($part);
				break;
			
		}
		
    }
    $geometry["coordinates"]=[$lon,$lat];
    $properties["address"]=$address;
    $feature=["type"=>"Feature", "geometry" =>$geometry, "properties" =>$properties];

    if ($lon + $lat != 0){
		array_push($jsonArray,$feature);
	}
}

$geoJson=["type"=> "FeatureCollection",  "features" => $jsonArray];




echo json_encode($geoJson);













?>
