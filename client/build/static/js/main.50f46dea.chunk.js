(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{12:function(e,t,n){e.exports={header:"MainNavigation_header__pcWBd",logo:"MainNavigation_logo__3mTft",nav:"MainNavigation_nav__2KJfX",active:"MainNavigation_active__oN3Ka"}},20:function(e,t,n){e.exports={typography:"Homepage_typography__1gVpD"}},21:function(e,t,n){e.exports={card:"Card_card__1m44e"}},22:function(e,t,n){e.exports={main:"Layout_main__auk_r"}},28:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n(19),c=n.n(r),s=(n(28),n(7)),o=n(2),i=n(4),l=n.n(i),u=n(11),j=n(6),d=n(20),b=n.n(d),h=n(21),m=n.n(h),p=n(0),x=function(e){return Object(p.jsx)("div",{className:m.a.card,children:e.children})},O=n(22),f=n.n(O),g=n(12),v=n.n(g),w=function(){var e=localStorage.getItem("token");return Object(a.useEffect)((function(){null==e&&o.a}),[e]),Object(p.jsxs)("header",{className:v.a.header,children:[Object(p.jsx)("div",{className:v.a.logo,children:Object(p.jsx)("img",{src:"/img/mainlogo.jpg"})}),Object(p.jsx)("nav",{className:v.a.nav,children:Object(p.jsxs)("ul",{children:[!e&&Object(p.jsx)("li",{children:Object(p.jsx)(s.b,{to:"/login",activeClassName:v.a.active,children:"Login"})}),!e&&Object(p.jsx)("li",{children:Object(p.jsx)(s.b,{to:"/register",activeClassName:v.a.active,children:"Register"})}),e&&Object(p.jsx)("li",{children:Object(p.jsx)(s.b,{to:"/homepage",onClick:function(){},activeClassName:v.a.active,children:" Home"})}),e&&Object(p.jsx)("li",{children:Object(p.jsx)(s.b,{to:"/updateprofile",activeClassName:v.a.active,children:" Update Profile"})}),e&&Object(p.jsx)("li",{children:Object(p.jsx)(s.b,{to:"/login",onClick:function(){localStorage.removeItem("token"),localStorage.removeItem("userEmail"),e=null},activeClassName:v.a.active,children:" Logout"})})]})})]})},_=function(e){return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(w,{}),Object(p.jsx)("main",{className:f.a.main,children:e.children})]})},y=function(){var e,t=Object(o.g)(),n=Object(a.useState)(""),r=Object(j.a)(n,2),c=r[0],s=r[1],i=localStorage.getItem("userEmail"),d=function(){var n=Object(u.a)(l.a.mark((function n(){var a,r;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,fetch("/getUsers/".concat(i),{method:"GET",headers:{Authorization:"Bearer ".concat(e)}});case 3:if(a=n.sent,console.log("rs : ",a),400!==a.status){n.next=7;break}throw new Error;case 7:return n.next=9,a.json();case 9:r=n.sent,console.log(r),s(r.name),n.next=20;break;case 14:n.prev=14,n.t0=n.catch(0),localStorage.removeItem("token"),localStorage.removeItem("userEmail"),alert(n.t0),t.push("/login");case 20:case"end":return n.stop()}}),n,null,[[0,14]])})));return function(){return n.apply(this,arguments)}}();return Object(a.useEffect)(Object(u.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,localStorage.getItem("token");case 2:e=t.sent,d();case 4:case"end":return t.stop()}}),t)}))),[e]),null===e?Object(p.jsx)(o.a,{to:"/login"}):Object(p.jsx)(_,{children:Object(p.jsx)(x,{children:Object(p.jsx)("div",{className:b.a.typography,children:Object(p.jsxs)("h1",{children:["Welcome ",c]})})})})},N=n(5),S=n.n(N),k=function(){localStorage.getItem("token");var e=Object(o.g)(),t=Object(a.useState)(""),n=Object(j.a)(t,2),r=n[0],c=n[1],s=Object(a.useState)(""),i=Object(j.a)(s,2),d=i[0],b=i[1],h=function(){var t=Object(u.a)(l.a.mark((function t(n){var a,s;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.prev=1,t.next=4,fetch("/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:r,password:d})});case 4:return a=t.sent,t.next=7,a.json();case 7:if(s=t.sent,400!==a.status){t.next=10;break}throw new Error(s.error);case 10:console.log(s),localStorage.setItem("token",s.token),localStorage.setItem("userEmail",r),alert("User Login Successfully!!"),c(""),b(""),e.push("/homepage"),t.next=21;break;case 18:t.prev=18,t.t0=t.catch(1),alert(t.t0);case 21:case"end":return t.stop()}}),t,null,[[1,18]])})));return function(e){return t.apply(this,arguments)}}();return Object(p.jsx)(_,{children:Object(p.jsx)(x,{children:Object(p.jsxs)("form",{onSubmit:h,children:[Object(p.jsxs)("div",{className:S.a.control,children:[Object(p.jsx)("label",{htmlFor:"email",children:"Email"}),Object(p.jsx)("input",{required:!0,type:"email",id:"email",value:r,onChange:function(e){c(e.target.value)}})]}),Object(p.jsxs)("div",{className:S.a.control,children:[Object(p.jsx)("label",{htmlFor:"password",children:"Password"}),Object(p.jsx)("input",{required:!0,type:"password",id:"password",value:d,onChange:function(e){b(e.target.value)},minLength:"7"})]}),Object(p.jsx)("div",{className:S.a.actions,children:Object(p.jsx)("button",{className:"btn",children:"Login"})})]})})})},E=function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)("h1",{children:"Page not found"})})},C=function(){var e=Object(o.g)(),t=Object(a.useState)(""),n=Object(j.a)(t,2),r=n[0],c=n[1],s=Object(a.useState)(""),i=Object(j.a)(s,2),d=i[0],b=i[1],h=Object(a.useState)(""),m=Object(j.a)(h,2),O=m[0],f=m[1],g=Object(a.useState)(""),v=Object(j.a)(g,2),w=v[0],y=v[1],N=function(){var t=Object(u.a)(l.a.mark((function t(n){var a,s;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),O===w){t.next=3;break}return t.abrupt("return",alert("Password must be same!!"));case 3:return t.prev=3,t.next=6,fetch("/register",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name:r,email:d,password:O})});case 6:return a=t.sent,t.next=9,a.json();case 9:if(s=t.sent,400!==a.status){t.next=12;break}throw new Error(s.error);case 12:alert("User Registation Successfully!!"),c(""),b(""),f(""),y(""),e.push("/login"),t.next=20;break;case 17:t.prev=17,t.t0=t.catch(3),alert(t.t0);case 20:case"end":return t.stop()}}),t,null,[[3,17]])})));return function(e){return t.apply(this,arguments)}}();return Object(p.jsx)(_,{children:Object(p.jsx)(x,{children:Object(p.jsxs)("form",{onSubmit:N,children:[Object(p.jsxs)("div",{className:S.a.control,children:[Object(p.jsx)("label",{htmlFor:"name",children:"Name"}),Object(p.jsx)("input",{type:"text",id:"name",value:r,onChange:function(e){c(e.target.value)},required:!0})]}),Object(p.jsxs)("div",{className:S.a.control,children:[Object(p.jsx)("label",{htmlFor:"email",children:"Email"}),Object(p.jsx)("input",{required:!0,type:"email",id:"email",value:d,onChange:function(e){b(e.target.value)}})]}),Object(p.jsxs)("div",{className:S.a.control,children:[Object(p.jsx)("label",{htmlFor:"password",children:"Password"}),Object(p.jsx)("input",{required:!0,type:"password",id:"password",value:O,onChange:function(e){f(e.target.value)},minLength:"7"})]}),Object(p.jsxs)("div",{className:S.a.control,children:[Object(p.jsx)("label",{htmlFor:"cpassword",children:"Confirm Password"}),Object(p.jsx)("input",{required:!0,type:"password",id:"cpassword",value:w,onChange:function(e){y(e.target.value)},minLength:"7"})]}),Object(p.jsx)("div",{className:S.a.actions,children:Object(p.jsx)("button",{className:"btn",children:"Register"})})]})})})},F=function(){var e=Object(o.g)(),t=Object(a.useState)(""),n=Object(j.a)(t,2),r=n[0],c=n[1],s=Object(a.useState)(""),i=Object(j.a)(s,2),d=i[0],b=i[1],h=Object(a.useState)(""),m=Object(j.a)(h,2),O=m[0],f=m[1],g=localStorage.getItem("token"),v=localStorage.getItem("userEmail"),w=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/getUsers/".concat(v),{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer ".concat(g)}});case 3:return t=e.sent,e.next=6,t.json();case 6:if(n=e.sent,console.log(n),400!==t.status){e.next=12;break}throw localStorage.removeItem("token"),localStorage.removeItem("userEmail"),new Error(n.error);case 12:c(n.name),b(n.email),f(n.password),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(0),alert(e.t0);case 20:case"end":return e.stop()}}),e,null,[[0,17]])})));return function(){return e.apply(this,arguments)}}();if(Object(a.useEffect)((function(){w()}),[]),null===g)return Object(p.jsx)(o.a,{to:"/login"});return Object(p.jsx)(_,{children:Object(p.jsx)(x,{children:Object(p.jsxs)("form",{children:[Object(p.jsxs)("div",{className:S.a.control,children:[Object(p.jsx)("label",{htmlFor:"name",children:"Name"}),Object(p.jsx)("input",{type:"text",id:"name",value:r,onChange:function(e){c(e.target.value)},required:!0})]}),Object(p.jsxs)("div",{className:S.a.control,children:[Object(p.jsx)("label",{htmlFor:"email",children:"Email"}),Object(p.jsx)("input",{required:!0,type:"email",id:"email",value:d,onChange:function(e){b(e.target.value)}})]}),Object(p.jsxs)("div",{className:S.a.control,children:[Object(p.jsx)("label",{htmlFor:"password",children:"Password"}),Object(p.jsx)("input",{required:!0,type:"password",id:"password",value:O,onChange:function(e){f(e.target.value)},minLength:"7"})]}),Object(p.jsx)("div",{className:S.a.actions,children:Object(p.jsx)("button",{onClick:function(e){var t;e.preventDefault(),t=O?JSON.stringify({name:r,email:d,password:O}):JSON.stringify({name:r,email:d}),function(){var e=Object(u.a)(l.a.mark((function e(){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/updateUser/me",{method:"PATCH",headers:{"content-type":"application/json",Authorization:"Bearer ".concat(g)},body:t});case 3:return n=e.sent,e.next=6,n.json();case 6:if(a=e.sent,console.log(a),400!==n.status){e.next=10;break}throw new Error;case 10:localStorage.setItem("userEmail",d),alert("User updated successfully"),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),alert(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}}()().then((function(){w(),f("")})).catch((function(e){alert(e)}))},className:"btn",children:"Update Details"})}),Object(p.jsx)("div",{className:S.a.actions_delete,children:Object(p.jsx)("button",{onClick:function(t){t.preventDefault(),function(){var t=Object(u.a)(l.a.mark((function t(){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("/deleteUser/me",{method:"DELETE",headers:{"content-type":"application/json",Authorization:"Bearer ".concat(g)}});case 3:return n=t.sent,t.next=6,n.json();case 6:if(a=t.sent,console.log(a),500!==n.status){t.next=10;break}throw new Error("failed to delete user!");case 10:localStorage.removeItem("userEmail"),localStorage.removeItem("token"),alert("User deleted successfully"),e.push("/login"),t.next=19;break;case 16:t.prev=16,t.t0=t.catch(0),alert(t.t0);case 19:case"end":return t.stop()}}),t,null,[[0,16]])})));return function(){return t.apply(this,arguments)}}()()},className:"btn",children:"Delate Account"})})]})})})},I=function(){return localStorage.removeItem("token"),Object(p.jsx)("h1",{children:"logout"})};var L=function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(s.a,{children:Object(p.jsxs)(o.d,{children:[Object(p.jsx)(o.b,{exact:!0,path:"/",component:k}),Object(p.jsx)(o.b,{path:"/login",component:k}),Object(p.jsx)(o.b,{path:"/register",component:C}),Object(p.jsx)(o.b,{path:"/homepage",component:y}),Object(p.jsx)(o.b,{path:"/updateprofile",component:F}),Object(p.jsx)(o.b,{path:"/logout",component:I}),Object(p.jsx)(o.b,{path:"*",children:Object(p.jsx)(E,{})})]})})})},P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,40)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};c.a.render(Object(p.jsx)(L,{}),document.getElementById("root")),P()},5:function(e,t,n){e.exports={form:"Form_form__2hemT",loading:"Form_loading__1F3Th",control:"Form_control__g5TiA",actions:"Form_actions__3Xb7K",actions_delete:"Form_actions_delete__UQ68K"}}},[[39,1,2]]]);
//# sourceMappingURL=main.50f46dea.chunk.js.map