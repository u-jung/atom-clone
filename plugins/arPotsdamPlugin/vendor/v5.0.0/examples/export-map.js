(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{371:function(n,o,e){"use strict";e.r(o);var t=e(5),a=e(4),s=e(24),c=e(44),r=e(10),i=e(16);const p=new t.a({layers:[new r.d({source:new i.f}),new r.e({source:new i.n({url:"data/geojson/countries.geojson",format:new c.a})})],target:"map",controls:Object(s.h)({attributionOptions:{collapsible:!1}}),view:new a.a({center:[0,0],zoom:2})});document.getElementById("export-png").addEventListener("click",function(){p.once("postcompose",function(n){const o=n.context.canvas;navigator.msSaveBlob?navigator.msSaveBlob(o.msToBlob(),"map.png"):o.toBlob(function(n){saveAs(n,"map.png")})}),p.renderSync()})}},[[371,0]]]);
//# sourceMappingURL=export-map.js.map