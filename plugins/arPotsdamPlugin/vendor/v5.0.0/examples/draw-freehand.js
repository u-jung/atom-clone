(window.webpackJsonp=window.webpackJsonp||[]).push([[142],{377:function(e,n,o){"use strict";o.r(n);var t=o(5),a=o(4),c=o(101),w=o(10),r=o(16);const u=new w.d({source:new r.f}),s=new r.n({wrapX:!1}),i=new w.e({source:s}),p=new t.a({layers:[u,i],target:"map",view:new a.a({center:[-11e6,46e5],zoom:4})}),d=document.getElementById("type");let f;function l(){"None"!==d.value&&(f=new c.c({source:s,type:d.value,freehand:!0}),p.addInteraction(f))}d.onchange=function(){p.removeInteraction(f),l()},l()}},[[377,0]]]);
//# sourceMappingURL=draw-freehand.js.map