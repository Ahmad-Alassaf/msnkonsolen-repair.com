import{_ as w,n as E,j as y,m as k,r as n,o as a,c as r,a as l,b as s,t as c,d as m,F as h,e as x,w as _,v as p,f as g,g as T}from"./app-34be5aa7.js";const j={name:"login",components:{navbar:E,jambotron:y},data(){return{auth:{email:"",password:""},validationErrors:{},processing:!1,credintioalError:""}},methods:{...k({signIn:"auth/login"}),async loginn(){this.processing=!0,await this.$store.dispatch("auth/login",this.auth).then(e=>{e.data==""?(this.credintioalError=e.message,this.processing=!1):e.message=="The password field is required."?(this.credintioalError=e.message,this.processing=!1):e.message=="The email field is required."?(this.credintioalError=e.message,this.processing=!1):e.message=="The password must be at least 6 characters."?(this.credintioalError=e.message,this.processing=!1):e.message=="The email must be a valid email address."?(this.credintioalError=e.message,this.processing=!1):e.message=="The email must be a valid email address. (and 1 more error)"?(this.credintioalError=e.message,this.processing=!1):this.$router.push("/")})}}},V={class:"container h-100 pt-5"},N={class:"row h-100 align-items-center"},C={class:"col-12 col-md-6 offset-md-3"},L={class:"card shadow sm"},B={class:"card-body"},D=s("h1",{class:"text-center"},"Login",-1),q={key:0,class:"text-danger"},F=s("hr",null,null,-1),P={action:"javascript:void(0)",class:"row",method:"post"},U={key:0,class:"col-12"},A={class:"alert alert-danger"},I={class:"mb-0"},M={class:"form-group col-12"},O=s("label",{for:"email",class:"font-weight-bold"},"Email",-1),R={class:"form-group col-12 my-2"},S=s("label",{for:"password",class:"font-weight-bold"},"Password",-1),z={class:"col-12 mb-2"},G=["disabled"],H={class:"col-12 text-center"};function J(e,i,K,Q,o,d){const f=n("navbar"),u=n("jambotron"),b=n("router-link");return a(),r(h,null,[l(f),l(u),s("div",V,[s("div",N,[s("div",C,[s("div",L,[s("div",B,[D,o.credintioalError!=""?(a(),r("p",q,c(o.credintioalError),1)):m("",!0),F,s("form",P,[Object.keys(o.validationErrors).length>0?(a(),r("div",U,[s("div",A,[s("ul",I,[(a(!0),r(h,null,x(o.validationErrors,(t,v)=>(a(),r("li",{key:v},c(t[0]),1))),128))])])])):m("",!0),s("div",M,[O,_(s("input",{type:"text","onUpdate:modelValue":i[0]||(i[0]=t=>o.auth.email=t),name:"email",id:"email",class:"form-control"},null,512),[[p,o.auth.email]])]),s("div",R,[S,_(s("input",{type:"password","onUpdate:modelValue":i[1]||(i[1]=t=>o.auth.password=t),name:"password",id:"password",class:"form-control"},null,512),[[p,o.auth.password]])]),s("div",z,[s("button",{type:"submit",disabled:o.processing,onClick:i[2]||(i[2]=(...t)=>d.loginn&&d.loginn(...t)),class:"btn btn-primary btn-block"},c(o.processing?"Please wait":"Login"),9,G)]),s("div",H,[s("label",null,[g("Don't have an account? "),l(b,{to:{name:"register"}},{default:T(()=>[g("Register Now!")]),_:1})])])])])])])])])],64)}const X=w(j,[["render",J]]);export{X as default};
