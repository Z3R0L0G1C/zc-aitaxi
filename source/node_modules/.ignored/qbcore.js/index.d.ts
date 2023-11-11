import { ClientFunctions } from "./@types/client";
import { Commands, Player, PlayerFunctions, ServerFunctions, UseableItem } from "./@types/server";
import { Config, PlayerData, Shared } from "./common";

export * from './common'
export * from './@types/client'
export * from './@types/server'

// ================== CLIENT ================================
// ==========================================================

export class Client {
  Shared: Shared
  Functions: ClientFunctions
  PlayerData: PlayerData
  RequestId: number
  Config: Config
  ServerCallbacks: {
    [key: string]: (...args: any[]) => void
  }

  /** 
   * Prints a table in a formatted string in the server console 
   */
  Debug(obj: object | Array<unknown>, indent?: number): void
}

// ================== SERVER ================================
// ==========================================================
export class Server {
  Shared: Shared
  Players: Player[]
  Commands: Commands
  UseableItems: UseableItem[]
  Config: Config
  Functions: ServerFunctions
  Player: PlayerFunctions
  ServerCallbacks: {
    [key: string]: (...args: any[]) => void
  }

  /** 
   * Prints a table in a formatted string in the server console 
   */
   Debug(obj: object | Array<unknown>, indent?: number): void

  /** 
   * Prints a formatted error message in the server console with the resource it came from
   */
  ShowError(resource: string, msg: string): void

  /** 
   * Prints a formatted success log in the server console with the resource it came from 
   */
  ShowSuccess(resource: string, msg: string): void
}