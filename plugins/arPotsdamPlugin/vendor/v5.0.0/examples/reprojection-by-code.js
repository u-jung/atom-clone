(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{300:function(e,n,t){"use strict";t.r(n);var o=t(5),c=t(4),s=t(3),i=t(11),r=t(7),u=t(120),l=t(19),a=t(65),f=t(70);const g=new o.a({layers:[new i.a({source:new l.b})],target:"map",view:new c.a({projection:"EPSG:3857",center:[0,0],zoom:1})}),d=document.getElementById("epsg-query"),h=document.getElementById("epsg-search"),p=document.getElementById("epsg-result"),w=document.getElementById("render-edges");function m(e,n,t,o){if(null===e||null===n||null===t||null===o)return p.innerHTML="Nothing usable found, using EPSG:3857...",void g.setView(new c.a({projection:"EPSG:3857",center:[0,0],zoom:1}));p.innerHTML="("+e+") "+n;const i="EPSG:"+e;f.a.defs(i,t),Object(u.a)(f.a);const l=Object(r.h)(i),a=Object(r.j)("EPSG:4326",l),d=Object(s.a)([o[1],o[2],o[3],o[0]],a);l.setExtent(d);const h=new c.a({projection:l});g.setView(h),h.fit(d)}h.onclick=function(e){!function(e){p.innerHTML="Searching ...",fetch("https://epsg.io/?format=json&q="+e).then(function(e){return e.json()}).then(function(e){const n=e.results;if(n&&n.length>0)for(let e=0,t=n.length;e<t;e++){const t=n[e];if(t){const e=t.code,n=t.name,o=t.proj4,c=t.bbox;if(e&&e.length>0&&o&&o.length>0&&c&&4==c.length)return void m(e,n,o,c)}}m(null,null,null,null)})}(d.value),e.preventDefault()},w.onchange=function(){g.getLayers().forEach(function(e){if(e instanceof i.a){const n=e.getSource();n instanceof a.a&&n.setRenderReprojectionEdges(w.checked)}})}}},[[300,0]]]);
//# sourceMappingURL=reprojection-by-code.js.map