(function(){var e={3482:function(e,t,a){"use strict";a.r(t),t["default"]={home:{title:e=>{const{normalize:t}=e;return t(["Home"])},welcome:e=>{const{normalize:t}=e;return t(["Welcome to Cludo !"])}},about:{title:e=>{const{normalize:t}=e;return t(["About"])},message:e=>{const{normalize:t}=e;return t(["This is an about page."])}},games:{title:e=>{const{normalize:t}=e;return t(["Games"])},search:e=>{const{normalize:t}=e;return t(["Search games"])},previous:e=>{const{normalize:t}=e;return t(["Previous"])},next:e=>{const{normalize:t}=e;return t(["Next"])},page:e=>{const{normalize:t}=e;return t(["Page"])}},404:{title:e=>{const{normalize:t}=e;return t(["404"])},message:e=>{const{normalize:t}=e;return t(["Sorry, this page doesn't exist 😕"])},"go-back":e=>{const{normalize:t}=e;return t(["go back"])},"home-page":e=>{const{normalize:t}=e;return t(["home page"])},"you-may-want-to":e=>{const{normalize:t}=e;return t(["You may want to"])},"or-to-the":e=>{const{normalize:t}=e;return t(["or to the"])}}}},5627:function(e,t,a){"use strict";a.r(t),t["default"]={404:{title:e=>{const{normalize:t}=e;return t(["404"])},message:e=>{const{normalize:t}=e;return t(["Désolé, cette page n'existe pas 😕"])},"go-back":e=>{const{normalize:t}=e;return t(["retourner à la page précédente"])},"home-page":e=>{const{normalize:t}=e;return t(["page d'accueil"])},"or-to-the":e=>{const{normalize:t}=e;return t(["ou à la"])},"you-may-want-to":e=>{const{normalize:t}=e;return t(["Vous voulez peut-être"])}},home:{title:e=>{const{normalize:t}=e;return t(["Accueil"])},welcome:e=>{const{normalize:t}=e;return t(["Bienvenu sur Cludo !"])}},about:{title:e=>{const{normalize:t}=e;return t(["À propos"])},message:e=>{const{normalize:t}=e;return t(["Ceci est une page à propos."])}},games:{title:e=>{const{normalize:t}=e;return t(["Jeux"])},search:e=>{const{normalize:t}=e;return t(["Rechercher un jeu"])},previous:e=>{const{normalize:t}=e;return t(["Précédent"])},next:e=>{const{normalize:t}=e;return t(["Suivant"])},page:e=>{const{normalize:t}=e;return t(["Page"])}}}},3723:function(e,t,a){a(1703);const n=!0;class o{constructor(){this.config={readOnly:!0},this.database={}}_raiseNotImplementedError(e){if(n)throw new Error(`${e} is not implemented`);console.warn(`${e} is not implemented`)}async loadConfig(){this._raiseNotImplementedError("loadConfig")}async load(){this.loadConfig(),this._raiseNotImplementedError("load")}async save(){if(this.config.readOnly)throw new Error("Database is read-only");this._raiseNotImplementedError("save")}getConfig(){return this.config}getDatabase(){return this.database}async search(e){return console.log("Searching with query:",e),this._raiseNotImplementedError("search"),[]}}e.exports=o},4197:function(e,t,a){const n=a(3723),o={includeScore:!0,keys:["id","name","vendor","type","players_min","players_max","age","description","image_url","game_type"],threshold:.4,ignoreLocation:!1};class r extends n{async _createIndex(){this.fuse_index_creating=!0;let e=await this.getDatabase(),t=[];for(let a in e)t.push(e[a]);this.fuse_database=t,this.fuse_index=this.fuse.createIndex(o.keys,this.fuse_database),this.fuse_instance=new this.fuse(this.fuse_database,o,this.fuse_index),this.fuse_index_creating=!1,this.fuse_index_created=!0,this.bus.emit("index_created")}async _ensureIndex(){this.fuse_index_created||this.fuse_index_creating||await this._createIndex(),this.fuse_index_creating&&await new Promise((e=>this.bus.once("index_created",e)))}async search(e){await this._ensureIndex();const t=this.fuse_instance.search(e);return t}}e.exports=r},6925:function(e,t,a){"use strict";a(1703);const n=a(3793),o=a(4197);class r extends o{constructor(e){super(),this.config={},this.database={},this.database_loaded=!1,this.database_loading=!1,this.fuse_index_creating=!1,this.fuse_index_created=!1,this.fuse=e,this.bus=new n,this.api_url="/Cludo-Client/",this.api_url.length>0&&"/"!=this.api_url[this.api_url.length-1]&&(this.api_url+="/")}async _getJSON(e){return new Promise(((t,a)=>{var n=new XMLHttpRequest;n.open("GET",this.api_url+e,!0),n.onreadystatechange=function(){4==n.readyState&&(200==n.status?t(JSON.parse(n.responseText)):a(n.statusText))},n.send()}))}async loadConfig(){return new Promise(((e,t)=>{this.config&&e(),this._getJSON("server_config.json").then((t=>{this.config=t,e()})).catch((e=>{t(e)}))}))}async load(){return new Promise(((e,t)=>{this.database_loading=!0,this.loadConfig().then((()=>{this._getJSON("database.json").then((t=>{this.database=t,this.database_loaded=!0,this.database_loading=!1,this.bus.emit("database_loaded"),this._createIndex(),e()})).catch((e=>{t(e)}))})).catch((e=>{t(e)}))}))}async ensureLoaded(){this.database_loaded||this.database_loading||await this.load(),this.database_loading&&await new Promise((e=>this.bus.once("database_loaded",e)))}async save(){if(this.config.readOnly)throw new Error("Database is read-only");throw new Error("Not implemented")}async getConfig(){return await this.loadConfig(),this.config}async getDatabase(){if(await this.ensureLoaded(),!this.database_loaded)throw new Error("Database is not loaded after loading");if(this.database_loading)throw new Error("Database is loading after loading");return this.database}}e.exports=r},1713:function(e,t,a){"use strict";var n=a(9242),o=a(3396);function r(e,t,a,n,r,s){const i=(0,o.up)("NavbarComponent"),c=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o.Wm)(i),(0,o.Wm)(c)])}var s=a(4329),i=a(7139),c=a.p+"img/logo.df7ea0c5.svg";const l=e=>((0,o.dD)("data-v-b1dc075a"),e=e(),(0,o.Cn)(),e),u=l((()=>(0,o._)("img",{alt:"Logo",src:c,class:"logo"},null,-1))),h=(0,o.Uk)(" | "),d=(0,o.Uk)(" | ");function m(e,t,a,n,r,s){const c=(0,o.up)("router-link"),l=(0,o.up)("LocaleSwitcher");return(0,o.wg)(),(0,o.iD)("nav",null,[(0,o.Wm)(c,{to:"/"},{default:(0,o.w5)((()=>[u])),_:1}),(0,o.Wm)(c,{to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(e.t("home.title")),1)])),_:1}),h,(0,o.Wm)(c,{to:"/games"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(e.t("games.title")),1)])),_:1}),d,(0,o.Wm)(c,{to:"/about"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(e.t("about.title")),1)])),_:1}),(0,o.Wm)(l)])}const g={class:"locale-switcher"};function p(e,t,a,n,r,s){return(0,o.wg)(),(0,o.iD)("div",g,[(0,o._)("button",{class:(0,i.C_)(e.currentLocale),onClick:t[0]||(t[0]=(...t)=>e.switchLocale&&e.switchLocale(...t))},[(0,o._)("span",null,(0,i.zw)(e.currentLocale.toUpperCase()),1)],2)])}var f=(0,o.aZ)({name:"LocaleSwitcher",setup(){const{t:e}=(0,s.QT)({inheritLocale:!0,useScope:"local"});return{t:e}},data(){return{currentLocale:""}},mounted(){try{this.currentLocale="fr"===this.$i18n.global.locale._value?"fr":"en"}catch{this.currentLocale="fr"===navigator.language?"en":"fr"}},methods:{setLocale(e){localStorage.setItem("locale",e),this.$i18n.global.locale._setter(e),this.$i18n.global.locale._value=e,this.currentLocale=e},switchLocale(){"en"===this.currentLocale?this.setLocale("fr"):this.setLocale("en")}}}),w=a(89);const _=(0,w.Z)(f,[["render",p],["__scopeId","data-v-6cf6d34f"]]);var b=_,y=(0,o.aZ)({name:"NavbarComponent",components:{LocaleSwitcher:b},setup(){const{t:e}=(0,s.QT)({inheritLocale:!0,useScope:"global"});return{t:e}}});const v=(0,w.Z)(y,[["render",m],["__scopeId","data-v-b1dc075a"]]);var z=v,k=(0,o.aZ)({components:{NavbarComponent:z},setup(){const{t:e}=(0,s.QT)({inheritLocale:!0,useScope:"global"});return{t:e}}});const x=(0,w.Z)(k,[["render",r]]);var D=x;let C=localStorage.getItem("locale");function L(){const e=a(8973),t={};return e.keys().forEach((a=>{const n=a.match(/([A-Za-z0-9-_]+)\./i);if(n&&n.length>1){const o=n[1];t[o]=e(a).default}})),t}"fr"!==C&&"en"!==C&&(C="fr"===navigator.language?"fr":"en"),localStorage.setItem("locale",C);var S=(0,s.o)({legacy:!1,locale:C||"en",fallbackLocale:"en",messages:L()}),O=a(2483);const I={class:"home"};function P(e,t,a,n,r,s){return(0,o.wg)(),(0,o.iD)("div",I,[(0,o._)("h1",null,(0,i.zw)(e.t("home.welcome")),1)])}var T=(0,o.aZ)({name:"HomeView",setup(){const{t:e}=(0,s.QT)({inheritLocale:!0,useScope:"global"});return{t:e}}});const N=(0,w.Z)(T,[["render",P]]);var Z=N;const j={class:"about"};function q(e,t,a,n,r,s){return(0,o.wg)(),(0,o.iD)("div",j,[(0,o._)("h1",null,(0,i.zw)(e.t("about.message")),1)])}var E=(0,o.aZ)({name:"AboutView",setup(){const{t:e}=(0,s.QT)({inheritLocale:!0,useScope:"global"});return{t:e}}});const U=(0,w.Z)(E,[["render",q]]);var W=U;const $={class:"game-list"},Q={key:0},V={key:1,class:"page-info"};function H(e,t,a,r,s,c){const l=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",$,[(0,o._)("h1",null,(0,i.zw)(e.t("games.title")),1),(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":t[0]||(t[0]=t=>e.text=t),onKeyup:t[1]||(t[1]=t=>e.searchInputHandler())},null,544),[[n.nr,e.text]]),(0,o._)("ul",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.games,((e,t)=>((0,o.wg)(),(0,o.iD)("li",{key:t},[(0,o.Wm)(l,{to:`/games/${e.id}`},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(e.name),1)])),_:2},1032,["to"])])))),128))]),0!=e.games.length?((0,o.wg)(),(0,o.iD)("div",Q,[e.page>0?((0,o.wg)(),(0,o.iD)("button",{key:0,onClick:t[2]||(t[2]=(...t)=>e.previousPage&&e.previousPage(...t))}," ← "+(0,i.zw)(e.t("games.previous")),1)):(0,o.kq)("",!0),e.page>0?((0,o.wg)(),(0,o.iD)("p",V,(0,i.zw)(e.t("games.page"))+" "+(0,i.zw)(e.page+1)+" / "+(0,i.zw)(e.games.length+1),1)):(0,o.kq)("",!0),e.page<e.games.length?((0,o.wg)(),(0,o.iD)("button",{key:2,onClick:t[3]||(t[3]=(...t)=>e.nextPage&&e.nextPage(...t))},(0,i.zw)(e.t("games.next"))+" → ",1)):(0,o.kq)("",!0)])):(0,o.kq)("",!0)])}const M=10;var A=(0,o.aZ)({name:"AboutView",setup(){const{t:e}=(0,s.QT)({inheritLocale:!0,useScope:"global"});return{t:e}},data(){return{games:[],text:"",query:"",page:1}},async mounted(){this.search()},methods:{async search(e){const t=this.page*M;if(!e){let e=await this.database.getDatabase();this.games=[];for(let a=t;a<Math.min(Object.keys(e).length,t+M);a++)e[a]&&this.games.push(e[a]);return}(new Date).getTime();let a=await this.database.search(e);this.games=[];for(let n=t;n<a.length&&n<t+M;n++){let e=a[n];this.games.push(e.item)}},searchInputHandler(){this.query=this.text,this.page=0,this.refresh()},refresh(){this.search(this.query)},previousPage(){this.page--,this.refresh()},nextPage(){this.page++,this.refresh()}}});const G=(0,w.Z)(A,[["render",H],["__scopeId","data-v-6d2855b8"]]);var J=G;const F={class:"game-view"},K={key:0},R={key:1},Y={key:2},B={key:3},X={key:4},ee={key:5},te={key:6},ae=["src"];function ne(e,t,a,n,r,s){return(0,o.wg)(),(0,o.iD)("div",F,[e.name?((0,o.wg)(),(0,o.iD)("h1",K,(0,i.zw)(e.name),1)):(0,o.kq)("",!0),e.id?((0,o.wg)(),(0,o.iD)("p",R," ID : "+(0,i.zw)(e.id),1)):(0,o.kq)("",!0),e.description?((0,o.wg)(),(0,o.iD)("p",Y," Description : "+(0,i.zw)(e.description),1)):(0,o.kq)("",!0),e.designation?((0,o.wg)(),(0,o.iD)("p",B," Designation : "+(0,i.zw)(e.designation),1)):(0,o.kq)("",!0),e.players_min&&e.players_max?((0,o.wg)(),(0,o.iD)("p",X," Players : "+(0,i.zw)(e.players_min)+" - "+(0,i.zw)(e.players_max),1)):(0,o.kq)("",!0),e.type?((0,o.wg)(),(0,o.iD)("p",ee," Type : "+(0,i.zw)(e.type),1)):(0,o.kq)("",!0),e.vendor?((0,o.wg)(),(0,o.iD)("p",te," Vendor : "+(0,i.zw)(e.vendor),1)):(0,o.kq)("",!0),e.image?((0,o.wg)(),(0,o.iD)("img",{key:7,src:"http://ludoacigne.free.fr/jeux/images/"+e.image,class:"game-img"},null,8,ae)):(0,o.kq)("",!0)])}var oe=(0,o.aZ)({name:"GameView",setup(){const{t:e}=(0,s.QT)({inheritLocale:!0,useScope:"global"});return{t:e}},data(){return{name:"",id:"",description:"",designation:"",image_url:"",players_min:"",players_max:"",type:"",vendor:""}},async mounted(){this.gameId=this.$route.params.gameId,this.database=await this.database.getDatabase(),this.game=this.database[this.gameId],this.game?(this.name=this.game.name,this.id=this.game.id,this.description=this.game.description,this.designation=this.game.designation,this.image=this.game.image_url||this.game.image,this.players_min=this.game.players_min,this.players_max=this.game.players_max,this.type=this.game.type,this.vendor=this.game.vendor,document.title=this.name+" - "+document.title):this.$router.push("/404")}});const re=(0,w.Z)(oe,[["render",ne],["__scopeId","data-v-3d727bb6"]]);var se=re;const ie={class:"about"},ce={href:"javascript:history.go(-1)"},le=(0,o.Uk)(". ");function ue(e,t,a,n,r,s){const c=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",ie,[(0,o._)("h1",null,(0,i.zw)(e.t("404.message")),1),(0,o._)("p",null,[(0,o.Uk)((0,i.zw)(e.t("404.you-may-want-to"))+" ",1),(0,o._)("a",ce,(0,i.zw)(e.t("404.go-back")),1),(0,o.Uk)(" "+(0,i.zw)(e.t("404.or-to-the"))+" ",1),(0,o.Wm)(c,{to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(e.t("404.home-page")),1)])),_:1}),le])])}var he=(0,o.aZ)({name:"NotFoundView",setup(){const{t:e}=(0,s.QT)({inheritLocale:!0,useScope:"global"});return{t:e}}});const de=(0,w.Z)(he,[["render",ue]]);var me=de;const ge=[{path:"/",name:"home",component:Z,meta:{title:"Home"}},{path:"/about",name:"about",component:W,meta:{title:"About"}},{path:"/games",name:"games",component:J,meta:{title:"Games"}},{path:"/games/:gameId",name:"game",component:se,meta:{title:"Game"}},{path:"/:pathMatch(.*)*",name:"not-found",component:me,meta:{title:"Not Found"}}],pe=(0,O.p7)({history:(0,O.PO)("/Cludo-Client/"),routes:ge});pe.beforeEach(((e,t,a)=>{e.meta.title?document.title=e.meta.title+" - Cludo":document.title="Cludo",a()}));var fe=pe,we=a(9633),_e=a(6925),be=_e;const ye=(0,n.ri)(D);ye.config.globalProperties.$i18n=S;const ve=new be(we.Z);ve.load(),ye.config.globalProperties.database=ve,ye.use(fe),ye.use(S),ye.mount("#app")},8973:function(e,t,a){var n={"./en.json":3482,"./fr.json":5627};function o(e){var t=r(e);return a(t)}function r(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}o.keys=function(){return Object.keys(n)},o.resolve=r,e.exports=o,o.id=8973}},t={};function a(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,a),r.exports}a.m=e,function(){var e=[];a.O=function(t,n,o,r){if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],r=e[u][2];for(var i=!0,c=0;c<n.length;c++)(!1&r||s>=r)&&Object.keys(a.O).every((function(e){return a.O[e](n[c])}))?n.splice(c--,1):(i=!1,r<s&&(s=r));if(i){e.splice(u--,1);var l=o();void 0!==l&&(t=l)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,o,r]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/Cludo-Client/"}(),function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,r,s=n[0],i=n[1],c=n[2],l=0;if(s.some((function(t){return 0!==e[t]}))){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(c)var u=c(a)}for(t&&t(n);l<s.length;l++)r=s[l],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(u)},n=self["webpackChunkcludo_client"]=self["webpackChunkcludo_client"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(1713)}));n=a.O(n)})();
//# sourceMappingURL=app.7da4455c.js.map