
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


if (isset ($_GET['precision'])){
	$precision = floatval( $_GET['precision']);
}
else{
	$precision = 0.5;
}

//print $precision;

if ($_GET['todo']=='placesNames'){

$params = [
        'query' => [
            'regexp' => [
                'loc' => $_GET['term'] . '.*'
            ]],
            'size' =>10000,
            'sort' => [
				'loc' => [
					'order' => 'asc'
					]
			]
        
        ];
};


if ($_GET['todo']=='corpus'){

$params = [
        'query' => [
            'wildcard' => [
                'word' => strtolower($_GET['term']) . '*'
            ]],
            'size' =>100,
            'sort' => [
				'word' => [
					'order' => 'asc'
					]
			]
        
        ];



$params = [
        'query' => [
            'regexp' => [
                'word' => '.*' . strtolower($_GET['term']) .'.*'
            ]],
            'size' =>100,
            'sort' => [
				'word' => [
					'order' => 'asc'
					]
			]
        
        ];
};

if ($_GET['todo']=='placesHere'){
	
$params = [
				  'query'=> [
					'bool'=> [
					  'must'=> [
						[
						  'range' => [
							'lon' => [
							  'gte'=> (floatval($_GET['lon']) - $precision),
							  'lte'=> (floatval($_GET['lon']) + $precision),
							]
						  ]
						],
						[
						  'range' => [
							'lat' => [
							  'gte'=> (floatval($_GET['lat']) - $precision),
							  'lte'=> (floatval($_GET['lat']) + $precision),
							]
						  ]
						]
					  ]
					]
				  ]
				
								
			 ,
			  'size' => 200000,
			  'sort' => [[ "loc" => ["order" => "asc"]]]
			];	
	
	

}
/*print_r ($params);
print_r(json_encode($params));

*/
;







$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'http://localhost:9200/'.$_GET['index'].'/_search/',
    CURLOPT_HEADER => 0,
    CURLOPT_POSTFIELDS => json_encode($params),
    CURLOPT_POST => 1
));

$result = curl_exec($curl) or die(curl_error());


echo $result;



?>



