(this.webpackJsonproot=this.webpackJsonproot||[]).push([[13],{818:function(t,e,a){"use strict";a.r(e);var s=a(15),n=a(12),c=a(0),l=a.n(c),i=a(24),r=a(80),o=a(59),d=a(32),u=a(65),h=a(39),b=a(38),p=a(795),m=a(14);var O={configureDataTable:({data:t,tcs:e,labels:a,thresholds:s,typeTag:n="tagCliente"})=>{if(t)switch(Object(m.F)({data:t,labels:a,typeTag:n,thresholds:s}),e){case"3":case"4":return Object(m.F)({data:t,labels:a,typeTag:n,thresholds:s});default:return null}return null},configureDataTablePems:({data:t,tcs:e,labels:a,thresholds:s,typeTag:n="tagCliente"})=>{if(t)switch(e){case"3":case"4":return Object(m.G)({data:t,labels:a,typeTag:n,thresholds:s});default:return null}return null}};var g=t=>{switch(m.B[t]){case"IS":return O;default:return null}};function f(t){const e=t.stations,a=t.match,c=t.title,r=t.login,d=t.dispatchConnectionMQTT,u=t.keyTopik,h=t.labels,b=t.dispatchGetLabels,O=t.dispatchCheckOldData,f=t.dispatchGetthresholds,j=t.thresholds,S=t.dispatchEditthresholds,y=t.statusResponse,T=t.dispatchresetResetStatusResponseThresholds,v=a.params.idtcs,k=a.params.id,D=Object(m.J)(null),E=Object(n.a)(D,2),C=E[0],N=E[1],J=l.a.useState(null),L=Object(n.a)(J,2),R=L[0],w=L[1],A=l.a.useState(null),B=Object(n.a)(A,2),M=B[0],I=B[1],G=l.a.useState(!1),_=Object(n.a)(G,2),z=_[0],q=_[1],x=l.a.useState(!1),F=Object(n.a)(x,2),P=F[0],Q=F[1],H=l.a.useState(null),K=Object(n.a)(H,2),U=K[0],V=K[1],W=l.a.useState(null),X=Object(n.a)(W,2),Y=X[0],Z=X[1],$=l.a.useState(null),tt=Object(n.a)($,2),et=tt[0],at=tt[1],st=l.a.useState(null),nt=Object(n.a)(st,2),ct=nt[0],lt=nt[1],it=l.a.useState(null),rt=Object(n.a)(it,2),ot=rt[0],dt=rt[1],ut=l.a.useState(null),ht=Object(n.a)(ut,2),bt=ht[0],pt=ht[1];l.a.useEffect(()=>{if(k!==M||v!==R){w(v),I(k),at(null),lt(null),dt(null),V(null),Z(null),Q(!1),q(!1),O(k,v);let t=setInterval(()=>{O(M,R)},m.e.checkOld5Time);pt(t)}return()=>clearInterval(bt)},[v,k,M,R,bt,pt,O]),l.a.useEffect(()=>{m.B[M]&&m.B[M]!==u&&r.ridp&&d(r.ridp,m.B[M])},[M,u,r.ridp,d]),l.a.useEffect(()=>{if(M&&m.B[M]&&R){const t=Object(m.m)(h,M,R,"pems"),e=Object(m.m)(h,M,R,"sidebar_dx"),a=t&&[...t.tagList.map(t=>{const e=Object(s.a)({},t);return e.tagAcn="".concat(R,"_").concat(t.tagAcn),e}),...e.tagList];if(t){if(JSON.stringify(t)!==JSON.stringify(et)&&at(t),JSON.stringify(e)!==JSON.stringify(ct)&&lt(e),JSON.stringify(ot)!==JSON.stringify(a)){dt(a);const t=a.filter(t=>"1A"!==t.uom).map(t=>t.tagAcn);f({station:m.B[M],tags:t})}}else b({station:m.B[M],idTC:R})}},[h,M,R,et,ct,ot,b,f]),l.a.useEffect(()=>{const t=Object(m.p)(e,M),a=Object(m.r)(e,M,R);a&&N({tcName:a?a.name:"",tcData:a,station:t})},[e,M,R,et,N]),l.a.useEffect(()=>(document.body.addEventListener("keydown",t=>mt(t)),()=>document.body.removeEventListener("keydown",t=>mt(t))),[]),l.a.useEffect(()=>{j&&JSON.stringify(j)!==JSON.stringify(Y)&&Z(j)},[j,Y]);const mt=t=>{27===t.keyCode&&(document.querySelector(".show.modal-thresholds")?Q(!1):q(!1))},Ot=C.stationData?C.stationData.name:"",gt=C.turbochargerName?C.turbochargerName:"";let ft=Object(m.A)(M)&&g(M);const jt=[{key:"filters",onClick:()=>q(!z)}],St=Object(m.h)({key:"pems",title:c,url:a.url,nameStation:Ot,nameTCS:gt,currentStationId:M,currentTurbochargerId:R});return l.a.createElement(p.k,{stations:e,pageCurrent:a,stationActive:M,tcsActive:R,pathsMenu:[{key:"panoramicaTcs",title:l.a.createElement(i.a,{id:"panoramica_tc"}),url:"/panoramicaStazione/".concat(M,"/panoramicaTCS/").concat(R),active:!1},{key:"trend",title:l.a.createElement(i.a,{id:"trend"}),url:"/panoramicaStazione/".concat(M,"/panoramicaTCS/").concat(R,"/trend"),active:!1},{key:"avvisiTcs",title:l.a.createElement(i.a,{id:"avvisi"}),url:"/panoramicaStazione/".concat(M,"/panoramicaTCS/").concat(R,"/avvisi"),active:!1}],accordionMenu:m.e.urlAccordionMenu(M,R)},l.a.createElement(o.f,null,l.a.createElement("div",{className:"dflex"},l.a.createElement(o.e,{paths:St})),l.a.createElement(o.b,{icons:jt})),ft?l.a.createElement(p.g,{accordionData:[Object(m.n)(C.stationData&&C.stationData.data,ct&&ct.environmentData,ct&&ct.tagList,"environment",Y),Object(m.n)(C.stationData&&C.stationData.data,ct&&ct.tcsData,ct&&ct.tagList,"tc",Y),Object(m.n)(C.stationData&&C.stationData.data,ct&&ct.cemsData,ct&&ct.tagList,"cems",Y),Object(m.n)(C.stationData&&C.stationData.data,ct&&ct.gasData,ct&&ct.tagList,"gas",Y)],isThresholds:z,changeOpenModal:t=>{t.split("_").length>1?V(t):V("".concat(R,"_").concat(t)),Q(!P)}},l.a.createElement(p.l,{labels:et,data:C.stationData&&C.stationData.data,configurations:g(M),stationId:M,turbochargerId:R})):l.a.createElement(o.t,null),l.a.createElement(p.j,{showModal:P,closeModal:Q,onSave:t=>{const e={station:m.B[M],tags:[t.tag]};S(e,[t])},statusResponse:y,resetResponseApi:()=>T(),userRole:r.role,searchTag:U,thresholds:Y,labels:ot}))}f.defaultProps={stations:[]};e.default=Object(r.b)(t=>({keyTopik:t.mqtt.keyTopik,labels:t.labels.labels,thresholds:t.thresholds.thresholds,statusResponse:t.thresholds.statusResponse}),t=>({dispatchConnectionMQTT:(e,a)=>t(Object(d.j)(e,a)),dispatchGetLabels:e=>t(Object(u.d)(e)),dispatchCheckOldData:(e,a)=>t(Object(h.g)(e,a)),dispatchGetthresholds:e=>t(Object(b.j)(e)),dispatchEditthresholds:(e,a)=>t(Object(b.i)(e,a)),dispatchresetResetStatusResponseThresholds:()=>t(Object(b.k)())}))(f)}}]);