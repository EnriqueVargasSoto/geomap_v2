import{V as a,m as V}from"./VSelectionControl--5wNwIzX.js";import{L as f,M as v,Q as c,P as l,N as I,U as k,b as x,q as b,S as h}from"./app-C-kY_QES.js";const C=v({indeterminate:Boolean,indeterminateIcon:{type:h,default:"$checkboxIndeterminate"},...V({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),B=f()({name:"VCheckboxBtn",props:C(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,r){let{slots:s}=r;const t=c(e,"indeterminate"),n=c(e,"modelValue");function u(o){t.value&&(t.value=!1)}const i=l(()=>t.value?e.indeterminateIcon:e.falseIcon),m=l(()=>t.value?e.indeterminateIcon:e.trueIcon);return I(()=>{const o=k(a.filterProps(e),["modelValue"]);return x(a,b(o,{modelValue:n.value,"onUpdate:modelValue":[d=>n.value=d,u],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:i.value,trueIcon:m.value,"aria-checked":t.value?"mixed":void 0}),s)}),{}}});export{B as V,C as m};
