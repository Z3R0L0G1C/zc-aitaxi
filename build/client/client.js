"use strict";(()=>{var l=t=>new Promise(a=>setTimeout(a,t)),e=[];function P(t){return Math.floor(Math.random()*t)}e[0]=new Array;e[0].Debug=!1;e[0].DebugVerbose=!1;e[0].DebugCommands=!1;e[0].TaxiCabHash="taxi";e[0].CashAsItem=!0;e[0].CommandCoolDownTime=5;e[0].IdleTimer=1;e[0].CostPerUnit=.05;e[1]=["g_m_m_armgoon_01","g_m_m_korboss_01","mp_m_avongoon"];var E=global.exports,q=E["qb-core"].GetCoreObject(),i,y,I=!1,S=[],D,N=PlayerId(),V,x;var R,c,T=!1,w,k=0,M=!1,B=!1,_,h,v=!1,d;V=setTick(async()=>{await l(5e3),D===!1&&T&&(e[0].Debug&&console.log("NeedBlip is now false"),SetBlipScale(c,0),RemoveBlip(c),T=!1),D===!0&&(T||(e[0].Debug&&console.log("spawning blip"),c=AddBlipForEntity(i),SetBlipSprite(c,198),SetBlipDisplay(c,4),SetBlipScale(c,.5),SetBlipColour(c,2),SetBlipAsShortRange(c,!0),BeginTextCommandSetBlipName("STRING"),AddTextComponentString("Your Taxi Driver"),T=!0))});async function H(){_=setTick(async()=>{if(i!=null){if(!h){var t=GetEntityCoords(PlayerPedId(),!0),a=GetEntityCoords(i,!0),o=GetDistanceBetweenCoords(t[0],t[1],t[2],a[0],a[1],a[2],!1);o<5&&IsControlJustPressed(0,23)&&(emit("zc-aitaxi:client:EnterTaxi",[N]),h=!0),o<10?v||(e[0].Debug&&console.log("Taxi Idle timer started due to distance check"),U(y,i)):d!=0&&(e[0].Debug&&console.log("Taxi Idle timer celared due to distance check"),clearTick(d),d=0,v=!1)}}else d!=0&&(e[0].Debug&&console.log("Taxi Idle timer celared due no taxi"),clearTick(d),d=0,v=!1);i!=null&&IsPedInVehicle(PlayerPedId(),i,!1)&&IsControlJustPressed(0,23)&&(h=!1)})}function G(t){e[0].Debug&&console.log(t)}onNet("zc-aitaxi:client:CreateCabAndDriver",async()=>{if(G("Client Event Create Cab And Driver Called from the server for this client!"),I)emit("QBCore:Notify","You can't call another taxi yet....","error",2e3);else{emit("QBCore:Notify","A taxi will be there shortly...","success",2e3);var t=P(e[1].length),[a,o,n]=GetEntityCoords(GetPlayerPed(-1)),u=GetEntityHeading(GetPlayerPed(-1));e[0].Debug&&console.log("Player Coords : ("+a+","+o+","+n+","+u+")");let[f,r,C]=GetRandomVehicleNode(a,o,n,125,!1,!1,!1),[m,s,p]=GetClosestVehicleNodeWithHeading(r[0],r[1],r[2],0,3,0),[g,b]=GetPointOnRoadSide(a,o,n,0);if(e[0].Debug&&(console.log("Did we find a road? : "+f),console.log("Taxi Spawn Coords : ("+s+")")),f){for(;!HasModelLoaded(e[0].TaxiCabHash)||!HasModelLoaded(e[1][t]);)await l(1e3),RequestModel(e[0].TaxiCabHash),RequestModel(e[1][t]);i==null?i=CreateVehicle(e[0].TaxiCabHash,s[0],s[1],s[2],p,!0,!0):G("There is already a taxi Entity ID: "+i),SetVehicleDoorsLocked(i,1),E["qb-target"].AddTargetEntity(i,{options:[{type:"client",event:"zc-aitaxi:client:EnterTaxi",icon:"fas fa-dollar",label:"Enter Taxi",src:N,item:"cash"}],distance:2.5}),S.push(i),e[0].Debug&&console.log("The spawned taxi has entity id : "+i),y=CreatePedInsideVehicle(i,4,e[1][t],-1,!0,!0),SetPedStayInVehicleWhenJacked(y,!0),D=!0,S.push(y),z(i,y,b[0],b[1],b[2],10,10,!1),I=!0,J(),H()}else emit("QBCore:Notify","Can't find a way to you! Find a road!","error")}});on("zc-aitaxi:client:EnterTaxi",async t=>{TaskEnterVehicle(PlayerPedId(),i,500,2,16,0,0),emit("zc-aitaxi:client:ShowMeter"),x=setTick(async()=>{await l(1500),GetFirstBlipInfoId(8)!==0&&(clearTick(x),O())}),emit("QBCore:Notify","Please set a GPS marker to start your ride!","success")});function O(){if(GetFirstBlipInfoId(8)!==0){M=!0;let o=GetFirstBlipInfoId(8),[n,u,f]=GetBlipInfoIdCoord(o),r=GetEntityCoords(PlayerPedId(),!0),C=n,m=u,s=f;var t=parseInt(GetDistanceBetweenCoords(r[0],r[1],r[2],C,m,s,!1).toString());k=parseInt((e[0].CostPerUnit*t).toString());var a=["arrived",k];emit("zc-aitaxi:client:UpdateMeterDisplay",a),e[0].Debug&&console.log("The Distance Traveled for fare calculation is : "+t);let[p,g]=GetClosestVehicleNode(C,m,s,1,3,0);z(i,y,g[0],g[1],g[2],25,55,!0),emit("QBCore:Notify","Starting GPS route! Please hang on to your seat!","success")}else e[0].Debug&&console.log("could not find a gps waypoint")}on("zc-aitaxi:client:StartRoute",async t=>{});on("onResourceStop",t=>{GetCurrentResourceName()==t&&(e[0].Debug&&console.log(`${t} is shutting down, deleting entities!`),A(S),clearTick(x),clearTick(R),clearTick(V))});function A(t){for(let a=0;a<t.length;a++)DeleteEntity(t[a]),DeleteObject(t[a])}async function F(){await l(1e4),A(S),RemoveBlip(c),i=null,y=null,M=!1,w=!1,B=!1}async function z(t,a,o,n,u,f,r,C){TaskVehicleDriveToCoordLongrange(a,t,o,n,u,r,786603,f),SetDriveTaskDrivingStyle(a,786603),SetDriverAggressiveness(a,0),SetEntityMaxSpeed(t,45/2.236936);var m=!1;if(C){R=setTick(async()=>{IsControlJustPressed(0,51)&&(e[0].Debug&&console.log("Faster Ride was requested"),w=!0)});var s=setTick(async()=>{var[p,g,b]=GetEntityCoords(PlayerPedId());await l(1e3),w&&(SetEntityMaxSpeed(t,75/2.236936),SetDriveTaskDrivingStyle(a,787004),SetDriverAggressiveness(a,1)),e[0].DebugVerbose&&console.log("Distance to destination : "+GetDistanceBetweenCoords(p,g,b,o,n,u,!0)),GetDistanceBetweenCoords(p,g,b,o,n,u,!1)<f+5&&(B||(emitNet("zc-aitaxi:server:PayFare",GetPlayerServerId(PlayerId()),k),B=!0),await l(3e3),m==!1&&(emit("zc-aitaxi:client:ShowMeter"),m=!0),TaskLeaveVehicle(PlayerPedId(),t,16),IsPedInAnyVehicle(PlayerPedId(),!1)||(TaskVehicleDriveWander(a,t,25,447),D=!1,await F(),clearTick(s)))})}}async function U(t,a){v=!0,d=setTick(async()=>{await l(e[0].IdleTimer*6e4),h?(e[0].Debug&&console.log("Taxi Idle timer celared"),clearTick(d),d=0,v=!1):(TaskVehicleDriveWander(t,a,25,447),D=!1,e[0].Debug&&console.log("Cleaning up entities due to idleness"),await F())})}async function J(){await l(e[0].CommandCoolDownTime*6e4),I=!1}onNet("zc-aitaxi:client:ShowMeter",()=>{SendNuiMessage(JSON.stringify({type:"open",cost:e[0].CostPerUnit}))});onNet("zc-aitaxi:client:UpdateMeterDisplay",t=>{SendNuiMessage(JSON.stringify({type:"UpdateMeterDisplay",args:t}))});})();
