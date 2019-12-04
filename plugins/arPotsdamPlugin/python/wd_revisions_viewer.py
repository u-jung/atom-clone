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
import os
from datetime import datetime, timedelta
import sys

WD_HUMAN="Q5"	
WD_MISSION="Q20746389"
WD_ENTERPRISE="Q4830453"
WD_AUTHORITY="Q327333"
WD_MILITARY="Q45295908"
WD_SETTLEMENT="Q486972"
WD_EVENT="Q15815670"
WD_COLONY="Q133156"

class 	wd_revision_viewer():
	REVISIONS=[]
	WD_SPARQL_ENDPOINT = "https://query.wikidata.org/sparql"
	WD_API_ENDPOINT="https://www.wikidata.org/w/api.php"
	FILENAME="/usr/share/nginx/atom/plugins/arPotsdamPlugin/tmp/features.geojson"
	FILENAME="revisions.html"
	PROPERTIES={}
	PROPERTIES_FILE="/usr/share/nginx/atom/plugins/arPotsdamPlugin/python/properties.json"
	OBJECTS={}
	OBJECTS_FILE="objects.json"
	HTML_FILE="last_month.html"
	HTML_BASE="/usr/share/nginx/atom/plugins/arPotsdamPlugin/tmp/"
	COMMENTS={
			"clientsitelink-update":"Wikipediaseite verschoben ",
			"wbcreateclaim-create:1|":"Aussage erstellt ",
			"wbeditentity-update:0|":"Datenobjekt geändert",
			"wbeditentity-update":"Datenobjekt geändert (Sitelinks Update) ",
			"wbmergeitems-from:0":"Datenobjekt zusammengeführt von ",
			"wbremoveclaims-remove:1|":"Aussage gelöscht ",
			"wbsetaliases-remove:1":"Alias für eine Sprache entfernt",
			"wbsetclaim-create:2||1":"Qualifikator oder Fundstelle erstellt",
			"wbsetclaim-update:2||1|1":"Qualifikator oder Fundstelle aktualisiert ",
			"wbsetclaim-update:2||1|2":"Qualifikator oder Fundstelle aktualisiert ",
			"wbsetclaim-update:2||1":"Aussage aktualsiert ",
			"wbsetclaimvalue:1|":"‎Einen Aussagewert festgelegt ",
			"wbsetdescription-add:1|":"Beschreibung hinzugefügt ",
			"wbsetentity": "Neues Datenobjekt erzeugt ",
			"wbsetlabel-add:1|":"Bezeichnung geändert ",
			"wbsetreference": "Fundstelle festgelegt",
			"wbsetreference-add:2|":"‎Fundstelle der Aussage hinzugefügt ",
			"wbsetsitelink-add:1|":"Link zu Wikipedia-Seite hinzugefügt "
			}



	
	
	def __init__(self,timedelta):
		f=open(self.HTML_BASE+"revision.json", 'r') 
		self.REVISIONS=json.load(f)
		f.close()

		query='SELECT ?property  ?propertyLabel  WHERE {\
			  ?property wikibase:propertyType ?propertyType .\
			  SERVICE wikibase:label { bd:serviceParam wikibase:language "de,en". }\
			}\
			ORDER BY ASC(xsd:integer(STRAFTER(STR(?property), "P")))'
		l=self._get_from_WDQ(query)
		properties={}
		for r in l['results']['bindings']:
			k=r['property']['value'].replace("http://www.wikidata.org/entity/","")
			properties[k]=r['propertyLabel']['value']
		#print(properties)
		
		#self._open_properties()
		#print(self.PROPERTIES)
		self.PROPERTIES=properties
		self.timedelta=timedelta

	def _open_properties(self):
		
		if len(self.PROPERTIES.keys()) ==0:
			if os.path.isfile(self.PROPERTIES_FILE):
				with open(self.PROPERTIES_FILE, 'r') as file:
					self.PROPERTIES = json.load(file)
				file.close()	
	def _open_objects(self):
		if len(self.OBJECTS.keys()) ==0:
			if os.path.isfile(self.OBJECTS_FILE):
				with open(self.OBJECTS_FILE, 'r') as file:
					self.OBJECTS = json.load(file)
				file.close()
				
	def _store_objects(self):
		with open(self.OBJECTS_FILE, 'w') as file:
			file.write(json.dumps(self.OBJECTS, sort_keys=True, indent=4, ensure_ascii=False))
		file.close()		
		

	def _get_from_WDQ(self,query):

		params={
				'format':"json",
				'query':query
				}
		url=self.WD_SPARQL_ENDPOINT +"?"+ urllib.parse.urlencode(params)
		headers={}
		headers['accept']='application/sparql-results+json'
		#print(url)
		r = urllib.request.Request(url, None, headers)
		with urllib.request.urlopen(r) as response:
			the_page = response.read().decode("utf-8")
			return json.loads(the_page)

	def item_generator(self, N):
		print("TIME:",N)
		
		query='SELECT DISTINCT ?item ?itemLabel ?itemDescription ?d ?days where \
				{ ?item schema:dateModified ?d. \
				 bind(xsd:integer(now() - ?d) as ?days)\
				 filter(?days <= '+str(2)+')\
				 ?item (wdt:P17|wdt:P19|wdt:P20|wdt:P27|wdt:P36|wdt:P119|wdt:P131|wdt:P159|wdt:P180|wdt:P189|wdt:P276|wdt:P279|wdt:P291|wdt:P361|\
				wdt:P551|wdt:P740|wdt:P915|wdt:P840|wdt:P921|wdt:P937|\
				wdt:P1001|wdt:P1071|wdt:P1269|wdt:P1376|wdt:P1416|\
				wdt:P2341|wdt:P2541|wdt:P2647|wdt:P2650)/(wdt:P31*|wdt:P361*|wdt:P131*|wdt:P279*) wd:Q329618 . \
				SERVICE wikibase:label { bd:serviceParam wikibase:language "de,en,fr". } } order by ?itemLabel'
		l=self._get_from_WDQ(query)
		print (len(l['results']['bindings']), " items")
		#stop=input("stop")
		for e in l['results']['bindings']:
			if 'itemLabel' in e:
				itemLabel=e['itemLabel']['value']
			else:
				itemLabel=""
			if 'itemDescription' in e:
				itemDescription=e['itemDescription']['value']
			else:
				itemDescription=""
			yield (e['item']['value'],itemLabel,itemDescription)

	def get_revisions(self,timestamp,N):
		keys=("uri","l","d","t","u","c","p","pl","v","vl","i","a","b")
		for item in self.item_generator(N):
			
			params={
			"action":"query",
			"format":"json",
			"prop":"revisions",
			"titles":item[0][item[0].rfind("/")+1:],
			"formatversion":"2",
			"rvprop":"timestamp|user|comment|ids"  
			}
			if timestamp=="":
				params['rvlimit']='max'
			else:
				params['rvend']=timestamp
				
			url=self.WD_API_ENDPOINT +"?"+ urllib.parse.urlencode(params)
			print(url)
			headers={}
			#headers['accept']='application/sparql-results+json'
			req = urllib.request.Request(url, None, headers)
			with urllib.request.urlopen(req, timeout=30) as response:
				page = str(response.read(),'utf-8')
			
			#r=req.get(url)
			rjson=json.loads(page)
			print(rjson)
			if "revisions" not in rjson['query']['pages'][0]:
				continue
			predicates=[]
			
			for revision in rjson['query']['pages'][0]['revisions']:
				q_arr=re.findall(r'Q[0-9]*', revision['comment'])
				if len(q_arr)>0:
					predicates.append(q_arr[0])
			self.setObjectLabel(predicates)
			for revision in rjson['query']['pages'][0]['revisions']:
				rev=[item[0],item[1],item[2],revision['timestamp'],revision['user']]
				rev.extend(self.read_comment(revision['comment']))
				rev.append(revision['revid'])
				rev.append(re.split(' |-|:',rev[5])[1])
				if rev[4][-3:].lower()=="bot":
					rev.append(False)
				else:
					rev.append(True)
				print(rev)
				d={}
				for i  in range(0,len(rev)):
					d[keys[i]]=rev[i]
				if not(d['i'] in [x['i'] for x in self.REVISIONS] ):
					self.REVISIONS.append(d.copy())
				
				#print([item[0],item[1],item[2],self.read_comment(revision['comment']),revision['timestamp'],revision['user']])
				#print(self.read_comment(revision['comment']))
			self.REVISIONS=[x for x in self.REVISIONS if x['t']>=timestamp]
				
		self.json_out()
		self._store_objects()
		
	def json_out(self):
		with open(self.HTML_BASE+"revision.json", 'w') as file:
			file.write(json.dumps(sorted(self.REVISIONS, key = lambda k:k['t'], reverse=True), sort_keys=True, indent=4, ensure_ascii=False))
		file.close()
		
	def out(self):
		periode="..."
		html='<html></head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\
			<link media="all" href="/arPotsdamPlugin/css/min.css" rel="stylesheet" type="text/css" /></head><body><h1>Änderungen im Wikidata-Korpus seit' + periode + '</h1><dl>'
		if len(self.REVISIONS)>0:
			last_item=""
			for revision in self.REVISIONS:
				if revision[0][-3:].lower()=="bot":
					cl="bot"
				else:
					cl="non-bot"
				if revision[0]!=last_item:
					html +="\n<dt><strong>" + revision[1] + '</strong> (<a target="_blank" href="' +  revision[0] +'">'+revision[0]+'</a>) - <i>' + revision[2] +"</i></dt>"
				html+='\n<dd class"'+cl+'">'+revision[3]+'<br /><i>am: '+ revision[4] + '</i> von: '+revision[5]+'</dd>'
		with open("wd_change_"+str(self.timedelta)+"d.html", 'w') as file:
			file.write(html)
		file.close()
	
	def propertyLabel(self,p):
		
		if p in self.PROPERTIES:
			
			return self.PROPERTIES[p]
		else:
			return p
	
	
	def getObjectLabel(self, q):
		if q in self.OBJECTS:
			return self.OBJECTS[q]
		else:
			return q
					
	def setObjectLabel(self,predicates):
		if len(predicates)>0:
			query='select ?item ?itemLabel\
					where{\
					  bind(?i as ?item)\
					  values ?i {wd:'+(" wd:").join(predicates)+'}\
					   SERVICE wikibase:label { bd:serviceParam wikibase:language "de,en". }\
					  }'
			l=self._get_from_WDQ(query)
			for e in l['results']['bindings']:
				if 'itemLabel' in e:
					itemLabel=e['itemLabel']['value']
				else:
					itemLabel=e['item']['value']
				item=e['item']['value'][e['item']['value'].rfind("/")+1:]
				if  item not in self.OBJECTS:
					self.OBJECTS[item]=itemLabel
					print(item, itemLabel,"---")

	
	def read_comment(self,comment):
		
		r_arr=re.findall(r'\[Property:([^\]]*)\]',comment)
		if len(r_arr)>0:
			prop=r_arr[0]
			propLabel=self.propertyLabel(r_arr[0])
		else:
			prop=""
			propLabel=""
			
		r_arr=re.findall(r'\[(Q[^\]]*)\]',comment)
		if len(r_arr)>0:
			obj=r_arr[0]
			objLabel=self.getObjectLabel(r_arr[0])
			
		else:
			r_arr=re.findall(r':([^:]*)$',comment)
			if len(r_arr)>0:
				obj=""
				objLabel=r_arr[0]
			else:
				obj=""
				objLabel=""

		
		return (comment,prop,propLabel,obj,objLabel)
		
	def set_timestamp(self,dt)	:
		N=30
		
		d=datetime.now() - timedelta(days=N)
		return '{:{fmt}}'.format(d, fmt='%Y-%m-%dT%H:%M:%SZ')

	
		
N=int(sys.argv[1])
d=datetime.now() - timedelta(days=N)
d=datetime.now() - timedelta(days=90)
timestamp='{:{fmt}}'.format(d, fmt='%Y-%m-%dT%H:%M:%SZ')
wdrv=wd_revision_viewer(N)
#timestamp=wdrv.set_timestamp(timedelta)
wdrv.get_revisions(timestamp,N)
json.dumps(wdrv.REVISIONS, sort_keys=True, indent=4, ensure_ascii=False)






