import{b0 as f,r as v,w as V,a as y,f as i,o as c,e as a,b as s,aw as b,m as n,d as g,v as d,bb as k,c as w,F as x,h as B,t as I}from"./app-B3I6Gn6w.js";import{V as S}from"./VTooltip-CLKMcUOe.js";import{V as T}from"./VMenu-DNY-0EPW.js";import{V as C,a as L,b as N}from"./VList-BXVPbkuE.js";import"./forwardRefs-CqTrOdMG.js";import"./lazy-CXxlMPyB.js";import"./VAvatar-C88WUKqv.js";import"./VDivider-C-gOVGMm.js";const z={class:"text-capitalize"},F={__name:"ThemeSwitcher",props:{themes:{type:Array,required:!0}},setup(l){const r=l,t=f(),o=v([t.theme]);return V(()=>t.theme,()=>{o.value=[t.theme]},{deep:!0}),(m,p)=>{const h=y("IconBtn");return c(),i(h,{color:"rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))"},{default:a(()=>{var u;return[s(b,{icon:(u=r.themes.find(e=>e.name===n(t).theme))==null?void 0:u.icon},null,8,["icon"]),s(S,{activator:"parent","open-delay":"1000","scroll-strategy":"close"},{default:a(()=>[g("span",z,d(n(t).theme),1)]),_:1}),s(T,{activator:"parent",offset:"12px",width:180},{default:a(()=>[s(C,{selected:n(o),"onUpdate:selected":p[0]||(p[0]=e=>k(o)?o.value=e:null),mandatory:""},{default:a(()=>[(c(!0),w(x,null,B(r.themes,({name:e,icon:_})=>(c(),i(L,{key:e,value:e,"prepend-icon":_,color:"primary",onClick:()=>{n(t).theme=e}},{default:a(()=>[s(N,{class:"text-capitalize"},{default:a(()=>[I(d(e),1)]),_:2},1024)]),_:2},1032,["value","prepend-icon","onClick"]))),128))]),_:1},8,["selected"])]),_:1})]}),_:1})}}},j={__name:"NavbarThemeSwitcher",setup(l){const r=[{name:"light",icon:"tabler-sun-high"},{name:"dark",icon:"tabler-moon-stars"},{name:"system",icon:"tabler-device-desktop-analytics"}];return(t,o)=>{const m=F;return c(),i(m,{themes:r})}}};export{j as default};
