(window.webpackJsonp=window.webpackJsonp||[]).push([[154],{234:function(e,n,t){var r=t(390);e.exports=function(e,n){Array.isArray(n)||(n=[]),e.length>0&&n.push(r([0,0],e[0]));for(var t=0;t<e.length-1;t++){var o=e[t],a=e[t+1],s=o[0],u=o[1],c=a[0],i=a[1],p=[.75*s+.25*c,.75*u+.25*i],w=[.25*s+.75*c,.25*u+.75*i];n.push(p),n.push(w)}return e.length>1&&n.push(r([0,0],e[e.length-1])),n}},390:function(e,n){e.exports=function(e,n){return e[0]=n[0],e[1]=n[1],e}},391:function(e,n,t){"use strict";t.r(n);var r=t(5),o=t(4),a=t(10),s=t(16),u=t(101),c=t(234),i=t.n(c);const p=new s.n({}),w=new r.a({layers:[new a.d({source:new s.f,opacity:.5}),new a.e({source:p})],target:"map",view:new o.a({center:[1078373.595,6871994.591],zoom:5})}),d=document.getElementById("shall-smoothen"),h=document.getElementById("iterations"),f=new u.c({source:p,type:"LineString"});w.addInteraction(f),f.on("drawend",function(e){if(!d.checked)return;const n=e.feature.getGeometry(),t=function(e,n){for(n=Math.min(Math.max(n,1),10);n>0;)e=i()(e),n--;return e}(n.getCoordinates(),parseInt(h.value,10)||5);n.setCoordinates(t)})}},[[391,0]]]);
//# sourceMappingURL=chaikin.js.map