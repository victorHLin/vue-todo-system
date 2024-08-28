import{u as B,r as d,g as D,e as n,h as m,c as k,a as e,d as i,t as v,w as C,v as V,n as f,F as K,i as M,o as w,j as S}from"./index-BCljEy8V.js";import{s as p}from"./showAlert-BaSqmw_f.js";const U={id:"todoListPage",class:"bg-half"},z=e("h1",null,[e("a",{href:"#"},"ONLINE TODO LIST")],-1),E={class:"todo_sm"},F={class:"conatiner todoListPage vhContainer"},I={class:"todoList_Content"},P={class:"inputBox"},R=e("i",{class:"fa fa-plus"},null,-1),Y=[R],W={class:"todoList_list"},j={class:"todoList_tab"},q={class:"todoList_items"},G={class:"todoList_item"},H={class:"todoList_label"},J=["onUpdate:modelValue","onClick"],Q=["onClick"],X=e("i",{class:"fa fa-times"},null,-1),Z=[X],ee={class:"todoList_statistics"},r="https://todolist-api.hexschool.io",ae={__name:"TodoView",setup(te){const g=B(),h=d({nickname:"",uid:""});D(async()=>{y(),setInterval(y,5*60*1e3)});const y=async()=>{try{const t=document.cookie.replace(/(?:(?:^|.*;\s*)customName\s*=\s*([^;]*).*$)|^.*$/,"$1");t||(p("You haven't login or your token is expired!","Redirect to login page","warning","OK"),g.push("/login")),n.defaults.headers.common.Authorization=t;const s=await n.get(`${r}/users/checkout`);h.value=s.data,u()}catch(t){console.log(t.response.data.message),$(),p("Your token is expired!","You will be sign out directly!","warning","OK"),g.push("/login")}},L=async()=>{try{await n.post(`${r}/users/sign_out`,{}),$(),p("Logout Success","Redirect to login page","success","OK"),g.push("/login")}catch(t){console.log(t.response.data.message)}},$=()=>{n.defaults.headers.common.Authorization="",document.cookie="customName=;",h.value={}},l=d([]),u=async()=>{try{const t=await n.get(`${r}/todos`);l.value=t.data.data}catch(t){console.log(t.response.data.message)}},c=d(""),x=async()=>{if(c.value.trim().length===0){p("New task cannot be empty!","Please enter a valid task!","warning","OK");return}try{await n.post(`${r}/todos`,{content:c.value}),u(),c.value=""}catch(t){console.log(t.response.data.message)}},T=async t=>{try{await n.delete(`${r}/todos/${t}`),u()}catch(s){console.log(s.response.data.message)}},b=m(()=>a.value==="all"?l.value:a.value==="working"?l.value.filter(t=>!t.status):l.value.filter(t=>t.status)),a=d("all"),N=async t=>{try{await n.patch(`${r}/todos/${t}/toggle`,{}),u()}catch(s){console.log(s.response.data.message)}},O=m(()=>l.value.reduce((t,s)=>t+!s.status,0)),A=m(()=>l.value.reduce((t,s)=>t+s.status,0));return(t,s)=>(w(),k("div",U,[e("nav",null,[z,e("ul",null,[e("li",E,[e("a",{href:"#",id:"nickName",onClick:s[0]||(s[0]=i(o=>a.value="all",["prevent"]))},[e("span",null,v(h.value.nickname)+"'s Todo List",1)])]),e("li",null,[e("a",{href:"#",onClick:L},"Logout")])])]),e("div",F,[e("div",I,[e("div",P,[C(e("input",{type:"text",placeholder:"Enter Task","onUpdate:modelValue":s[1]||(s[1]=o=>c.value=o)},null,512),[[V,c.value]]),e("a",{href:"#",onClick:s[2]||(s[2]=i(o=>x(),["prevent"]))},Y)]),e("div",W,[e("ul",j,[e("li",null,[e("a",{href:"#",id:"all",class:f({active:a.value==="all"}),onClick:s[3]||(s[3]=i(o=>a.value="all",["prevent"]))},"All",2)]),e("li",null,[e("a",{href:"#",id:"working",class:f({active:a.value==="working"}),onClick:s[4]||(s[4]=i(o=>a.value="working",["prevent"]))},"Working",2)]),e("li",null,[e("a",{href:"#",id:"done",class:f({active:a.value==="done"}),onClick:s[5]||(s[5]=i(o=>a.value="done",["prevent"]))},"Done",2)])]),e("div",q,[e("ul",G,[(w(!0),k(K,null,M(b.value,o=>(w(),k("li",{key:o.id},[e("label",H,[C(e("input",{class:"todoList_input",type:"checkbox","onUpdate:modelValue":_=>o.status=_,onClick:_=>N(o.id)},null,8,J),[[S,o.status]]),e("span",null,v(o.content),1)]),e("a",{href:"#",onClick:i(_=>T(o.id),["prevent"])},Z,8,Q)]))),128))]),e("div",ee,[e("p",null,v(O.value)+" still working, "+v(A.value)+" complete",1)])])])])])]))}};export{ae as default};
