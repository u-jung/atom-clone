(window.webpackJsonp=window.webpackJsonp||[]).push([[138],{373:function(e,t,n){"use strict";n.r(t);var a=n(5),r=n(4),o=n(107),s=n(38),w=n(10),c=n(223),i=n(87),l=n(22),m=n(2);const u=[[0,0],[4,2],[6,0],[10,5],[6,3],[4,5],[0,0]];let g;const p=function(e){return[e[0]*g,e[1]*g]},d={},b=new w.e({source:new l.b({url:"data/kml/2012_Earthquakes_Mag5.kml",format:new o.a({extractStyles:!1})}),style:function(e){const t=e.get("name"),n=parseFloat(t.substr(2)),a=parseInt(10+40*(n-5),10);g=a/10;let r=d[a];if(!r){const e=document.createElement("canvas"),t=Object(c.a)(e.getContext("2d"),{size:[a,a],pixelRatio:1});t.setStyle(new m.g({fill:new m.c({color:"rgba(255, 153, 0, 0.4)"}),stroke:new m.f({color:"rgba(255, 204, 0, 0.2)",width:2})})),t.drawGeometry(new s.b([u.map(p)])),r=new m.g({image:new m.d({img:e,imgSize:[a,a],rotation:1.2})}),d[a]=r}return r}}),f=new w.d({source:new i.a({layer:"toner"})});new a.a({layers:[f,b],target:"map",view:new r.a({center:[0,0],zoom:2})})}},[[373,0]]]);
//# sourceMappingURL=earthquake-custom-symbol.js.map