import { oxmysql as MySQL } from '@overextended/oxmysql';
import { Delay, Config, GetRandomInt } from "../shared/shared.js";
import { Vector3 } from "fivem-js";
import * as Cfx from 'fivem-js';


const Exports:any = global.exports;
export const QBCore = Exports['qb-core'].GetCoreObject();

RegisterCommand("taxi", async(source:number, args:any) => {
    if(Config[0]["Debug"]) {
        console.log("Player " + source + " called for a taxi.");
        emitNet("zc-aitaxi:client:CreateCabAndDriver", source)
    }
}, false);


onNet("zc-aitaxi:server:PayFare", (source:number, fare:number) => {
    console.log(source)
    console.log(fare);
    var Player = QBCore.Functions.GetPlayer(source)
    Player.Functions.RemoveMoney("cash", fare);
    emitNet('inventory:client:ItemBox', source, QBCore.Shared.Items['cash'], "remove", fare)
});




