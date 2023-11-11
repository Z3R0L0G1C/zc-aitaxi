import { Delay, Config, GetRandomInt } from '../shared/shared.js';
import { Vector3 } from "fivem-js";

const Exports = global.exports;
export const QBCore = Exports['qb-core'].GetCoreObject();

var thisTaxi:number;
var thisDriver:number;
var OnCoolDown = false;
var OurCleanupList:any = [];
var NeedBlip:boolean;

const clientID = PlayerId();
var BlipTick:number;
var MissionBlip:any;
var BlipCreated:boolean = false;
var FasterRide:boolean;
var FareCost:number = 0;
var DestinationSet:boolean = false;


BlipTick = setTick( async()=> {
  
  await Delay(5000);
  if(NeedBlip === false) {
    if(BlipCreated){
    console.log("NeedBlip is now false");
    SetBlipScale(MissionBlip,0)
    RemoveBlip(MissionBlip);
    BlipCreated = false;
    }
  }
  if(NeedBlip === true){ 
      if(!BlipCreated) {
    console.log("spawning blip");
    MissionBlip = AddBlipForEntity(thisTaxi);
    SetBlipSprite(MissionBlip, 198)
    SetBlipDisplay(MissionBlip, 4)
    SetBlipScale(MissionBlip, 0.5)
    SetBlipColour(MissionBlip, 2)
    SetBlipAsShortRange(MissionBlip, true)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString("Your Taxi Driver")
    BlipCreated = true;
   }
  }   

});






onNet("zc-aitaxi:client:CreateCabAndDriver", async () => {
  if(!OnCoolDown) {
    OnCoolDown = true;
    CoolDown();
    
    var randomPed = GetRandomInt(Config[1].length);
    var [PedPosX, PedPosY, PedPosZ] = GetEntityCoords(GetPlayerPed(-1));
    var PedPosH = GetEntityHeading(GetPlayerPed(-1));
    if(Config[0]["Debug"]){console.log("Player Coords : (" + PedPosX + "," + PedPosY + "," + PedPosZ +","+ PedPosH +")");}

     const [spawnFound, vehicleSpawnPrimer, nodeid]: [boolean, number[], number] = GetRandomVehicleNode(PedPosX, PedPosY, PedPosZ,75, false, false, false);
     const [spawnFound2, vehicleSpawn, vehicleHeading]: [boolean, number[], number] = GetClosestVehicleNodeWithHeading(vehicleSpawnPrimer[0], vehicleSpawnPrimer[1], vehicleSpawnPrimer[2], 0,3.0,0);
     const [targetFound, vehicleTarget]: [boolean, number[]] = GetPointOnRoadSide(PedPosX, PedPosY, PedPosZ, 0);
    if(Config[0]["Debug"]){console.log("Did we find a road? : " + spawnFound);console.log("Taxi Spawn Coords : (" + vehicleSpawn + ")");}
      if(spawnFound) {
        while(!HasModelLoaded(Config[0]["TaxiCabHash"]) || !HasModelLoaded(Config[1][randomPed])) {
          await Delay(1000); 
          RequestModel(Config[0]["TaxiCabHash"]);
          RequestModel(Config[1][randomPed]);
      }
        if(thisTaxi == null) {
      thisTaxi = CreateVehicle(Config[0]["TaxiCabHash"], vehicleSpawn[0], vehicleSpawn[1], vehicleSpawn[2], vehicleHeading, true, true);
        }
      SetVehicleDoorsLocked(thisTaxi,1);
      // Generate Taxi QB-Target /////////////////////////////////////////////////////////////////////////////////////////////
      Exports['qb-target'].AddTargetEntity(thisTaxi, {
        options: [
          {
                  type: "client",
            event: "zc-aitaxi:client:EnterTaxi",
            icon: "fas fa-dollar",
            label: "Enter Taxi",
            src: clientID,
            item: "cash",
          },
        ],
        distance: 2.5,
      });
      // Generate Taxi QB-Target /////////////////////////////////////////////////////////////////////////////////////////////
      OurCleanupList.push(thisTaxi);
      console.log("The spawned taxi has entity id : " + thisTaxi);
      thisDriver = CreatePedInsideVehicle(thisTaxi,4 , Config[1][randomPed], -1, true, true);
      NeedBlip = true;
      OurCleanupList.push(thisDriver);
      DriveToCoordsAndWait(thisTaxi, thisDriver, vehicleTarget[0], vehicleTarget[1], vehicleTarget[2], 10, 10.0, false)
      } else {
        emit("QBCore:Notify", "Can't find a way to you! Find a road!", "error")
      }    
    } else {
      emit("QBCore:Notify", "You can't call another taxi yet....", "error", 15)
    }
});

on("zc-aitaxi:client:EnterTaxi", async(data:any) => {
  var testTick:number;
   TaskEnterVehicle(PlayerPedId(), thisTaxi, 500, 2, 16, 0,0);
    testTick = setTick(async()=>{

       await Delay(1500) 
       if (GetFirstBlipInfoId(8) !== 0) {
        clearTick(testTick);
        StartRoute();
       }
    });

  
    emit("QBCore:Notify", "Please set a GPS marker to start your ride!", "success")
});

function StartRoute() {
  if (GetFirstBlipInfoId(8) !== 0) {
    DestinationSet = true;
    const waypointBlip = GetFirstBlipInfoId(8);
    const [coordsx, coordsy, coordsz] = GetBlipInfoIdCoord(waypointBlip);
    const playercoords:number[] = GetEntityCoords(PlayerPedId(), true);
    const x = coordsx;
    const y = coordsy;
    const z = coordsz;
    var distanceForFare = parseInt(GetDistanceBetweenCoords(playercoords[0], playercoords[1], playercoords[2], x,y,z, false).toString());
    FareCost = parseInt((Config[0]["CostPerUnit"] * distanceForFare).toString());

    

      if(Config[0]["Debug"]) {console.log("The Distance Traveled for fare calculation is : " + distanceForFare);}
    const [locationFound, parkingPosition]: [boolean,number[]] = GetClosestVehicleNode(x, y, z, 1, 3.0, 0);
    
    
    DriveToCoordsAndWait(thisTaxi, thisDriver, parkingPosition[0], parkingPosition[1], parkingPosition[2], 25.0, 55.0, true)
    emit("QBCore:Notify", "Starting GPS route! Please hang on to your seat!", "success")
} else {
    console.log("could not find a gps waypoint");
}
}




on("zc-aitaxi:client:StartRoute", async(data:any) => {
  
});


on("onResourceStop", (resourceName:string) => {
  
    if(GetCurrentResourceName() != resourceName) {
      return;
    }
  
    if(Config[0]["Debug"]){console.log(`${resourceName} is shutting down, deleting entities!`);}
    CleanUpOurEntities(OurCleanupList);
  });


  function CleanUpOurEntities(CleanupList:any) {
    for(let i = 0; i<CleanupList.length; i++) {
        DeleteEntity(CleanupList[i]);
        DeleteObject(CleanupList[i]);
    }
  }

 async function RemoveEntitiesAfterRide() {
  await Delay(10000);
  CleanUpOurEntities(OurCleanupList);
  RemoveBlip(MissionBlip);
  thisTaxi = null;
  thisDriver = null;
  DestinationSet = false;
  }

async function DriveToCoordsAndWait(vehicle:number, ped:number, x:number,y:number,z:number, stopDistance:number, speed:number, final:boolean) {  
    TaskVehicleDriveToCoordLongrange(ped, vehicle, x,y,z, speed, 786603, stopDistance);
    SetDriveTaskDrivingStyle(ped, 786603);
    SetDriverAggressiveness(ped, 0.0);
    SetEntityMaxSpeed(vehicle,(35/2.236936))
    if (final) {

      var CheckForSpeedTick = setTick(async() => {
        if(IsControlJustPressed(0,51)) {
          if(Config[0]["Debug"]){console.log("Faster Ride was requested");}
          FasterRide = true;
        }
      });
    
    var testForArrival = setTick(async() => {
      var [PedPosX, PedPosY, PedPosZ] = GetEntityCoords(PlayerPedId());
      await Delay(1000);
      if(FasterRide) {
        SetEntityMaxSpeed(vehicle,(65/2.236936)) //Faster driving
        SetDriveTaskDrivingStyle(ped, 537133887);
      }
       // console.log("Distance to destination : " + GetDistanceBetweenCoords(PedPosX, PedPosY, PedPosZ, x, y, z, true));
      if(GetDistanceBetweenCoords(PedPosX, PedPosY, PedPosZ, x, y, z, false) < stopDistance + 5) {
        emitNet("zc-aitaxi:server:PayFare", GetPlayerServerId(PlayerId()), FareCost);
        await Delay(3000);
        TaskLeaveVehicle(PlayerPedId(), vehicle, 16);
        if(!IsPedInAnyVehicle(PlayerPedId(), false)){
        TaskVehicleDriveWander(ped,vehicle, 25.0, 447);
        NeedBlip = false;
        await RemoveEntitiesAfterRide();
        clearTick(testForArrival)
        }
      } else {
       
      }
     
    });
  } else {
 StartIdleTimer(ped, vehicle);
  }
}

async function StartIdleTimer(ped:number, vehicle:number) {
    const IdleTimer = setTick(async() => {
        await Delay(Config[0]["IdleTimer"] * 60000);
        TaskVehicleDriveWander(ped,vehicle, 25.0, 447);
        NeedBlip = false;
        if(Config[0]["Debug"]){console.log("Cleaning up entities due to idleness");}
        await RemoveEntitiesAfterRide();
    });
  if(DestinationSet) {
    clearTick(IdleTimer);
  }
}


async function CoolDown() {
  await Delay(Config[0]["CommandCoolDownTime"] * 60000);
  OnCoolDown = false;
}

