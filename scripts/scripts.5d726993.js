"use strict";angular.module("iamatApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","googlechart"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("iamatApp").controller("MainCtrl",["$scope","iamatService","iamatFactory","resultsFactory","googleChartApiPromise",function(a,b,c,d,e){function f(a){return a.replace(/\w\S*/g,function(a){return a.charAt(0).toUpperCase()+a.substr(1).toLowerCase()})}function g(b,c){return{type:a.graphType,data:{cols:[{id:"t",label:"Topping",type:"string"},{id:"s",label:"Slices",type:"number"}],rows:[{c:[{v:b[0].text},{v:c[0]}]},{c:[{v:b[1].text},{v:c[1]}]},{c:[{v:b[2].text},{v:c[2]}]}]}}}function h(b){console.log(b);var c={answers:[]};b.userTags.todos=c;var d=$("<table/>"),e=$("<tr/>").append($("<th/>").text(" ")),h=$("<tr/>").append($("<td/>").text("Total")),i=$("<tr/>").append($("<td/>").text("Todos")),j=0,k=-1,l=-1,m=0,n=[],o=[],p=[],q=[];b.answers.forEach(function(a,b){j+=a.count,m<a.count&&(m=a.count),n.push([]),o.push([]),p.push(0),q.push(100)}),b.answers.forEach(function(a,c){e.append($("<th/>").text(a.text)),h.append($("<td/>").text(a.count)),0==j?i.append($("<td/>").text(0)):(i.append($("<td/>").text((a.count/j*100).toFixed(1)+"%")),console.log(a.count),b.userTags.todos.answers.push(a.count),a.correct&&(k=c,h.find("td").last().addClass("CorrectCol"),i.find("td").last().addClass("CorrectCol")),m==a.count&&(l=c,h.find("td").last().addClass("MostVotedCol"),i.find("td").last().addClass("MostVotedCol")))}),e.append($("<th/>").text("Total")),h.append($("<td/>").text(j)),i.append($("<td/>").text(j)),d.append(e),d.append(h),d.append(i),Object.keys(b.userTags).forEach(function(c){var d=b.userTags[c];d.key=c,d.team=!1;var e=c;if(c.indexOf("team-")>-1){d.team=!0;for(var h=c.replace("room:team-",""),i=a.teams.length-1;i>=0;i--)if(a.teams[i]._id==h){e=a.teams[i].name;break}}d.name=e.replace("room:",""),d.total=d.answers.sum(),d.max=d.answers.maximum(),d.min=d.answers.minimum(),d.title=f(d.name.replace("_"," ")),d.chartOptions=g(a.results.answers,d.answers),a.tags.push(d)}),a.tags.sort(function(a,b){return a.team!=b.team?a.team?1:-1:a.name<b.name?-1:a.name>b.name?1:0}).forEach(function(a,b){var c=$("<tr/>").attr("id","tag-"+b).append($("<td/>").text(f(a.name.replace("_"," "))));a.answers.forEach(function(d,e){var f=1*(d/a.total*100).toFixed(1);if(p[e]==f&&n[e].push(b),p[e]<f&&(p[e]=f,n[e]=[b]),q[e]==f&&o[e].push(b),q[e]>f&&(q[e]=f,o[e]=[b]),0==a.total)c.append($("<td/>").text(0));else{var g=$("<td/>").text(f+"%");a.max==d?g.addClass("RowMax"):a.min==d&&g.addClass("RowMin"),e==k&&g.addClass("CorrectCol"),e==l&&g.addClass("MostVotedCol"),c.append(g)}}),c.append($("<td/>").text(a.total)),d.append(c)}),n.forEach(function(a,b){a.forEach(function(a){d.find("#tag-"+a+" td").eq(b+1).addClass("ColMax")})}),o.forEach(function(a,b){a.forEach(function(a){d.find("#tag-"+a+" td").eq(b+1).addClass("ColMin")})}),$("#pollResultsPage .content").remove(),$("#pollResultsPage").addClass("background1").append($("<div/>").addClass("content").append($("<h1/>").addClass("title").text(b.question),d))}function i(){a.tags=[],a.teams=[],a.results=d,a.chartObject={},a.graphType="PieChart",a.teams=c,h(a.results)}Array.prototype.maximum=function(){return this.reduce(function(a,b){return Math.max(a,b)},this[0])},Array.prototype.minimum=function(){return this.reduce(function(a,b){return Math.min(a,b)},this[0])},Array.prototype.sum=function(){return this.reduce(function(a,b){return a+Number(b)})},a.triggerChart=function(b){a.graphType=b,e.then(h(a.results))},i()}]),angular.module("iamatApp").service("iamatService",["$http",function(a){var b="dilema2015",c="https://api.iamat.com";return{getTeams:function(){return a.get(c+"/atcodes/"+b+"/teams/")}}}]),angular.module("iamatApp").factory("iamatFactory",function(){var a=[{logo:{ext:"png",filename:"54d8ff3fbb1ab4cf14000a5a",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54d8ff5cbb1ab4cf14000a7b",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Ciudad de Buenos Aires",slug:"Acrónimo",priority:31,rooms:[],_id:"54d8feffbb1ab4cf14000a24",amount:15218},{logo:{ext:"png",filename:"54e5073ec161867c571d1d16",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e51340c161867c571d5f28",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Buenos Aires",slug:"PBA",priority:30,rooms:[],_id:"54efdb76695aa1792d031f6f",amount:5847},{logo:{ext:"png",filename:"54d90028bb1ab4cf14000b8f",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54d9004ebb1ab4cf14000bb4",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Santa Fe",slug:"Acrónimo",priority:29,rooms:[],_id:"54d90006bb1ab4cf14000b68",amount:4140},{logo:{ext:"png",filename:"54e50719c161867c571d1c74",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e506dac161867c571d1bd9",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Mendoza",slug:"Slug",priority:28,rooms:[],_id:"54e48b913a718e04031c082c",amount:1714},{logo:{ext:"png",filename:"54e50714c161867c571d1c66",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e506e7c161867c571d1c01",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Salta",slug:"Acrónimo",priority:27,rooms:[],_id:"54e50898c161867c571d238b",amount:788},{logo:{ext:"png",filename:"54e506dac161867c571d1bda",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50708c161867c571d1c49",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Jujuy",slug:"Acrónimo",priority:26,rooms:[],_id:"54e508d5c161867c571d24f7",amount:418},{logo:{ext:"png",filename:"54e50708c161867c571d1c4c",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50712c161867c571d1c62",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Tierra del Fuego",slug:"Acrónimo",priority:25,rooms:[],_id:"54e508dfc161867c571d252f",amount:281},{logo:{ext:"png",filename:"54e50709c161867c571d1c4d",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50708c161867c571d1c4b",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Tucumán",slug:"Acrónimo",priority:24,rooms:[],_id:"54e50a13c161867c571d2a8f",amount:1166},{logo:{ext:"png",filename:"54e5071cc161867c571d1c7c",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50721c161867c571d1c90",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Formosa",slug:"Acrónimo",priority:23,rooms:[],_id:"54e50a6fc161867c571d2bf5",amount:209},{logo:{ext:"png",filename:"54e506fcc161867c571d1c2b",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e5071ec161867c571d1c83",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"La Rioja",slug:"Acrónimo",priority:22,rooms:[],_id:"54e50ac1c161867c571d2cf6",amount:292},{logo:{ext:"png",filename:"54e5071ec161867c571d1c88",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50723c161867c571d1c9a",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Córdoba",slug:"Acrónimo",priority:21,rooms:[],_id:"54e50ae3c161867c571d2d89",amount:3367},{logo:{ext:"png",filename:"54e506dbc161867c571d1bdc",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e506dcc161867c571d1bdd",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Santiago del Estero",slug:"Acrónimo",priority:20,rooms:[],_id:"54e50b4fc161867c571d2f52",amount:360},{logo:{ext:"png",filename:"54e506fcc161867c571d1c2c",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e506e6c161867c571d1bfd",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Entre Ríos",slug:"Acrónimo",priority:19,rooms:[],_id:"54e50b83c161867c571d30b8",amount:973},{logo:{ext:"png",filename:"54e50734c161867c571d1cff",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50714c161867c571d1c65",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"San Luis",slug:"Acrónimo",priority:18,rooms:[],_id:"54e5106fc161867c571d4e35",amount:309},{logo:{ext:"png",filename:"54e50712c161867c571d1c64",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50726c161867c571d1ca7",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Chaco",slug:"Acrónimo",priority:17,rooms:[],_id:"54e510e1c161867c571d51c1",amount:619},{logo:{ext:"png",filename:"54e50736c161867c571d1d07",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50729c161867c571d1cb2",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"La Pampa",slug:"Acrónimo",priority:16,rooms:[],_id:"54e5114dc161867c571d5474",amount:259},{logo:{ext:"png",filename:"54e506f7c161867c571d1c24",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50732c161867c571d1cec",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Chubut",slug:"Acrónimo",priority:15,rooms:[],_id:"54e511cac161867c571d572e",amount:471},{logo:{ext:"png",filename:"54e506f2c161867c571d1c1a",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50733c161867c571d1cf9",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"San Juan",slug:"Acrónimo",priority:14,rooms:[],_id:"54e51211c161867c571d5898",amount:374},{logo:{ext:"png",filename:"54e506f2c161867c571d1c1b",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50736c161867c571d1d06",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Corrientes",slug:"Acrónimo",priority:13,rooms:[],_id:"54e51242c161867c571d598e",amount:708},{logo:{ext:"png",filename:"54e5072cc161867c571d1cc3",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e50739c161867c571d1d0e",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Neuquen",slug:"Acrónimo",priority:12,rooms:[],_id:"54e51263c161867c571d5a60",amount:553},{logo:{ext:"png",filename:"54e506e8c161867c571d1c05",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e51434c161867c571d639d",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Santa Cruz",slug:"Acrónimo",priority:11,rooms:[],_id:"54e51438c161867c571d63b0",amount:324},{logo:{ext:"png",filename:"54e5072ec161867c571d1cde",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e516f3c161867c571d705c",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Catamarca",slug:"Acrónimo",priority:10,rooms:[],_id:"54e514dcc161867c571d661f",amount:258},{logo:{ext:"png",filename:"54e506f5c161867c571d1c23",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e5152ec161867c571d679e",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Río Negro",slug:"Acrónimo",priority:9,rooms:[],_id:"54e51535c161867c571d67ae",amount:511},{logo:{ext:"png",filename:"54e50709c161867c571d1c4f",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54e515ddc161867c571d6aea",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Misiones",slug:"Acrónimo",priority:8,rooms:[],_id:"54e515f3c161867c571d6b74",amount:347},{logo:{ext:"png",filename:"54f728a7573805670f003101",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54f72ac9573805670f003494",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Chile",slug:"Acrónimo",priority:7,rooms:[],_id:"54edd323ae68deec0505f63c",amount:22},{logo:{ext:"png",filename:"54f72894573805670f0030e8",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54edd3d4ae68deec0505f7db",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Uruguay",slug:"Acrónimo",priority:6,rooms:[],_id:"54edd3ccae68deec0505f7ba",amount:516},{logo:{ext:"png",filename:"54f72872573805670f0030ac",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54f72882573805670f0030c9",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Estados Unidos",slug:"Acrónimo",priority:5,rooms:[],_id:"54f08c37695aa1792d048a6a",amount:135},{logo:{ext:"png",filename:"54f728d1573805670f003167",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54f728dc573805670f00317d",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Paraguay",slug:"Acrónimo",priority:4,rooms:[],_id:"54f728c5573805670f00313c",amount:23},{logo:{ext:"png",filename:"54f728f9573805670f0031ab",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54f72928573805670f00320b",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Bolivia",slug:"Acrónimo",priority:3,rooms:[],_id:"54f728e7573805670f003191",amount:18},{logo:{ext:"png",filename:"54f72955573805670f003264",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54f72aaf573805670f003461",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Brasil",slug:"Acrónimo",priority:2,rooms:[],_id:"54f72948573805670f003248",amount:9},{logo:{ext:"png",filename:"54f72ae6573805670f0034cf",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},cover:{ext:"jpeg",filename:"54f72af3573805670f0034f1",basePath:"http://static.iamat.com/media/",formats:["small","medium","bigscreen","original"]},primary_color:"#000000",secundary_color:"#FFFFFF",name:"Mejico",slug:"Acrónimo",priority:1,rooms:[],_id:"54f72ada573805670f0034bb",amount:24}];return a}),angular.module("iamatApp").factory("resultsFactory",function(){var a={id:"54f4c8c5226cbdaa0b004e45",question:"¿Qué hacés si una mujer con la que estás es la ex de un amigo?",answers:[{text:"Seguís con ella a pesar de todo",count:1496,percentage:16,points:100,image:null,metadata:null},{text:"La largás",count:3227,percentage:34,points:100,image:null,metadata:null},{text:"Lo hablás con tu amigo para que te apruebe la relación",count:4791,percentage:50,points:100,correct:!0,image:null,metadata:null}],timing:{start:1425440042841,countdown:0,open:2e4},image:null,type:"Standard",userTags:{"room:team-54e5106fc161867c571d4e35":{answers:[7,23,38],percentage:[10,34,56]},"room:team-54e50ac1c161867c571d2cf6":{answers:[16,12,19],percentage:[34,26,40]},"room:team-54e50a6fc161867c571d2bf5":{answers:[8,10,20],percentage:[21,26,53]},"room:female":{answers:[669,1120,1995],percentage:[18,30,52]},"room:team-54e50b4fc161867c571d2f52":{answers:[8,17,23],percentage:[17,35,48]},"room:ESTADO_Concubinato":{answers:[194,430,669],percentage:[15,33,52]},"room:facebook":{answers:[903,1877,2760],percentage:[16,34,50]},"room:team-54f08c37695aa1792d048a6a":{answers:[6,12,14],percentage:[19,38,43]},"room:male":{answers:[779,1990,2640],percentage:[14,37,49]},"room:team-54e50898c161867c571d238b":{answers:[24,24,64],percentage:[21,21,58]},"room:ESTADO_Divorciado":{answers:[93,125,209],percentage:[22,29,49]},"room:EDAD_31a41":{answers:[446,996,1385],percentage:[16,35,49]},"room:team-54e508dfc161867c571d252f":{answers:[5,18,35],percentage:[9,31,60]},"room:team-54e51242c161867c571d598e":{answers:[28,37,51],percentage:[24,32,44]},"room:TEST":{answers:[1,0,0],percentage:[100,0,0]},"room:gender_unknown":{answers:[696,1605,2406],percentage:[15,34,51]},"room:team-54efdb76695aa1792d031f6f":{answers:[196,508,679],percentage:[14,37,49]},"room:EDAD_21a30":{answers:[433,1079,1622],percentage:[14,34,52]},"room:ESTADO_SOLTERO":{answers:[716,1805,2632],percentage:[14,35,51]},"room:team-54e510e1c161867c571d51c1":{answers:[26,36,69],percentage:[20,27,53]},"room:team-54e511cac161867c571d572e":{answers:[16,30,45],percentage:[18,33,49]},"room:team-54e508d5c161867c571d24f7":{answers:[11,14,19],percentage:[25,32,43]},"room:team-54e51263c161867c571d5a60":{answers:[20,34,56],percentage:[18,31,51]},"room:EDAD_Menor18":{answers:[80,191,265],percentage:[15,36,49]},"room:EDAD_18a21":{answers:[144,393,549],percentage:[13,36,51]},"room:team-54e51211c161867c571d5898":{answers:[14,19,29],percentage:[23,31,46]},"room:team-54e514dcc161867c571d661f":{answers:[10,14,19],percentage:[23,33,44]},"room:EDAD_62a100":{answers:[19,18,40],percentage:[25,23,52]},"room:team-54e515f3c161867c571d6b74":{answers:[12,22,40],percentage:[16,30,54]},"room:team-54e50a13c161867c571d2a8f":{answers:[22,52,67],percentage:[16,37,47]},"room:team-54e51535c161867c571d67ae":{answers:[12,33,52],percentage:[12,34,54]},"room:team-54e50b83c161867c571d30b8":{answers:[34,57,126],percentage:[16,26,58]},"room:EDAD_52a61":{answers:[83,87,173],percentage:[24,25,51]},"room:twitter":{answers:[211,464,690],percentage:[15,34,51]},"room:team-54e50ae3c161867c571d2d89":{answers:[115,229,361],percentage:[16,32,52]},"room:team-54edd3ccae68deec0505f7ba":{answers:[18,32,52],percentage:[18,31,51]},"room:team-54e48b913a718e04031c082c":{answers:[50,93,145],percentage:[17,32,51]},"room:team-54d8feffbb1ab4cf14000a24":{answers:[448,1069,1504],percentage:[15,35,50]},"room:team-54e5114dc161867c571d5474":{answers:[9,19,35],percentage:[14,30,56]},"room:ESTADO_Viudo":{answers:[22,16,27],percentage:[34,25,41]},"room:team-54d90006bb1ab4cf14000b68":{answers:[143,333,466],percentage:[15,35,50]},"room:team-54edd323ae68deec0505f63c":{answers:[3,0,2],percentage:[60,0,40]},"room:ESTADO_CASADO":{answers:[391,681,1016],percentage:[19,33,48]},"room:team-54e51438c161867c571d63b0":{answers:[9,21,32],percentage:[15,34,51]},"room:anonymous":{answers:[472,1034,1575],percentage:[15,34,51]},"room:EDAD_42a51":{answers:[216,308,547],percentage:[20,29,51]}},result:"showResults",historyId:"54f7434ae9d519421900984f",time:1425490762967};return a}),angular.module("iamatApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="jumbotron"> <h2>{{results.question}} </h2></div> <style type="text/css">#google-visualization-errors-0 {display: none;}</style> <!-- <pre> --v\n  <!-- </pre> --> <h3>Respuestas por grupos:</h3> <h5>Tipo de grafico:</h5> <button class="btn btn-lg" ng-click="triggerChart(\'PieChart\')">PieChart</button> <button class="btn btn-lg" ng-click="triggerChart(\'ColumnChart\')">ColumnChart</button> <h5>Filtrar por categoría:</h5> <div class="row"> <div class="col-sm-12"> <div ng-repeat="tag in tags" class="tag"> <input checked class="btn btn-primary" type="radio" value="tag.name"> {{tag.name}} </div> </div> </div> <!--\n    results.teams.teams[v][\'name\']\n   --> <div class="row marketing"> <div class="col-sm-12" ng-repeat="tag in tags"> <h2>{{tag.title}}</h2> <h4>Votos totales: {{tag.total}}</h4> <div google-chart chart="tag.chartOptions" style="height:400px; width:100%"></div> </div> </div> <div id="pollResultsPage"> <div class="content"></div> </div>')}]);