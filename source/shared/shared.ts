import { Vector3 } from "fivem-js";
const Delay = (time: number) => new Promise(resolve => setTimeout(resolve,time));



let Config: Array<any> = [];

function GetRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
//Start root configs
Config[0] = new Array<any>;
Config[0]["Debug"] = true;
Config[0]["TaxiCabHash"] = `taxi`;
Config[0]["CommandCoolDownTime"] = 1; //Time in Seconds it will take after using the command before you can use it again.
Config[0]["CostPerUnit"] = 0.050; 


//Ped Hash List
Config[1] = ["g_m_m_armgoon_01", "g_m_m_korboss_01", "mp_m_avongoon"];





export { Delay, Config, GetRandomInt };






