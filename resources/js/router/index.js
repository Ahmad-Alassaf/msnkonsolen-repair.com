import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

/* Guest Component */
const Login = () => import('@/components/Login.vue')
const Register = () => import('@/components/Register.vue')
/* Guest Component */

/* Layouts */

/* Layouts */

/* Authenticated Component */
const home = () => import('@/components/home.vue')
/* Authenticated Component */
import users from '../components/users/users.vue'
import edituser from '../components/users/edituser.vue'
import mycontracts from '../components/users/mycontracts.vue'

import services from '@/components/services/services.vue'
import adminpage from '../components/Adminpage.vue'
import roles from '../components/roles/roles.vue'
import permissions from '../components/permissions/permissions.vue'

import devices from '../components/devices/devices.vue'

import platforms from "../components/platforms/platforms.vue"
import service from '../components/services/service.vue'
import adminservices from '../components/adminservices.vue'
import editservice from '../components/services/editservice.vue'
import showservice from '../components/services/showservice.vue'
import addnewservice from '../components/services/addnewservice.vue'
import profile from '../components/profile.vue'
import contact from '../components/contact.vue'

import contracts from '../components/contracts/contracts.vue'
import editcontract from '../components/contracts/editcontract.vue'
import showcontract from '../components/contracts/showcontract.vue'
import createcontract from  '../components/contracts/createcontract.vue'

import products from '../components/shoppingcart/products.vue'
import editrole from '../components/roles/editrole.vue'
import success from '../components/success.vue'
import cancel from '../components/cancel.vue'
import verified from '../components/verified.vue'
import sendemail from '../components/sendemail.vue'
import pagenotfound from '../components/pagenotfound.vue'

import kasse from '../components/Kasse/kasse.vue'


const routes = [
    //Home
    {
        path: '/',
        name: "home",
       
        component: home,
            meta: {title: `MSN Reparatur` }
    },
    //Verifey
    {
        path: '/verified/:token',
        name: "verified",
       
        component: verified,
            meta: {title: `verified `,middleware:'guest' }
    },
    //Contact
    {
        path: '/contact',
        name: "contact",
       
        component: contact,
            meta: {title: `Kontakt ` }
    },
    //Users
    {
        name: "users",
        path: "/users",
        component: users,
        meta: {
            title: `users`,
          
        }
    },
    {
        name: "edituser",
        path: "/users/:id",
        component: edituser,
        meta: {
            title: `users`,
            props:true,
        }
    },
    {
        name: "mycontracts",
        path: "/mycontracts",
        component: mycontracts,
        meta: {
            title: `Meine Auftrage`,
          
        }
    },
    //Roles
    {
        name: "roles",
        path: "/roles",
        component: roles,
        meta: {
            title: `roles`,
           
        }
    },
    {
        name: "permissions",
        path: "/permissions",
        component: permissions,
        meta: {
            title: `permissions`,
           
        }
    },
    {
        name: "services",
        path: "/services",
        component: services,
        meta: {
            middleware:'guest',
            title: `services`
        }
    },
    ,
    {
        name: "addnewservice",
        path: "/addnewservice",
        component: addnewservice,        
        meta: {
            middleware: "auth",
            props: true,
        }
    },
    {
        name: "service",
        path: "/service/:id",
        component: service,
        meta: {
             title: `service`,
            
            }
        
    },
    {
        name: "editservice",
        path: "/editservice/:id",
        component: editservice,
        meta: { title: `editservice`}
        
    },
    {
        name: "showservice",
        path: "/showservice/:id",
        component: showservice,
        meta: { title: `showservice`}
        
    },
    {
        name: "products",
        path: "/products",
        component: products,        
        meta: {
            title:'Kaufwagen',
           
         
        }
    },   
    
   
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
          
            title: `Login`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        name: "devices",
        path: "/devices",
        component: devices,
        
        meta: {
           
        }
    }
    ,
    {
        name: "platforms",
        path: "/platforms",
        component: platforms,
        
        meta: {
            title:'Platforms in System',
        }
    }
    ,
    {
        name: "profile",
        path: "/profile",
        component: profile,
        
        meta: {
            middleware: "auth",
          
        }
    }
   ,
   {
    name: "contracts",
    path: "/contracts",
    component: contracts,
    
    meta: {
        middleware: "auth",
       
    }
}
,
{
    name: "editcontract",
    path: "/editcontract/:id",
    component: editcontract,
    
    meta: {
        middleware: "auth",
        title:"Auftragänderung"
       
    }
},
,
//Show Contract
{
    name: "showcontract",
    path: "/showcontract/:id",
    component: showcontract,    
    meta: {
        middleware: "auth",
        title:'Show Contract'
      
    }
},
{
    name: "createcontract",
    path: "/createcontract",
    component: createcontract,
    
    meta: {
        middleware: "auth",
       
       
        title:'createcontract'
    }
}
,
  // AdminPage 
    {
        name: "adminpage",
        path: "/adminpage",
        component: adminpage,
        meta: {
           
            title: `adminpage`
        }
    },
    {
        name: "adminservices",
        path: "/adminservices",
        component: adminservices,
        meta: {
           
            title: `adminservices`
        }
    },
    {
        name: "addnewservice",
        path: "/addnewservice",
        component: addnewservice,
        meta: {
           
            title: `addnewservice`
        }
    },
    {
        name: "editrole",
        path: "/editrole/:id",
        component: editrole,
        meta: {
           
            title: `editrole`
        }
    },
    {
        name: "success",
        path: "/success",
        component: success,
        meta: {
            props:true,
           
            title: `success`
        }
    },
    //Page Not Found
    {
        name: "pagenotfound",
        path: "/pagenotfound",
        component:pagenotfound ,
        meta: {
          
        }
    },
    //Cancel
    {
        name: "cancel",
        path: "/cancel",
        component: cancel,
        meta: {
            props:true,
           
            title: `cancel`
        }
    },
    ,
    //Send Email
    {
        name: "sendemail",
        path: "/sendemail",
        component: sendemail,
        
        meta: {
            middleware: "auth",
          
        }
    },
    //Kasse
    {
        name: "kasse",
        path: "/kasse",
        component: kasse,
        
        meta: {
            middleware: "auth",
          
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {next()}
       
        else{ next()}
       
    } 
    else if (to.meta.middleware == "auth"){
        if (!store.state.auth.authenticated) {next({name:'login'})}
        else{ next()}

    }
    else if (to.meta.middleware == "verified"){
        if (!store.state.auth.verified) {next({name:'verified'})}
        else{ next()}

    }
    else {next()}
})


export default router