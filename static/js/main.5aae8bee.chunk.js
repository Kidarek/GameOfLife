(this["webpackJsonpgame-of-life"]=this["webpackJsonpgame-of-life"]||[]).push([[0],{109:function(e,t,n){},113:function(e,t,n){"use strict";n.r(t);var a=n(26),r=n.n(a),c=n(57),i={value:Array.from({length:10},(function(){return Array.from({length:10},(function(){return 0}))}))},o=Object(c.b)({name:"life",initialState:i,reducers:{reset:function(e,t){e.value=Array.from({length:t.payload},(function(){return Array.from({length:t.payload},(function(){return 0}))}))},alive:function(e,t){e.value[t.payload.y][t.payload.x]=1},dead:function(e,t){e.value[t.payload.y][t.payload.x]=0},step:function(e,t){t.payload.forEach((function(t){e.value[t.y][t.x]=t.state}))},randomizer:function(e,t){e.value=e.value.map((function(e,n){return e.map((function(e,n){return a=101,Math.floor(Math.random()*a)<t.payload?1:0;var a}))}))}}});var s=o.actions,u=s.reset,l=s.alive,j=s.dead,d=s.step,b=s.randomizer,f=(o.reducer,Object(c.a)({reducer:{life:o.reducer}})),h=n(35),O=(n(109),n(13)),m=n(0),x=n.n(m),p=n(181),v=n(165),y=n(180),g=n(170),C=n(182),k=n(178),w=n(177),P=n(83),S=n.n(P),E=n(166),I=n(167),z=n(168),A=n(2),M=!1;document.body.onmousedown=function(){M=!0},document.body.onmouseup=function(){M=!1};var T=function(e){var t=Object(h.c)((function(t){return t.life.value[e.y][e.x]})),n=Object(h.b)(),a=function(){n(1===t?j({x:e.x,y:e.y}):l({x:e.x,y:e.y}))};return Object(A.jsx)("button",{className:1===t?"square alive":"square",onClick:a,onMouseOver:function(){M&&a()}})},q=n(84),B=n(173),F=n(171),R=n(179),N=n(174),V=n(82),J=n.n(V),D=[{value:50,label:"50ms"},{value:1e3,label:"1s"}];function G(e){var t=x.a.useState(null),n=Object(O.a)(t,2),a=n[0],r=n[1],c=function(){r(null)};return Object(A.jsxs)("div",{children:[Object(A.jsx)(k.a,{"aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){r(e.currentTarget)},children:Object(A.jsx)(J.a,{})}),Object(A.jsxs)(q.a,{id:"simple-menu",anchorEl:a,keepMounted:!0,open:Boolean(a),onClose:c,children:[Object(A.jsx)(B.a,{onClick:c,children:"My account"}),Object(A.jsx)(B.a,{children:Object(A.jsx)(F.a,{label:"Board Size",type:"number",InputProps:{inputProps:{min:1}},defaultValue:e.size,onChange:function(t){return e.sizeOnChange(parseInt(t.target.value))}})}),Object(A.jsx)(B.a,{children:Object(A.jsx)(F.a,{label:"Percentage of squares filled",type:"number",InputProps:{inputProps:{min:0,max:100},endAdornment:Object(A.jsx)(R.a,{position:"end",children:"%"})},defaultValue:e.randomFillPercent,onChange:function(t){return e.setRandomFillPercent(parseInt(t.target.value))}})}),Object(A.jsx)(B.a,{children:Object(A.jsxs)(v.a,{direction:"column",width:"100%",ml:1,children:[Object(A.jsx)(y.a,{children:"Time Between Moves"}),Object(A.jsx)(N.a,{min:50,max:1e3,defaultValue:e.playTime,onChange:function(t,n){return e.setPlayTime(n)},marks:D})]})})]})]})}var L=function(e,t){var n=Object(m.useRef)();Object(m.useEffect)((function(){n.current=e}),[e]),Object(m.useEffect)((function(){if(null!==t){var e=setInterval((function(){void 0!==n&&n.current()}),t);return function(){return clearInterval(e)}}}),[t])},H=function(){var e=Object(m.useState)(10),t=Object(O.a)(e,2),n=t[0],a=t[1],r=Object(m.useState)(!1),c=Object(O.a)(r,2),i=c[0],o=c[1],s=Object(m.useState)(200),l=Object(O.a)(s,2),j=l[0],x=l[1],P=Object(m.useState)(50),M=Object(O.a)(P,2),q=M[0],B=M[1],F=Object(m.useState)(Array.from({length:n},(function(){return 0}))),R=Object(O.a)(F,2),N=R[0],V=R[1],J=Object(h.b)();L((function(){D()}),i?j:null),Object(m.useEffect)((function(){o(!1),V(Array.from({length:n},(function(){return 0}))),J(u(n))}),[n]);var D=function(){var e=!1,t=[],n=f.getState().life.value;n.forEach((function(a,r){a.forEach((function(a,c){var i=H(n,r,c);1===a&&[2,3].includes(i)||(0===a&&3===i?(t.push({x:c,y:r,state:1}),e=!0):1===n[r][c]&&(t.push({x:c,y:r,state:0}),e=!0))}))})),t.length>0&&J(d(t)),e||o(!1)},H=function(e,t,n){var a=0;return n>0&&t>0&&(a+=e[t-1][n-1]),n<e[t].length-1&&t>0&&(a+=e[t-1][n+1]),n>0&&t<e.length-1&&(a+=e[t+1][n-1]),n<e[t].length-1&&t<e.length-1&&(a+=e[t+1][n+1]),n>0&&(a+=e[t][n-1]),n<e[t].length-1&&(a+=e[t][n+1]),t>0&&(a+=e[t-1][n]),t<e.length-1&&(a+=e[t+1][n]),a};return Object(A.jsxs)(p.a,{sx:{alignItems:"center",width:"100vw",display:"flex",flexDirection:{md:"column"}},mt:7,children:[Object(A.jsxs)(v.a,{direction:"row",children:[Object(A.jsx)(y.a,{variant:"h3",gutterBottom:!0,children:"Conway's Game of Life"}),Object(A.jsx)(g.a,{title:"Click squares to set up a pattern then either press progress to step once or start",children:Object(A.jsx)(C.a,{"aria-label":"Click squares to set up a pattern then either press progress to step once or start",children:Object(A.jsx)(S.a,{})})})]}),Object(A.jsxs)(v.a,{direction:"row",spacing:2,children:[Object(A.jsx)(k.a,{onClick:D,children:Object(A.jsx)(E.a,{})}),Object(A.jsx)(k.a,{onClick:function(){return o(!0)},children:Object(A.jsx)(I.a,{})}),Object(A.jsx)(k.a,{onClick:function(){return o(!1)},children:Object(A.jsx)(z.a,{})}),Object(A.jsx)(k.a,{onClick:function(){J(b(q))},children:"Random"}),Object(A.jsx)(k.a,{onClick:function(){J(u(n))},children:"Clear"}),Object(A.jsx)(G,{size:n,sizeOnChange:a,randomFillPercent:q,setRandomFillPercent:B,playTime:j,setPlayTime:x})]}),Object(A.jsx)(v.a,{direction:"row",spacing:2,mt:2}),Object(A.jsx)(p.a,{width:500,mt:5,mb:5}),Object(A.jsx)(w.a,{container:!0,id:"board",spacing:0,columns:{xs:n},sx:{width:34*n},children:N.map((function(e,t){return N.map((function(e,n){return Object(A.jsx)(w.a,{item:!0,xs:1,children:Object(A.jsx)(T,{x:n,y:t})},"".concat(t,":").concat(n))}))}))})]})};var K=function(){return Object(A.jsx)("div",{className:"game",children:Object(A.jsx)("div",{className:"game-board",children:Object(A.jsx)(H,{})})})},Q=n(85),U=n(176),W=n(169),X=Object(Q.a)({palette:{mode:"dark"}});r.a.render(Object(A.jsxs)(U.a,{theme:X,children:[Object(A.jsx)(W.a,{}),Object(A.jsx)(h.a,{store:f,children:Object(A.jsx)(K,{})})]}),document.getElementById("root"))}},[[113,1,2]]]);
//# sourceMappingURL=main.5aae8bee.chunk.js.map