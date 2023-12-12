"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[518],{4518:function(e,i,n){n.r(i),n.d(i,{default:function(){return p}});var s=n(4165),l=n(5861),d=n(9439),a=n(2791),c=n(8511),t=n(1087),r=n(5403),o=n(184),v=function(e){var i=e.departments;return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("div",{className:"row mx-0",children:null===i||void 0===i?void 0:i.map((function(e,i){var n,s,l,d,a,v,m,u,h,x,j,p;return(0,o.jsx)("div",{className:"col-lg-6 col-md-10",children:(0,o.jsx)("div",{className:"card p-2 department-card",children:(0,o.jsxs)("div",{className:"d-flex align-items-center",children:[(0,o.jsx)("div",{className:"image",children:(0,o.jsx)("img",{src:null!==e&&void 0!==e&&null!==(n=e.organizationId)&&void 0!==n&&null!==(s=n.doctor)&&void 0!==s&&s.doctorPhoto?(0,r.a9)(null===e||void 0===e||null===(l=e.organizationId)||void 0===l||null===(d=l.doctor)||void 0===d?void 0:d.doctorPhoto):c,className:"rounded department-card-image",alt:""})}),(0,o.jsxs)("div",{className:"departments-details ",children:[(0,o.jsxs)("h5",{className:"mb-0 mt-0 department-card-name",children:[(0,o.jsxs)("h5",{className:"mb-0 department-card-name",children:[(0,o.jsx)("span",{className:"text-dark mb-0 "})," ",null===e||void 0===e||null===(a=e.organizationId)||void 0===a||null===(v=a.doctor)||void 0===v?void 0:v.name]}),(0,o.jsxs)("span",{style:{fontSize:"15px"},className:"mb-0",children:["Dept. \xa0",null===e||void 0===e||null===(m=e.organizationId)||void 0===m?void 0:m.name]})]}),(0,o.jsx)("span",{children:null!==e&&void 0!==e&&null!==(u=e.organizationId)&&void 0!==u&&u.specialization?null===e||void 0===e||null===(h=e.organizationId)||void 0===h||null===(x=h.specialization)||void 0===x?void 0:x.map((function(e){return e.name})):"-"}),(0,o.jsx)("br",{}),(0,o.jsxs)("span",{children:[" Room No: ",null===e||void 0===e||null===(j=e.organizationId)||void 0===j?void 0:j.room]}),(0,o.jsx)("div",{className:"color-primary mt-2 d-flex flex-row align-items-center",children:(0,o.jsx)(t.rU,{className:"btn btn btn-secondary",to:"/department-detail/".concat(null===e||void 0===e||null===(p=e.organizationId)||void 0===p?void 0:p._id),children:"View Details"})})]})]})})},i)}))})})},m=n(9806),u=n(1632),h=n(7689),x=n(6148),j=(n(7151),n(6722)),p=function(){var e,i,n,c=(0,a.useState)({}),t=(0,d.Z)(c,2),p=t[0],N=t[1],f=(0,a.useState)([]),g=(0,d.Z)(f,2),b=g[0],w=g[1],y=(0,a.useState)([]),z=(0,d.Z)(y,2),Z=z[0],k=z[1],I=(0,h.UO)();(0,a.useEffect)((function(){O(),S()}),[I.id]);var S=function(){var e=(0,l.Z)((0,s.Z)().mark((function e(){var i,n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.be.get("/notice/".concat(I.id));case 3:i=e.sent,n=i.data,k(null===n||void 0===n?void 0:n.notices),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),O=function(){var e=(0,l.Z)((0,s.Z)().mark((function e(){var i,n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.be.get("/hospital-details/".concat(I.id));case 3:i=e.sent,n=i.data,console.log(null===n||void 0===n?void 0:n.details),N(null===n||void 0===n?void 0:n.details),w(null===n||void 0===n?void 0:n.departments),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return(0,o.jsxs)(j.Z,{className:"mt-35vh bg-white curved-top ",children:[(0,o.jsx)("div",{className:"clinic-image w-100",children:(0,o.jsx)("img",{src:null!==p&&void 0!==p&&p.photo?(0,r.a9)(null===p||void 0===p?void 0:p.photo):x.v3,width:"100%",height:"100%"})}),(0,o.jsxs)("section",{className:"clinic-info-card",children:[(0,o.jsx)("h4",{className:"my-3",children:null===p||void 0===p?void 0:p.name}),(0,o.jsxs)("div",{className:"bg-light p-3 curved",children:[(0,o.jsx)("h6",{children:"Specialization"}),(0,o.jsx)("div",{className:"d-flex justify-content-between align-items-center mb-3",children:(0,o.jsx)("div",{className:"d-flex flex-wrap",children:(null===p||void 0===p||null===(e=p.specialization)||void 0===e?void 0:e.map((function(e){return(0,o.jsx)("div",{className:"service-tube m-1 text-success bg-white",children:e.name})})))||"Specialization"})}),(0,o.jsxs)("h6",{children:["Consultation Fee: ",(0,o.jsxs)("span",{className:"text-success",children:["\xa0\xa0\u20b9",null===p||void 0===p?void 0:p.fee]})]}),(0,o.jsx)("h6",{children:"Services"}),(0,o.jsx)("div",{class:"d-flex flex-wrap",children:(null===p||void 0===p||null===(i=p.services)||void 0===i?void 0:i.length)>0&&(null===p||void 0===p||null===(n=p.services)||void 0===n?void 0:n.map((function(e){return(0,o.jsx)("div",{class:"service-tube m-1 bg-white",children:null===e||void 0===e?void 0:e.name})})))}),(0,o.jsx)("h6",{className:"mt-3",children:"Important Notice"}),(0,o.jsx)("div",{className:"bg-white curved p-3",children:(null===Z||void 0===Z?void 0:Z.length)>0?Z.map((function(e){return(0,o.jsxs)("div",{className:"notice my-2",children:[(0,o.jsx)("h6",{children:e.title}),(0,o.jsx)("p",{className:"mb-0 text-danger",children:e.description})]})})):(0,o.jsx)("div",{children:(0,o.jsx)("h6",{className:"text-muted",children:"No Data"})})})]})]}),(0,o.jsx)("section",{className:"row mx-0",children:(0,o.jsx)("div",{className:"col-md-8 px-0",children:b.length>0&&(0,o.jsx)(v,{departments:b})})}),(0,o.jsx)("section",{className:"text-center m-2",children:(0,o.jsx)("div",{className:"pr-2 m-text",children:(0,o.jsxs)("table",{className:"table  table-bordered",children:[(0,o.jsx)("thead",{className:"thead-light",children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Session"}),(0,o.jsx)("th",{children:"Open"}),(0,o.jsx)("th",{children:"Close"})]})}),(0,o.jsx)("tbody",{children:Object.entries(x.vr).map((function(e){var i=(0,d.Z)(e,2);return function(e,i){var n,s=null===p||void 0===p||null===(n=p.timing)||void 0===n?void 0:n.find((function(i){return i.day===e}));return(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:i}),(0,o.jsx)("td",{children:(0,r.YZ)(null===s||void 0===s?void 0:s.open)}),(0,o.jsx)("td",{children:(0,r.YZ)(null===s||void 0===s?void 0:s.close)})]})}(i[0],i[1])}))})]})})}),(0,o.jsxs)("section",{className:" bg-primary curved p-2 m-2 ",children:[(0,o.jsxs)("div",{className:"d-flex my-2 bg-white p-2 curved align-items-center",children:[(0,o.jsx)(m.G,{className:"mx-3",icon:u.opg}),(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{className:"mb-0",children:"Our Address"}),(0,o.jsx)("p",{className:"mb-0",children:null===p||void 0===p?void 0:p.address})]})]}),(0,o.jsxs)("div",{className:"d-flex my-2 bg-white p-2 curved align-items-center",children:[(0,o.jsx)(m.G,{className:"mx-3",icon:u.j1w}),(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{className:"mb-0",children:"Our Phone"}),(0,o.jsx)("p",{className:"mb-0",children:(0,r.CN)(null===p||void 0===p?void 0:p.phone)})]})]}),(0,o.jsxs)("div",{className:"d-flex my-2 bg-white p-2 curved align-items-center",children:[(0,o.jsx)(m.G,{className:"mx-3",icon:u.FU$}),(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{className:"mb-0",children:"Our Email"}),(0,o.jsx)("p",{className:"mb-0",children:null===p||void 0===p?void 0:p.email})]})]})]})]})}}}]);
//# sourceMappingURL=518.cca6c6f1.chunk.js.map