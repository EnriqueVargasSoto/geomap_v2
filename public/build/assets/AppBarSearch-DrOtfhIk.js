import{L as K,M as z,Q as M,r as w,aL as O,aZ as H,w as D,N as j,q as S,b as r,c6 as W,aX as Q,aU as X,ap as J,ac as Z,aA as G,aj as Y,ay as ee,bu as te,P as ae,bN as se,aD as ne,ae as le,aH as oe,cr as re,f as ie,o as k,e as m,cs as C,m as v,bb as ce,d as g,aw as E,J as P,c as B,l as R,z as x,K as _,F as A,h as T,t as ue,v as $}from"./app-B3I6Gn6w.js";import{C as de}from"./vue3-perfect-scrollbar-CQ6VCf6J.js";import{_ as fe}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{V as me}from"./VCard-lN0AGtO-.js";import{V as F}from"./VCardText-CiPrMgC8.js";import{a as ve}from"./VTextField-nIffNosU.js";import{V as ge}from"./VDivider-C-gOVGMm.js";import{V as pe,a as he}from"./VList-BXVPbkuE.js";import{u as be,V as I,f as ye,b as Ve,d as ke}from"./forwardRefs-CqTrOdMG.js";import"./VAvatar-C88WUKqv.js";import"./VInput-BYPdfyFM.js";import"./lazy-CXxlMPyB.js";const xe=z({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...Ve({origin:"center center",scrollStrategy:"block",transition:{component:ke},zIndex:2400})},"VDialog"),we=K()({name:"VDialog",props:xe(),emits:{"update:modelValue":e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,i){let{emit:a,slots:d}=i;const p=M(e,"modelValue"),{scopeId:y}=be(),s=w();function b(n){var l,o;const u=n.relatedTarget,t=n.target;if(u!==t&&((l=s.value)!=null&&l.contentEl)&&((o=s.value)!=null&&o.globalTop)&&![document,s.value.contentEl].includes(t)&&!s.value.contentEl.contains(t)){const f=W(s.value.contentEl);if(!f.length)return;const V=f[0],q=f[f.length-1];u===V?q.focus():V.focus()}}O(()=>{document.removeEventListener("focusin",b)}),H&&D(()=>p.value&&e.retainFocus,n=>{n?document.addEventListener("focusin",b):document.removeEventListener("focusin",b)},{immediate:!0});function c(){var n;a("afterEnter"),(n=s.value)!=null&&n.contentEl&&!s.value.contentEl.contains(document.activeElement)&&s.value.contentEl.focus({preventScroll:!0})}function h(){a("afterLeave")}return D(p,async n=>{var u;n||(await Q(),(u=s.value.activatorEl)==null||u.focus({preventScroll:!0}))}),j(()=>{const n=I.filterProps(e),u=S({"aria-haspopup":"dialog"},e.activatorProps),t=S({tabindex:-1},e.contentProps);return r(I,S({ref:s,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},n,{modelValue:p.value,"onUpdate:modelValue":l=>p.value=l,"aria-modal":"true",activatorProps:u,contentProps:t,height:e.fullscreen?void 0:e.height,width:e.fullscreen?void 0:e.width,maxHeight:e.fullscreen?void 0:e.maxHeight,maxWidth:e.fullscreen?void 0:e.maxWidth,role:"dialog",onAfterEnter:c,onAfterLeave:h},y),{activator:d.activator,default:function(){for(var l=arguments.length,o=new Array(l),f=0;f<l;f++)o[f]=arguments[f];return r(X,{root:"VDialog"},{default:()=>{var V;return[(V=d.default)==null?void 0:V.call(d,...o)]}})}})}),ye({},s)}}),Se={actions:"button@2",article:"heading, paragraph",avatar:"avatar",button:"button",card:"image, heading","card-avatar":"image, list-item-avatar",chip:"chip","date-picker":"list-item, heading, divider, date-picker-options, date-picker-days, actions","date-picker-options":"text, avatar@2","date-picker-days":"avatar@28",divider:"divider",heading:"heading",image:"image","list-item":"text","list-item-avatar":"avatar, text","list-item-two-line":"sentences","list-item-avatar-two-line":"avatar, sentences","list-item-three-line":"paragraph","list-item-avatar-three-line":"avatar, paragraph",ossein:"ossein",paragraph:"text@3",sentences:"text@2",subtitle:"text",table:"table-heading, table-thead, table-tbody, table-tfoot","table-heading":"chip, text","table-thead":"heading@6","table-tbody":"table-row-divider@6","table-row-divider":"table-row, divider","table-row":"text@6","table-tfoot":"text@2, avatar@2",text:"text"};function De(e){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return r("div",{class:["v-skeleton-loader__bone",`v-skeleton-loader__${e}`]},[i])}function N(e){const[i,a]=e.split("@");return Array.from({length:a}).map(()=>L(i))}function L(e){let i=[];if(!e)return i;const a=Se[e];if(e!==a){if(e.includes(","))return U(e);if(e.includes("@"))return N(e);a.includes(",")?i=U(a):a.includes("@")?i=N(a):a&&i.push(L(a))}return[De(e,i)]}function U(e){return e.replace(/\s/g,"").split(",").map(L)}const Le=z({boilerplate:Boolean,color:String,loading:Boolean,loadingText:{type:String,default:"$vuetify.loading"},type:{type:[String,Array],default:"ossein"},...oe(),...le(),...ne()},"VSkeletonLoader"),Ee=K()({name:"VSkeletonLoader",props:Le(),setup(e,i){let{slots:a}=i;const{backgroundColorClasses:d,backgroundColorStyles:p}=J(Z(e,"color")),{dimensionStyles:y}=G(e),{elevationClasses:s}=Y(e),{themeClasses:b}=ee(e),{t:c}=te(),h=ae(()=>L(se(e.type).join(",")));return j(()=>{var t;const n=!a.default||e.loading,u=e.boilerplate||!n?{}:{ariaLive:"polite",ariaLabel:c(e.loadingText),role:"alert"};return r("div",S({class:["v-skeleton-loader",{"v-skeleton-loader--boilerplate":e.boilerplate},b.value,d.value,s.value],style:[p.value,n?y.value:{}]},u),[n?h.value:(t=a.default)==null?void 0:t.call(a)])}),{}}}),Pe={class:"d-flex align-center text-high-emphasis me-1"},Be={class:"d-flex align-start"},_e={class:"h-100"},Ae={class:"h-100"},Ce={class:"app-bar-search-suggestions d-flex flex-column align-center justify-center text-high-emphasis pa-12"},Re={class:"d-flex align-center flex-wrap justify-center gap-2 text-h5 mt-3"},Te={__name:"AppBarSearch",props:{isDialogVisible:{type:Boolean,required:!0},searchResults:{type:Array,required:!0},isLoading:{type:Boolean,required:!1}},emits:["update:isDialogVisible","search"],setup(e,{emit:i}){const a=e,d=i,{ctrl_k:p,meta_k:y}=re({passive:!1,onEventFired(t){t.ctrlKey&&t.key==="k"&&t.type==="keydown"&&t.preventDefault()}}),s=w(),b=w(),c=w("");D([p,y],()=>{d("update:isDialogVisible",!0)});const h=()=>{c.value="",d("update:isDialogVisible",!1)},n=t=>{var l,o;t.key==="ArrowDown"?(t.preventDefault(),(l=s.value)==null||l.focus("next")):t.key==="ArrowUp"&&(t.preventDefault(),(o=s.value)==null||o.focus("prev"))},u=t=>{c.value="",d("update:isDialogVisible",t)};return D(()=>a.isDialogVisible,()=>{c.value=""}),(t,l)=>(k(),ie(we,{"max-width":"600","model-value":a.isDialogVisible,height:t.$vuetify.display.smAndUp?"531":"100%",fullscreen:t.$vuetify.display.width<600,class:"app-bar-search-dialog","onUpdate:modelValue":u,onKeyup:C(h,["esc"])},{default:m(()=>[r(me,{height:"100%",width:"100%",class:"position-relative"},{default:m(()=>[r(F,{class:"px-4",style:{"padding-block":"1rem 1.2rem"}},{default:m(()=>[r(ve,{ref_key:"refSearchInput",ref:b,modelValue:v(c),"onUpdate:modelValue":[l[0]||(l[0]=o=>ce(c)?c.value=o:null),l[1]||(l[1]=o=>t.$emit("search",v(c)))],autofocus:"",density:"compact",variant:"plain",class:"app-bar-search-input",onKeyup:C(h,["esc"]),onKeydown:n},{"prepend-inner":m(()=>[g("div",Pe,[r(E,{size:"24",icon:"tabler-search"})])]),"append-inner":m(()=>[g("div",Be,[g("div",{class:"text-base text-disabled cursor-pointer me-3",onClick:h}," [esc] "),r(E,{icon:"tabler-x",size:"24",onClick:h})])]),_:1},8,["modelValue"])]),_:1}),r(ge),r(v(de),{options:{wheelPropagation:!1,suppressScrollX:!0},class:"h-100"},{default:m(()=>[P(g("div",_e,[x(t.$slots,"suggestions",{},void 0,!0)],512),[[_,!!a.searchResults&&!v(c)&&t.$slots.suggestions]]),e.isLoading?R("",!0):(k(),B(A,{key:0},[P(r(v(pe),{ref_key:"refSearchList",ref:s,density:"compact",class:"app-bar-search-list py-0"},{default:m(()=>[(k(!0),B(A,null,T(a.searchResults,o=>x(t.$slots,"searchResult",{key:o,item:o},()=>[r(v(he),null,{default:m(()=>[ue($(o),1)]),_:2},1024)],!0)),128))]),_:3},512),[[_,v(c).length&&!!a.searchResults.length]]),P(g("div",Ae,[x(t.$slots,"noData",{},()=>[r(F,{class:"h-100"},{default:m(()=>[g("div",Ce,[r(E,{size:"64",icon:"tabler-file-alert"}),g("div",Re,[l[2]||(l[2]=g("span",null,"No Result For ",-1)),g("span",null,'"'+$(v(c))+'"',1)]),x(t.$slots,"noDataSuggestion",{},void 0,!0)])]),_:3})],!0)],512),[[_,!a.searchResults.length&&v(c).length]])],64)),e.isLoading?(k(),B(A,{key:1},T(3,o=>r(Ee,{key:o,type:"list-item-two-line"})),64)):R("",!0)]),_:3})]),_:3})]),_:3},8,["model-value","height","fullscreen"]))}},We=fe(Te,[["__scopeId","data-v-01416ec8"]]);export{We as default};
