import { Vector3 } from "fivem-js";
const Delay = (time: number) => new Promise(resolve => setTimeout(resolve,time));



let Config: Array<any> = [];

function GetRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
//Start root configs
Config[0] = new Array<any>;
Config[0]["Debug"] = true;
Config[0]["DebugCommands"] = true;
Config[0]["TaxiCabHash"] = `taxi`;
Config[0]["CashAsItem"] = true;
Config[0]["CommandCoolDownTime"] = 5; //Time in minutes it will take after using the command before you can use it again.
Config[0]["IdleTimer"] = 3; //Time in minutes it will take after for the cab to be considered idle after being called and it will wander and then despawn.
Config[0]["CostPerUnit"] = 0.050; //Cost per unit the taxi driver will charge as fare at the end of the ride


//Ped Hash List
Config[1] = ["g_m_m_armgoon_01", "g_m_m_korboss_01", "mp_m_avongoon"];





export { Delay, Config, GetRandomInt };






