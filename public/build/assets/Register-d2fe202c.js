import{_ as w,r as d,u as g,a as v,b,o as a,c as n,e as s,k as y,F as E,g as k,t as _,f as x,w as l,v as i,h as u,d as V,i as N}from"./app-3b496504.js";const P={name:"register",setup(){const r=d({name:"",email:"",password:"",password_confirmation:""}),e=d({}),c=d(!1),o=g(),m=v();return{register:async()=>{c.value=!0,o.dispatch("auth/register",r.value).then(m.push("/verify"))},user:r,validationErrors:e}}},C={class:"container h-100"},R={class:"row h-100 align-items-center"},U={class:"col-12 col-md-6 offset-md-3"},B={class:"card shadow sm"},S={class:"card-body"},D=s("h1",{class:"text-center"},"Register",-1),F=s("hr",null,null,-1),L={key:0,class:"col-12"},M={class:"alert alert-danger"},T={class:"mb-0"},j={class:"form-group col-12"},A=s("label",{for:"name",class:"font-weight-bold"},"Name",-1),O={class:"form-group col-12 my-2"},q=s("label",{for:"email",class:"font-weight-bold"},"Email",-1),z={class:"form-group col-12"},G=s("label",{for:"password",class:"font-weight-bold"},"Password",-1),H={class:"form-group col-12 my-2"},I=s("label",{for:"password_confirmation",class:"font-weight-bold"},"Confirm Password",-1),J={class:"col-12 mb-2"},K=["disabled"],Q={class:"col-12 text-center"};function W(r,e,c,o,m,p){const f=b("router-link");return a(),n("div",C,[s("div",R,[s("div",U,[s("div",B,[s("div",S,[D,F,s("form",{onSubmit:e[4]||(e[4]=y((...t)=>o.register&&o.register(...t),["prevent"])),class:"row"},[Object.keys(o.validationErrors).length>0?(a(),n("div",L,[s("div",M,[s("ul",T,[(a(!0),n(E,null,k(o.validationErrors,(t,h)=>(a(),n("li",{key:h},_(t[0]),1))),128))])])])):x("",!0),s("div",j,[A,l(s("input",{type:"text",name:"name","onUpdate:modelValue":e[0]||(e[0]=t=>o.user.name=t),id:"name",placeholder:"Enter name",class:"form-control"},null,512),[[i,o.user.name]])]),s("div",O,[q,l(s("input",{type:"text",name:"email","onUpdate:modelValue":e[1]||(e[1]=t=>o.user.email=t),id:"email",placeholder:"Enter Email",class:"form-control"},null,512),[[i,o.user.email]])]),s("div",z,[G,l(s("input",{type:"password",name:"password","onUpdate:modelValue":e[2]||(e[2]=t=>o.user.password=t),id:"password",placeholder:"Enter Password",class:"form-control"},null,512),[[i,o.user.password]])]),s("div",H,[I,l(s("input",{type:"password_confirmation",name:"password_confirmation","onUpdate:modelValue":e[3]||(e[3]=t=>o.user.password_confirmation=t),id:"password_confirmation",placeholder:"Enter Password",class:"form-control"},null,512),[[i,o.user.password_confirmation]])]),s("div",J,[s("button",{type:"submit",disabled:r.processing,class:"btn btn-primary btn-block"},_(r.processing?"Please wait":"Register"),9,K)]),s("div",Q,[s("label",null,[u("Already have an account? "),V(f,{to:{name:"login"}},{default:N(()=>[u("Login Now!")]),_:1})])])],32)])])])])])}const Y=w(P,[["render",W]]);export{Y as default};
