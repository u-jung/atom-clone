jQuery(document).ready(function() {
	showRevisions("");
	
	jQuery('#rev').DataTable({
		responsive: true,

		"info":true,
		"processing": true,
		"order": [[ 7, 'desc' ]],
		"pageLength": 10,
		  "search": {
			"search": "human"
		  },
		ajax: {
			url: '/plugins/arPotsdamPlugin/tmp/revision.json',
			dataSrc: ''
		},
		columns: [
			{data: null,
				sTitle:"Object",
				render: function ( data, type, row, ) {
				
				return '<a href="'+row.uri+'" target="blank">'+row.l+'</a>';
				}
			},
			{ data: null,
				sTitle:"Description",
				render:function(data,type,row){
					return '<span title="'+row.d+'">'+row.d.slice(0,40)+'...</span>'
					} },
			{ data: 'a',
				sTitle:"Action", },
			{ data:null,
				sTitle:"Property",
				render:function(data,type,row){
					if(row.p==""){return row.pl}
					else{
						return '<a href="https://www.wikidata.org/wiki/Property:'+row.p+'" target="blank">'+row.pl+'</a>';
						}
				}
			},
			{ data:null,
				sTitle:"Value",
				render:function(data,type,row){
					if(row.v==""){return '<span title="'+row.vl+'">'+row.vl.slice(0,20)+'...</span>'}
					else{
						return '<a href="https://www.wikidata.org/wiki/'+row.v+'" target="blank">'+row.vl+'</a>';
						}
				}
			},
			{ data:null,
				sTitle:"User",
				width:"10%",
				render:function(data,type,row){
						return '<a href="https://www.wikidata.org/wiki/User:'+row.u+'" target="blank">'+row.u+'</a>';

				}
			},
			{ data: null,
				sTitle:"Revision",
				render:function(data,type,row){
					return '<a href="https://www.wikidata.org/w/index.php?title='+row.uri.split('\\').pop().split('/').pop()+'&diff='+row.i+'" target="blank">'+row.i+'</a>';
				}},
			{ data: 't',
				sTitle:"Modified",
				render:function(data,type,row){
					return data.split("T")[0];
				}},

			{ data: 'b' ,
				sTitle:"Human/Bot",
				render: function(data,type,row){
					return data==true?"human":"bot";
				}}
		]
		    
	}).on( 'draw.dt', function (e, settings, data) {
		var l=jQuery('#rev').DataTable().data();
		
        jQuery('#counter').text(l.length);
    } );

});

function showRevisions(timedelta=1) {

	jQuery('#main-column').html('<div class="multiline-header"></div><div id="content"></div>');
	jQuery('.multiline-header').html('<h1><span id="counter"></span>' + __(54) + '</h1>\
			<p>' + __(53) + '</p><a href="#legend">' + __(9) + '</a>')
	jQuery("#content").append('<table id="rev" class="display"> </table><p id="legend">'+__(67)+'</p>');
}

