import { oxmysql as MySQL } from '@overextended/oxmysql';
import { Delay, Config, GetRandomInt } from "../shared/shared.js";
import { Vector3 } from "fivem-js";
import * as Cfx from 'fivem-js';


const Exports:any = global.exports;
export const QBCore = Exports['qb-core'].GetCoreObject();

RegisterCommand("taxi", async(source:number, args:any) => {
    if(Config[0]["Debug"]) {
        console.log("Player " + source + " called for a taxi.");
    }
    var PlayerData = QBCore.Functions.GetPlayer(source).PlayerData;
    var cashOnPlayer = PlayerData.money["cash"];
    if(cashOnPlayer > 5) {
        emitNet("zc-aitaxi:client:CreateCabAndDriver", source);
    } else {
        emitNet("QBCore:Notify", source, "You don't have enough cash to call a taxi!", "error", 2000);
    }
        
    
}, false);

if(Config[0]["DebugCommands"]) {
    RegisterCommand("taxiFareTest", (source:number, args:any) => {
         emit("zc-aitaxi:server:PayFare", source, args[0] )
    }, false);

    RegisterCommand("taxiMeterTest", (source:number, args:any) => {
            emitNet("zc-aitaxi:client:ShowMeter", source, args);
    }, false);

    RegisterCommand("taxiMeterUpdate", (source:number, args:any) => {
        console.log(args);
        emitNet("zc-aitaxi:client:UpdateMeterDisplay", source, args);
}, false);
}



onNet("zc-aitaxi:server:PayFare", (source:number, fare:number) => {
    console.log(source)
    console.log(fare);
    var Player = QBCore.Functions.GetPlayer(source)
    var availableCash = Player.PlayerData.money["cash"];
    if(Config[0]["Debug"]){console.log("Available Cash is : " + availableCash);console.log("Fare is : " + fare);}
        if(availableCash < fare){
            emitNet("QBCore:Notify", source, "You're ripping me off! Get out dont expect another ride!", "error");
            Player.Functions.RemoveMoney("cash", availableCash);
            if(Config[0]["CashAsItem"]){
            emitNet('inventory:client:ItemBox', source, QBCore.Shared.Items['cash'], "remove", availableCash)
            }
        } else {
            emitNet("QBCore:Notify", source, "Thanks for doing business! Come again!", "success");
            Player.Functions.RemoveMoney("cash", fare);
            if(Config[0]["CashAsItem"]){
            emitNet('inventory:client:ItemBox', source, QBCore.Shared.Items['cash'], "remove", fare)
            }
        }
    
});




