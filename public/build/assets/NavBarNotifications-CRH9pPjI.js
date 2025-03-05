import{P as w,a as z,f as b,o as c,e as s,b as t,q as A,aw as g,J as _,t as h,v as m,m as f,K as x,c as y,F as B,h as P,l as V,d as u,bp as U,x as I,a9 as M,r as $}from"./app-C-kY_QES.js";import{C as E}from"./vue3-perfect-scrollbar-B6YxKR1E.js";/* empty css                                                      */import{V as D}from"./VBadge-B6njBOSO.js";import{V as L}from"./VMenu-DtYnDZbz.js";import{V as q,a as F,b as j}from"./VCard-D_SmZesG.js";import{V as O}from"./VChip-C7viLQZA.js";import{V as Y}from"./VTooltip-BNpNnezH.js";import{V as C}from"./VDivider-1UjfaCgd.js";import{V as W,a as R,b as H}from"./VList-wNXBhO38.js";import{a as J,V as K}from"./VAvatar-S3JDAuYO.js";import{V as G}from"./VSpacer-BiBZMZMD.js";import{V as Q}from"./VCardText-B-LdIUAr.js";import"./forwardRefs-DfHN1W8t.js";import"./lazy-B-BCyeUq.js";/* empty css              */const X=p=>p?p.split(" ").map(i=>i.charAt(0).toUpperCase()).join(""):"",Z={class:"d-flex align-start gap-3"},ee={key:0},te={class:"text-sm font-weight-medium mb-1"},ae={class:"text-body-2 mb-2",style:{"letter-spacing":"0.4px !important","line-height":"18px"}},se={class:"text-sm text-disabled mb-0",style:{"letter-spacing":"0.4px !important","line-height":"18px"}},ie={class:"d-flex flex-column align-end"},oe={__name:"Notifications",props:{notifications:{type:Array,required:!0},badgeProps:{type:Object,required:!1,default:void 0},location:{type:null,required:!1,default:"bottom end"}},emits:["read","unread","remove","click:notification"],setup(p,{emit:n}){const i=p,d=n,v=w(()=>i.notifications.some(a=>a.isSeen===!1)),k=()=>{const a=i.notifications.map(l=>l.id);v.value?d("read",a):d("unread",a)},o=w(()=>i.notifications.filter(a=>a.isSeen===!1).length),r=(a,l)=>{a?d("unread",[l]):d("read",[l])};return(a,l)=>{const N=z("IconBtn");return c(),b(N,{id:"notification-btn"},{default:s(()=>[t(D,A(i.badgeProps,{"model-value":i.notifications.some(e=>!e.isSeen),color:"error",dot:"","offset-x":"2","offset-y":"3"}),{default:s(()=>[t(g,{icon:"tabler-bell"})]),_:1},16,["model-value"]),t(L,{activator:"parent",width:"380px",location:i.location,offset:"12px","close-on-content-click":!1},{default:s(()=>[t(q,{class:"d-flex flex-column"},{default:s(()=>[t(F,{class:"notification-section"},{append:s(()=>[_(t(O,{size:"small",color:"primary",class:"me-2"},{default:s(()=>[h(m(f(o))+" New ",1)]),_:1},512),[[x,i.notifications.some(e=>!e.isSeen)]]),_(t(N,{size:"34",onClick:k},{default:s(()=>[t(g,{size:"20",color:"high-emphasis",icon:f(v)?"tabler-mail-opened":"tabler-mail"},null,8,["icon"]),t(Y,{activator:"parent",location:"start"},{default:s(()=>[h(m(f(v)?"Mark all as read":"Mark all as unread"),1)]),_:1})]),_:1},512),[[x,i.notifications.length]])]),default:s(()=>[t(j,{class:"text-h6"},{default:s(()=>l[0]||(l[0]=[h(" Notifications ")])),_:1})]),_:1}),t(C),t(f(E),{options:{wheelPropagation:!1},style:{"max-block-size":"23.75rem"}},{default:s(()=>[t(W,{class:"notification-list rounded-0 py-0"},{default:s(()=>[(c(!0),y(B,null,P(i.notifications,(e,T)=>(c(),y(B,{key:e.title},[T>0?(c(),b(C,{key:0})):V("",!0),t(R,{link:"",lines:"one","min-height":"66px",class:"list-item-hover-class",onClick:S=>a.$emit("click:notification",e)},{default:s(()=>[u("div",Z,[t(J,{color:e.color&&!e.img?e.color:void 0,variant:e.img?void 0:"tonal"},{default:s(()=>[e.text?(c(),y("span",ee,m(("avatarText"in a?a.avatarText:f(X))(e.text)),1)):V("",!0),e.img?(c(),b(K,{key:1,src:e.img},null,8,["src"])):V("",!0),e.icon?(c(),b(g,{key:2,icon:e.icon},null,8,["icon"])):V("",!0)]),_:2},1032,["color","variant"]),u("div",null,[u("p",te,m(e.title),1),u("p",ae,m(e.subtitle),1),u("p",se,m(e.time),1)]),t(G),u("div",ie,[t(g,{size:"10",icon:"tabler-circle-filled",color:e.isSeen?"#a8aaae":"primary",class:I([`${e.isSeen?"visible-in-hover":""}`,"mb-2"]),onClick:U(S=>r(e.isSeen,e.id),["stop"])},null,8,["color","class","onClick"]),t(g,{size:"20",icon:"tabler-x",class:"visible-in-hover",onClick:S=>a.$emit("remove",e.id)},null,8,["onClick"])])])]),_:2},1032,["onClick"])],64))),128)),_(t(R,{class:"text-center text-medium-emphasis",style:{"block-size":"56px"}},{default:s(()=>[t(H,null,{default:s(()=>l[1]||(l[1]=[h("No Notification Found!")])),_:1})]),_:1},512),[[x,!i.notifications.length]])]),_:1})]),_:1}),t(C),_(t(Q,{class:"pa-4"},{default:s(()=>[t(M,{block:"",size:"small"},{default:s(()=>l[2]||(l[2]=[h(" View All Notifications ")])),_:1})]),_:1},512),[[x,i.notifications.length]])]),_:1})]),_:1},8,["location"])]),_:1})}}},le="/build/assets/avatar-3-BxDW4ia1.png",re="/build/assets/avatar-4-CtU30128.png",ne="/build/assets/avatar-5-CmycerLe.png",ce="/build/assets/paypal-rounded-DUgvboRY.png",Se={__name:"NavBarNotifications",setup(p){const n=$([{id:1,img:re,title:"Congratulation Flora! 🎉",subtitle:"Won the monthly best seller badge",time:"Today",isSeen:!0},{id:2,text:"Tom Holland",title:"New user registered.",subtitle:"5 hours ago",time:"Yesterday",isSeen:!1},{id:3,img:ne,title:"New message received 👋🏻",subtitle:"You have 10 unread messages",time:"11 Aug",isSeen:!0},{id:4,img:ce,title:"PayPal",subtitle:"Received Payment",time:"25 May",isSeen:!1,color:"error"},{id:5,img:le,title:"Received Order 📦",subtitle:"New order received from john",time:"19 Mar",isSeen:!0}]),i=o=>{n.value.forEach((r,a)=>{o===r.id&&n.value.splice(a,1)})},d=o=>{n.value.forEach(r=>{o.forEach(a=>{a===r.id&&(r.isSeen=!0)})})},v=o=>{n.value.forEach(r=>{o.forEach(a=>{a===r.id&&(r.isSeen=!1)})})},k=o=>{o.isSeen||d([o.id])};return(o,r)=>{const a=oe;return c(),b(a,{notifications:f(n),onRemove:i,onRead:d,onUnread:v,"onClick:notification":k},null,8,["notifications"])}}};export{Se as default};
