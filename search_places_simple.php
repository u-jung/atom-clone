<?php

/*
 * esq.php
 * 
 * Copyright 2018 FH Potsdam FB Informationswissenschaften PR Kolonialismus <jung@fh-potsdam.de>
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 * 
 * 
 */


$countries=array("BI"=>"Burundi",
"CF"=>"Central African Republic",
"CG"=>"Republic of the Congo",
"CM"=>"Cameroon",
"CN"=>"China",
"FM"=>"Micronesia",
"GA"=>"Gabon",
"GH"=>"Ghana",
"GQ"=>"Equatorial Guinea",
"KE"=>"Kenia",
"MH"=>"Marshall Islands",
"MP"=>"Northern Mariana Islands",
"MZ"=>"Mozambique",
"NA"=>"Namibia",
"NG"=>"Nigeria",
"NR"=>"Nauru",
"PG"=>"Papua New Guinea",
"PW"=>"Palau",
"RW"=>"Rwanda",
"TD"=>"Chad",
"TG"=>"Togo",
"TZ"=>"Tanzania",
"WS"=>"Samoa");

$q = strtolower($_GET["term"]);


/*
$params = [
        'query' => [
            'regexp' => [
                'loc' => $q . '.*'
            ]],
            'size' =>10000,
            'sort' => [
				'loc' => [
					'order' => 'asc'
					]
			]
        
        ];

*/

$params = [
        'query' => [
		   'query_string' => [
				'fields' => ['loc','loc_ascii','loc_alt'], 
				'query' => $q . '*'
			]
            ],
            'size' =>100,
            'sort' => [
				'loc' => [
					'order' => 'asc'
					]
			]
        
        ];


/*print_r ($params);
print_r(json_encode($params));

*/
;







$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'http://localhost:9200/geo/_search/',
    CURLOPT_HEADER => 0,
    CURLOPT_POSTFIELDS => json_encode($params),
    CURLOPT_POST => 1
));

$result = curl_exec($curl) or die(curl_error());
$arr = json_decode($result, true);
$output=array();
$output_geo=array();
$x=0;
$y=0;
foreach($arr['hits']['hits'] as $x => $v) {
	/*
	if ($v['_source']['map'] == 'geonames'){
		array_push($output_geo,$v['_source']['loc']." - [today: " . $countries[$v['_source']['country']] . "] " . $v['_source']['feature_code'] . "  {".$v['_source']['lon']."|".$v['_source']['lat']."|".$v['_source']['error']."}    ~" . $v['_source']['loc_ascii'].", ".$v['_source']['loc_alt']."~");
	}
	else{
		array_push($output,$v['_source']['loc'] . " - [historic map: ".$v['_source']['map'] . "] " . " {".$v['_source']['lon']."|".$v['_source']['lat']."|".$v['_source']['error']."}    ~" . $v['_source']['loc_ascii'].", ".$v['_source']['loc_alt']."~"  );
	}
	*/
	if ($v['_source']['map'] == 'geonames'){
				$output_geo[$x]['name']=$v['_source']['loc'];
				$output_geo[$x]['type']=$countries[$v['_source']['country']] . " " . $v['_source']['feature_code'] . "  {".$v['_source']['lon']."|".$v['_source']['lat']."|".$v['_source']['error']."}    ~" . $v['_source']['loc_ascii'].", ".$v['_source']['loc_alt']."~";
				$x++;
			}
	else{
				$output[$y]['name']=$v['_source']['loc'];
				$output[$y]['type']=$v['_source']['map'] . " " . " {".$v['_source']['lon']."|".$v['_source']['lat']."|".$v['_source']['error']."}    ~" . $v['_source']['loc_ascii'].", ".$v['_source']['loc_alt']."~" ;
				$y++;
			}
}


sort($output);
sort($output_geo);
/*$output=array_merge($output,$output_geo);*/
/*$result=array("historic" => $output,"current" => $output_geo);*/
$result=array_merge($output,$output_geo);
echo json_encode($result);
/*print_r($output);*/
/*echo $result;*/




?>



