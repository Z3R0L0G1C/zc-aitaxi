import { Vector3 } from "fivem-js";
const Delay = (time: number) => new Promise(resolve => setTimeout(resolve,time));



let Config: Array<any> = [];

function GetRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
//Start root configs
Config[0] = new Array<any>;
Config[0]["Debug"] = false; //See normal debug messages
Config[0]["DebugVerbose"] = false; //See more detailed and sometimes frame by frame debug info.
Config[0]["DebugCommands"] = false; // Enable debugging commmands
Config[0]["TaxiCabHash"] = `taxi`; //The hash for the "cab" that will spawn this can be any vehicle hash that has 4 doors.  
Config[0]["CashAsItem"] = true; //Is cash an item in your server // This should be false if your Cash as item script is handling item boxes
Config[0]["CommandCoolDownTime"] = 5; //Time in minutes it will take after using the command before you can use it again.
Config[0]["IdleTimer"] = 1; //Time in minutes it will take after for the cab to be considered idle after being called and it will wander and then despawn.
Config[0]["CostPerUnit"] = 0.050; //Cost per unit the taxi driver will charge as fare at the end of the ride


//Ped Hash List
Config[1] = ["g_m_m_armgoon_01", "g_m_m_korboss_01", "mp_m_avongoon"]; //This is the list of peds that could be spawned as the driver of the taxi.





export { Delay, Config, GetRandomInt };






