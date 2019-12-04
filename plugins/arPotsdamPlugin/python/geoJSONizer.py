#!/usr/bin/python3
# -*- coding: utf-8 -*-
#
#  GeoJSONizer.py
#  
#  Copyright 2017 FH Potsdam FB Informationswissenschaften PR Kolonialismus <kol@fhp-kol-1>
#  
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#  
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#  
# 

import urllib.parse
import urllib.request
import urllib
import json
import re


WD_HUMAN="Q5"	
WD_MISSION="Q20746389"
WD_ENTERPRISE="Q4830453"
WD_AUTHORITY="Q327333"
WD_MILITARY="Q45295908"
WD_SETTLEMENT="Q486972"
WD_EVENT="Q15815670"
WD_COLONY="Q133156"
WD_EDUCATION="Q2385804"

WD_SPARQL_ENDPOINT = "https://query.wikidata.org/sparql"

FILENAME="/usr/share/nginx/atom/plugins/arPotsdamPlugin/tmp/features.geojson"

class geoJSONizer():
	
	def __init__(self):
		pass


	def create_geoJSON(self):
		features={"type": "FeatureCollection",'features':[]}
		query='SELECT DISTINCT ?item ?itemLabel ?itemDescription ?coord  (GROUP_CONCAT(DISTINCT ?instance; separator="|") as ?instances)	\
				where \
				{\
				{optional{?item wdt:P17/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord. ?item wdt:P31 ?instance.}}\
				 union\
				{optional{?item wdt:P2541/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord. ?item wdt:P31 ?instance.}}\
				 union\
				{ optional{?item wdt:P131/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord.?item wdt:P31 ?instance.}} \
				 union\
				{ optional{?item wdt:P17/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord. ?item wdt:P31 ?instance.}}\
				 union\
				{ optional{?item wdt:P361/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord. ?item wdt:P31 ?instance.}}\
				 union\
				{ optional{?item wdt:P2650/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord. ?item wdt:P31 ?instance.}}\
				 union\
				{ optional{?item wdt:P937/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord. ?item wdt:P31 ?instance.}}\
                   SERVICE wikibase:label { bd:serviceParam wikibase:language "de,en". } \
				 } \
               group by ?item ?itemLabel ?itemDescription ?coord \
				order by ?item'
		
		query='SELECT DISTINCT ?item ?itemLabel ?itemDescription ?coord  ?von ?bis (GROUP_CONCAT(DISTINCT ?instance; separator="|") as ?instances)	\
			where \
			{\
			{optional{?item wdt:P17/wdt:P279* wd:Q329618 . \
			?item wdt:P625 ?coord. ?item wdt:P31 ?instance.\
			?position_statement ps:P625 ?coord.\
			OPTIONAL { ?position_statement pq:P580 ?v} \
			OPTIONAL { ?position_statement pq:P582 ?b} \
			bind(YEAR(?v) as ?von).\
			bind(YEAR(?b) as ?bis).}}\
			union\
			{optional{?item wdt:P2541/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord. ?item wdt:P31 ?instance.\
			?position_statement ps:P625 ?coord.\
			OPTIONAL { ?position_statement pq:P580 ?v} \
			OPTIONAL { ?position_statement pq:P582 ?b} \
			bind(YEAR(?v) as ?von).\
			bind(YEAR(?b) as ?bis).}}\
			union\
			{ optional{?item wdt:P131/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord.?item wdt:P31 ?instance.\
			?position_statement ps:P625 ?coord.\
			OPTIONAL { ?position_statement pq:P580 ?v} \
			OPTIONAL { ?position_statement pq:P582 ?b} \
			bind(YEAR(?v) as ?von).\
			bind(YEAR(?b) as ?bis).}} \
			union\
			{ optional{?item wdt:P17/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord. ?item wdt:P31 ?instance.\
			?position_statement ps:P625 ?coord.\
			OPTIONAL { ?position_statement pq:P580 ?v} \
			OPTIONAL { ?position_statement pq:P582 ?b} \
			bind(YEAR(?v) as ?von).\
			bind(YEAR(?b) as ?bis).}}\
			union\
			{ optional{?item wdt:P361/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord. ?item wdt:P31 ?instance.\
			?position_statement ps:P625 ?coord.\
			OPTIONAL { ?position_statement pq:P580 ?v} \
			OPTIONAL { ?position_statement pq:P582 ?b} \
			bind(YEAR(?v) as ?von).\
			bind(YEAR(?b) as ?bis).}}\
			union\
			{ optional{?item wdt:P2650/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord. ?item wdt:P31 ?instance.\
			?position_statement ps:P625 ?coord.\
			OPTIONAL { ?position_statement pq:P580 ?v} \
			OPTIONAL { ?position_statement pq:P582 ?b} \
			bind(YEAR(?v) as ?von).\
			bind(YEAR(?b) as ?bis).}}\
			union\
			{ optional{?item wdt:P937/wdt:P279* wd:Q329618 . ?item wdt:P625 ?coord. ?item wdt:P31 ?instance.\
			?position_statement ps:P625 ?coord.\
			OPTIONAL { ?position_statement pq:P580 ?v} \
			OPTIONAL { ?position_statement pq:P582 ?b} \
			bind(YEAR(?v) as ?von).\
			bind(YEAR(?b) as ?bis).}}\
			SERVICE wikibase:label { bd:serviceParam wikibase:language "de,en". } \
			} \
			group by ?item ?itemLabel ?itemDescription ?coord ?von ?bis\
			order by ?item'
		
		
		"""query='SELECT DISTINCT ?item ?itemLabel ?itemDescription where \
{ ?item (wdt:P17|wdt:P19|wdt:P20|wdt:P27|wdt:P36|wdt:P119|wdt:P131|wdt:P159|wdt:P180|wdt:P189|wdt:P276|wdt:P279|wdt:P291|wdt:P361|\
wdt:P551|wdt:P740|wdt:P915|wdt:P840|wdt:P921|wdt:P937|\
wdt:P1001|wdt:P1071|wdt:P1269|wdt:P1376|wdt:P1416|\
wdt:P2341|wdt:P2541|wdt:P2647|wdt:P2650)/(wdt:P31*|wdt:P361*|wdt:P131*|wdt:P279*) wd:Q329618 . \
SERVICE wikibase:label { bd:serviceParam wikibase:language "de,fr,en". } } order by ?item'"""

		query='SELECT DISTINCT ?item ?itemLabel ?itemDescription ?coord  ?von ?bis (GROUP_CONCAT(DISTINCT ?instance; separator="|") as ?instances)	\
			where \
			{\
			?item (wdt:P17|wdt:P19|wdt:P20|wdt:P27|wdt:P36|wdt:P119|wdt:P131|wdt:P159|wdt:P180|wdt:P189|wdt:P276|wdt:P279|wdt:P291|wdt:P361|\
wdt:P551|wdt:P740|wdt:P915|wdt:P840|wdt:P921|wdt:P937|\
wdt:P1001|wdt:P1071|wdt:P1269|wdt:P1376|wdt:P1416|\
wdt:P2341|wdt:P2541|wdt:P2647|wdt:P2650)/(wdt:P31*|wdt:P361*|wdt:P131*|wdt:P279*) wd:Q329618 .\
			?item wdt:P625 ?coord. ?item wdt:P31 ?instance.\
			?position_statement ps:P625 ?coord.\
			OPTIONAL { ?position_statement pq:P580 ?v} \
			OPTIONAL { ?position_statement pq:P582 ?b} \
			bind(YEAR(?v) as ?von).\
			bind(YEAR(?b) as ?bis).\
			SERVICE wikibase:label { bd:serviceParam wikibase:language "de,en". } \
			} \
			group by ?item ?itemLabel ?itemDescription ?coord ?von ?bis\
			order by ?item'



		l=self._get_from_WDQ(query)
		#print(json.dumps(l, sort_keys=True, indent=4, ensure_ascii=False))
		for e in l['results']['bindings']:
			
			#print(e)
			if 'itemLabel' in e:
				itemLabel=e['itemLabel']['value']
			else:
				itemLabel=""
			if 'item' not in e:
				continue
			
			if 'instances' in e:
				instances=e['instances']['value']
			else:
				instances=""
			
			if 'coord' not in e:
				continue
			
			if 'von' in e:
				von=e['von']['value']
			else:
				von=""
				
			if 'bis' in e:
				bis=e['bis']['value']
			else:
				bis=""			
			
			
			instance=self._get_instance(instances)
			if len(von+bis)>3:
				na=itemLabel +" ("+von+"-"+bis+")"
			else:
				na=itemLabel
			properties={'name':na, 'id':e['item']['value'][e['item']['value'].rfind("/")+1:],'instance':instance, 'von':von,'bis':bis}
			coords=re.match(r'Point\((.*)\)',e['coord']['value']).group(1).split(" ")
			precision=1000
			for c in coords:
				if (len(c)-c.rfind('.')-1)<precision:
					precision=len(c)-c.rfind('.')-1
			if precision==1000:
				precision=0
			properties['precision']=precision
			geometry= {"type": "Point","coordinates": [float(coords[0]), float(coords[1])]}
			print({'type':'Feature',"geometry":geometry,'properties':properties})
			features['features'].append({'type':'Feature',"geometry":geometry,'properties':properties})
			
		print(features)
		
		with open(FILENAME, 'w') as file:
			file.write(json.dumps(features, sort_keys=True, indent=4, ensure_ascii=False))

		file.close()
		
			

	def OLD_get_instance(self,instances):
		"""

		"""
		targets=[WD_HUMAN,WD_MISSION,WD_ENTERPRISE,WD_AUTHORITY,WD_MILITARY,WD_SETTLEMENT,WD_EVENT,WD_COLONY]
		lst=instances.split('|')
		for instance in lst:
			wdid=instance[instance.rfind('/')+1:]
			for target in targets:
				if wdid==target:
					return target
		return ""
		
	def _get_instance(self, instances):
		"""
		returns the main instance of a keyword
		
		Parameters:
		keyword : if set it represents an object of the self.KEYWORDS list
		s: if set it represents a string with a wdid 
		"""
		lst=[]
		l=instances.split('|')
		for instance in l:
			lst.append(instance[instance.rfind('/')+1:])
			 
		if len(list(set(lst).intersection(['Q5', 'Q1371796', 'Q189290']))) > 0:
			return 'Q5'  #human
		if len(list(set(lst).intersection(['Q2061186', 'Q1384677', 'Q879146', 'Q20746389', 'Q1564373', 'Q384003', 'Q20746389', 'Q732948']))) > 0:
			return 'Q20746389' #Missionary Society
		if len(list(set(lst).intersection(['Q4830453', 'Q567521', 'Q740752', 'Q1807108', 'Q188913', 'Q6500733', 'Q50825050', 'Q6881511','Q4830453']))) > 0:
			return 'Q4830453'
		if len(list(set(lst).intersection(['Q48074023', 'Q48069095', 'Q362636', 'Q47537097', 'Q33874813', 'Q19298672', 'Q327333', 'Q22687', 'Q1321241', 'Q16239032', 'Q47537101', 'Q47538966', 'Q854140', 'Q854399', 'Q41762668', 'Q334453']))) > 0:
			return 'Q327333' #business
		if len(list(set(lst).intersection(['Q45295908']))) > 0:
			return 'Q486972' #military unit
		if len(list(set(lst).intersection(['Q486972', 'Q3024240', 'Q164142']))) > 0:
			return 'Q486972' #human settlement
		if len(list(set(lst).intersection(['Q15815670', 'Q41397', 'Q188055', 'Q178561', 'Q124734', 'Q198', 'Q38723', 'Q18564543', 'Q831663']))) > 0:
			return 'Q15815670' #historical event
		if len(list(set(lst).intersection(['Q2385804', 'Q31855', 'Q3914', 'Q33506', 'Q50825046']))) > 0:
			return 'Q2385804' #educational institution
		if len(list(set(lst).intersection(['Q48204', 'Q847017']))) > 0:
			return 'Q48204' #association
		if len(list(set(lst).intersection(['Q43229', 'Q108696', 'Q294163', 'Q2385804', 'Q50825057', 'Q4686866', 'Q8425', 'Q719456']))) > 0:
			return 'Q43229' #organization
		if len(list(set(lst).intersection(['Q2472587', 'Q41710']))) > 0:
			return 'Q2472587' #people
		if len(list(set(lst).intersection(['Q133156', 'Q16917', 'Q4260475']))) > 0:
			return 'Q133156' # colony
		if len(list(set(lst).intersection(['Q618123', 'Q33837', 'Q133156', 'Q486972',  'Q41762037', 'Q6256', 'Q1306755', 'Q618123', 'Q190354', 'Q164142', 'Q7404467', 'Q748149', 'Q112099', 'Q486972', 'Q3624078', 'Q1402592', 'Q250811', 'Q183366', 'Q3024240']))) > 0:
			return 'Q618123' # 	geographical object
		if len(list(set(lst).intersection(['Q483394']))) > 0:
			return 'Q483394' # 	genre
		if len(list(set(lst).intersection(['Q82550', 'Q1002697', 'Q93288', 'Q8142', 'Q19832486','Q41298']))) > 0:
			return 'Q82550' #subject
		return ''

	def X_get_instance(self,instances):
		"""

		"""
		lst=[]
		l=instances.split('|')
		for instance in l:
			lst.append(instance[instance.rfind('/')+1:])
		
		if len(list(set(lst).intersection(["Q5"])))>0:
			return "Q5"  #Human
		if len(list(set(lst).intersection(["Q20746389","Q1564373"])))>0:	
			return "Q20746389"    # Mission
		if len(list(set(lst).intersection(["Q4830453"])))>0:
			return "Q4830453"  #Enterprise
		if len(list(set(lst).intersection(["Q327333"])))>0:	
			return "Q327333"    # Authority	
		if len(list(set(lst).intersection(["Q45295908"])))>0:	
			return "Q45295908"    # Military	
		if len(list(set(lst).intersection(["Q486972","Q3024240","Q164142"])))>0:	
			return "Q486972"    # Human Settlement	
		if len(list(set(lst).intersection(["Q15815670"])))>0:	
			return "Q15815670"    # Event				
		if len(list(set(lst).intersection(["Q133156"])))>0:	
			return "Q133156"    # colony		
		return ""



	def _get_from_WDQ(self,query):

		params={
				'format':"json",
				'query':query
				}
		url=WD_SPARQL_ENDPOINT +"?"+ urllib.parse.urlencode(params)
		headers={}
		headers['accept']='application/sparql-results+json'
		#print(url)
		r = urllib.request.Request(url, None, headers)
		with urllib.request.urlopen(r) as response:
			the_page = response.read().decode("utf-8")
			return json.loads(the_page)




geo=geoJSONizer()
geo.create_geoJSON()
