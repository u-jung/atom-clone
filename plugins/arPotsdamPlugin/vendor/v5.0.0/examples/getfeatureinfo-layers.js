(window.webpackJsonp=window.webpackJsonp||[]).push([[121],{356:function(e,t,n){"use strict";n.r(t);var r=n(188);fetch("data/wmsgetfeatureinfo/osm-restaurant-hotel.xml").then(function(e){return e.text()}).then(function(e){const t=(new r.a).readFeatures(e);document.getElementById("all").innerText=t.length.toString();const n=new r.a({layers:["hotel"]}).readFeatures(e);document.getElementById("hotel").innerText=n.length.toString();const a=new r.a({layers:["restaurant"]}).readFeatures(e);document.getElementById("restaurant").innerText=a.length.toString()})}},[[356,0]]]);
//# sourceMappingURL=getfeatureinfo-layers.js.map