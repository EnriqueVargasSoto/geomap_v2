import{L as z,M as C,N as F,b as m,aD as W,a1 as _,bR as w,bu as q,aw as Z,P as c,bN as x,ak as ee,cu as ae,cx as X,Q as E,ai as ne,X as A,r as R,w as B,ag as te,ac as se,cy as le,O as j,bJ as ie,m as ue,aJ as re,aL as oe,G as de,aN as J,aX as ce,bS as ve,aA as fe,ay as ge,ab as me,cz as ye,bB as he,S as K,aH as be}from"./app-B3I6Gn6w.js";import{M as Ve,m as pe}from"./VAvatar-C88WUKqv.js";const ke=C({text:String,onClick:w(),..._(),...W()},"VLabel"),Ae=z()({name:"VLabel",props:ke(),setup(e,s){let{slots:r}=s;return F(()=>{var n;return m("label",{class:["v-label",{"v-label--clickable":!!e.onClick},e.class],style:e.style,onClick:e.onClick},[e.text,(n=r.default)==null?void 0:n.call(r)])}),{}}});function Ie(e){const{t:s}=q();function r(n){let{name:o}=n;const a={prepend:"prependAction",prependInner:"prependAction",append:"appendAction",appendInner:"appendAction",clear:"clear"}[o],u=e[`onClick:${o}`],g=u&&a?s(`$vuetify.input.${a}`,e.label??""):void 0;return m(Z,{icon:e[`${o}Icon`],"aria-label":g,onClick:u},null)}return{InputIcon:r}}const Me=C({active:Boolean,color:String,messages:{type:[Array,String],default:()=>[]},..._(),...pe({transition:{component:ae,leaveAbsolute:!0,group:!0}})},"VMessages"),Se=z()({name:"VMessages",props:Me(),setup(e,s){let{slots:r}=s;const n=c(()=>x(e.messages)),{textColorClasses:o,textColorStyles:a}=ee(c(()=>e.color));return F(()=>m(Ve,{transition:e.transition,tag:"div",class:["v-messages",o.value,e.class],style:[a.value,e.style],role:"alert","aria-live":"polite"},{default:()=>[e.active&&n.value.map((u,g)=>m("div",{class:"v-messages__message",key:`${g}-${n.value}`},[r.message?r.message({message:u}):u]))]})),{}}}),Ce=C({focused:Boolean,"onUpdate:focused":w()},"focus");function Re(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:X();const r=E(e,"focused"),n=c(()=>({[`${s}--focused`]:r.value}));function o(){r.value=!0}function a(){r.value=!1}return{focusClasses:n,isFocused:r,focus:o,blur:a}}const G=Symbol.for("vuetify:form"),ze=C({disabled:Boolean,fastFail:Boolean,readonly:Boolean,modelValue:{type:Boolean,default:null},validateOn:{type:String,default:"input"}},"form");function Fe(e){const s=E(e,"modelValue"),r=c(()=>e.disabled),n=c(()=>e.readonly),o=A(!1),a=R([]),u=R([]);async function g(){const l=[];let i=!0;u.value=[],o.value=!0;for(const v of a.value){const d=await v.validate();if(d.length>0&&(i=!1,l.push({id:v.id,errorMessages:d})),!i&&e.fastFail)break}return u.value=l,o.value=!1,{valid:i,errors:u.value}}function I(){a.value.forEach(l=>l.reset())}function h(){a.value.forEach(l=>l.resetValidation())}return B(a,()=>{let l=0,i=0;const v=[];for(const d of a.value)d.isValid===!1?(i++,v.push({id:d.id,errorMessages:d.errorMessages})):d.isValid===!0&&l++;u.value=v,s.value=i>0?!1:l===a.value.length?!0:null},{deep:!0,flush:"post"}),te(G,{register:l=>{let{id:i,vm:v,validate:d,reset:p,resetValidation:V}=l;a.value.some(M=>M.id===i),a.value.push({id:i,validate:d,reset:p,resetValidation:V,vm:le(v),isValid:null,errorMessages:[]})},unregister:l=>{a.value=a.value.filter(i=>i.id!==l)},update:(l,i,v)=>{const d=a.value.find(p=>p.id===l);d&&(d.isValid=i,d.errorMessages=v)},isDisabled:r,isReadonly:n,isValidating:o,isValid:s,items:a,validateOn:se(e,"validateOn")}),{errors:u,isDisabled:r,isReadonly:n,isValidating:o,isValid:s,items:a,validate:g,reset:I,resetValidation:h}}function Be(e){const s=ne(G,null);return{...s,isReadonly:c(()=>!!((e==null?void 0:e.readonly)??(s==null?void 0:s.isReadonly.value))),isDisabled:c(()=>!!((e==null?void 0:e.disabled)??(s==null?void 0:s.isDisabled.value)))}}const De=C({disabled:{type:Boolean,default:null},error:Boolean,errorMessages:{type:[Array,String],default:()=>[]},maxErrors:{type:[Number,String],default:1},name:String,label:String,readonly:{type:Boolean,default:null},rules:{type:Array,default:()=>[]},modelValue:null,validateOn:String,validationValue:null,...Ce()},"validation");function Pe(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:X(),r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:j();const n=E(e,"modelValue"),o=c(()=>e.validationValue===void 0?n.value:e.validationValue),a=Be(e),u=R([]),g=A(!0),I=c(()=>!!(x(n.value===""?null:n.value).length||x(o.value===""?null:o.value).length)),h=c(()=>{var t;return(t=e.errorMessages)!=null&&t.length?x(e.errorMessages).concat(u.value).slice(0,Math.max(0,+e.maxErrors)):u.value}),l=c(()=>{var b;let t=(e.validateOn??((b=a.validateOn)==null?void 0:b.value))||"input";t==="lazy"&&(t="input lazy"),t==="eager"&&(t="input eager");const f=new Set((t==null?void 0:t.split(" "))??[]);return{input:f.has("input"),blur:f.has("blur")||f.has("input")||f.has("invalid-input"),invalidInput:f.has("invalid-input"),lazy:f.has("lazy"),eager:f.has("eager")}}),i=c(()=>{var t;return e.error||(t=e.errorMessages)!=null&&t.length?!1:e.rules.length?g.value?u.value.length||l.value.lazy?null:!0:!u.value.length:!0}),v=A(!1),d=c(()=>({[`${s}--error`]:i.value===!1,[`${s}--dirty`]:I.value,[`${s}--disabled`]:a.isDisabled.value,[`${s}--readonly`]:a.isReadonly.value})),p=ie("validation"),V=c(()=>e.name??ue(r));re(()=>{var t;(t=a.register)==null||t.call(a,{id:V.value,vm:p,validate:y,reset:M,resetValidation:S})}),oe(()=>{var t;(t=a.unregister)==null||t.call(a,V.value)}),de(async()=>{var t;l.value.lazy||await y(!l.value.eager),(t=a.update)==null||t.call(a,V.value,i.value,h.value)}),J(()=>l.value.input||l.value.invalidInput&&i.value===!1,()=>{B(o,()=>{if(o.value!=null)y();else if(e.focused){const t=B(()=>e.focused,f=>{f||y(),t()})}})}),J(()=>l.value.blur,()=>{B(()=>e.focused,t=>{t||y()})}),B([i,h],()=>{var t;(t=a.update)==null||t.call(a,V.value,i.value,h.value)});async function M(){n.value=null,await ce(),await S()}async function S(){g.value=!0,l.value.lazy?u.value=[]:await y(!l.value.eager)}async function y(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const f=[];v.value=!0;for(const b of e.rules){if(f.length>=+(e.maxErrors??1))break;const k=await(typeof b=="function"?b:()=>b)(o.value);if(k!==!0){if(k!==!1&&typeof k!="string"){console.warn(`${k} is not a valid value. Rule functions must return boolean true or a string.`);continue}f.push(k||"")}}return u.value=f,v.value=!1,g.value=t,u.value}return{errorMessages:h,isDirty:I,isDisabled:a.isDisabled,isReadonly:a.isReadonly,isPristine:g,isValid:i,isValidating:v,reset:M,resetValidation:S,validate:y,validationClasses:d}}const xe=C({id:String,appendIcon:K,centerAffix:{type:Boolean,default:!0},prependIcon:K,hideDetails:[Boolean,String],hideSpinButtons:Boolean,hint:String,persistentHint:Boolean,messages:{type:[Array,String],default:()=>[]},direction:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].includes(e)},"onClick:prepend":w(),"onClick:append":w(),..._(),...he(),...ye(be(),["maxWidth","minWidth","width"]),...W(),...De()},"VInput"),_e=z()({name:"VInput",props:{...xe()},emits:{"update:modelValue":e=>!0},setup(e,s){let{attrs:r,slots:n,emit:o}=s;const{densityClasses:a}=ve(e),{dimensionStyles:u}=fe(e),{themeClasses:g}=ge(e),{rtlClasses:I}=me(),{InputIcon:h}=Ie(e),l=j(),i=c(()=>e.id||`input-${l}`),v=c(()=>`${i.value}-messages`),{errorMessages:d,isDirty:p,isDisabled:V,isReadonly:M,isPristine:S,isValid:y,isValidating:t,reset:f,resetValidation:b,validate:$,validationClasses:k}=Pe(e,"v-input",i),D=c(()=>({id:i,messagesId:v,isDirty:p,isDisabled:V,isReadonly:M,isPristine:S,isValid:y,isValidating:t,reset:f,resetValidation:b,validate:$})),O=c(()=>{var P;return(P=e.errorMessages)!=null&&P.length||!S.value&&d.value.length?d.value:e.hint&&(e.persistentHint||e.focused)?e.hint:e.messages});return F(()=>{var L,N,H,U;const P=!!(n.prepend||e.prependIcon),Q=!!(n.append||e.appendIcon),T=O.value.length>0,Y=!e.hideDetails||e.hideDetails==="auto"&&(T||!!n.details);return m("div",{class:["v-input",`v-input--${e.direction}`,{"v-input--center-affix":e.centerAffix,"v-input--hide-spin-buttons":e.hideSpinButtons},a.value,g.value,I.value,k.value,e.class],style:[u.value,e.style]},[P&&m("div",{key:"prepend",class:"v-input__prepend"},[(L=n.prepend)==null?void 0:L.call(n,D.value),e.prependIcon&&m(h,{key:"prepend-icon",name:"prepend"},null)]),n.default&&m("div",{class:"v-input__control"},[(N=n.default)==null?void 0:N.call(n,D.value)]),Q&&m("div",{key:"append",class:"v-input__append"},[e.appendIcon&&m(h,{key:"append-icon",name:"append"},null),(H=n.append)==null?void 0:H.call(n,D.value)]),Y&&m("div",{class:"v-input__details"},[m(Se,{id:v.value,active:T,messages:O.value},{message:n.message}),(U=n.details)==null?void 0:U.call(n,D.value)])])}),{reset:f,resetValidation:b,validate:$,isValid:y,errorMessages:d}}});export{_e as V,Ae as a,Ce as b,Fe as c,ze as d,Be as e,Ie as f,xe as m,Re as u};
