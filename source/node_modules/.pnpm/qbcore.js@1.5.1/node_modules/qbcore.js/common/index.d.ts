export class Shared {
  /** 
   * QBCore.Shared.RandomStr
   * @param {number} length: length of the random string
   * @returns {string} string of random characters of the given length
   */
  RandomStr(length: number): string

  /** 
   * QBCore.Shared.RandomInt
   * @param {number} length: length of the random integer
   * @returns {number} random integer of the given length
   */
  RandomInt(length: number): number

  /** 
   * QBCore.Shared.SplitStr
   * @param {string} str: string to split
   * @param {string} delimiter: point at which to split the string
   * @returns {string[]} array containing the two halves of the split string 
   */
  SplitStr(str: string, delimiter: string): string[]

  /** 
   * QBCore.Shared.Round
   * @param {number} num: number to be rounded
   * @param {number} decimal_places: optional number of decimal places to round to
   * @return {number} rounded number
   */
  Round(num: number, decimal_places?: number): number

  /** 
   * QBCore.Shared.Trim:
   * It would however be easier to use the .trim() method of the string class in v8
   * @param {string} str: string to be trimmed
   * @returns {string}: trimmed string with whitespace removed 
   */
  Trim(str: string): string

  /**
   * QBCore.Shared.ChangeVehicleExtra
   * @param vehicle Entity Handle
   * @param extra Vehicle Extra ID
   * @param enable Toggle on / off
   */
  ChangeVehicleExtra(vehicle: number, extra: number, enable: boolean): void

  /**
   * QBCore.Shared.SetDefaultVehicleExtras:
   * Applies vehicle extras to a list
   * @param vehicle Entity Handle
   * @param config Object with the key as the extra id and value as the state
   */
  SetDefaultVehicleExtras(vehicle: number, config: {[key: number]: boolean}): void

  Weapons: {
    [key: number]: Weapon
  }
  Items: {
    [key: string]: Item
  }
  Vehicles: {
    [key: string]: Vehicle
  }
  Gangs: {
    [key: string]: {
      label: string;
      grades: {
        [key: string]: {
          name: string;
          isboss?: boolean;
        }
      }
    }
  }
  Jobs: {
    [key: string]: {
      label: string;
      defaultDuty: boolean;
      grades: {
        [key: string]: {
          name: string;
          payment: number;
          isboss?: boolean;
        }
      }
    }
  }
  StarterItems: {
    [key: string]: {
      amount: number;
      name: string;
    }
  }
}

export class Config {
  DefaultSpawn: Vector;
  MaxPlayers: number;
  Player: PlayerConfig;
  Money: MoneyConfig;
  Server: ServerConfig;
}

declare interface PlayerConfig {
  MaxWeight: number;
  BloodTypes: BloodTypes;
  MaxInvSlots: number;
  HungerRate: number;
  ThirstRate: number;
}

declare interface ServerConfig {
  uptime: number;
  whitelist: boolean;
  closed: boolean;
  PermissionList: any;
  closedReason: string;
  discord: string;
}

declare interface MoneyConfig {
  PayCheckTimeOut: number,
  DontAllowMinus: string[],
  MoneyTypes: {
    [key: string]: number
  }
}

declare type BloodTypes = "A+" | "B-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"

export declare interface Item {
  name: string;
  label: string;
  weight: number;
  type: "weapon" | "item";
  image: string;
  unique: boolean;
  usable: boolean;
  shouldClose: boolean;
  combinable?: ItemCombinable;
  description: string;
  info?: any;
  amount?: any;
}

declare interface ItemCombinableAnim {
  dict: string;
  lib: string;
  text: string;
  timeOut: number;
}

declare interface ItemCombinable {
  accept: string[];
  reward: string;
  anim: ItemCombinableAnim;
}

export declare interface Weapon {
  name: string;
  label: string;
  weight: number;
  type: "weapon" | "item";
  ammotype?: string;
  image: string;
  unique: boolean;
  usable: boolean;
  description: string;
}

export declare interface Vehicle {
  name: string;
  brand: string;
  model: string;
  price: number;
  category: string;
  hash: number;
  shop: string;
}

export declare interface Vector {
  x: number;
  y: number;
  z: number;
  w?: number; // heading
}

declare interface Money {
  [key: string]: number;
}

declare interface MetaData {
  [key: string]: any;
}

export declare interface PlayerData {
  position: Vector;
  source: number;
  cid: number;
  charinfo: CharacterInfo;
  job: Job;
  gang: Gang;
  money: Money;
  name: string;
  citizenid: string;
  LoggedIn: boolean;
  license: string;
  items: Item[];
  inventory: string; // Appears to be JSON serialised version of items
  metadata: MetaData
}

export declare interface CharacterInfo {
  firstname: string;
  lastname: string;
  account: string;
  birthdate: string;
  phone: number;
  nationality: string;
  gender: number;
  cid: string;
  backstory: string; // Unused but is part of the interface
  card?: string | number;
}

export declare interface Grade {
  name: string;
  level: number;
}

export declare interface Gang {
  isboss?: boolean;
  name: string;
  label: string;
  grade: Grade;
}

export declare interface Job {
  isboss?: boolean;
  name: string;
  label: string;
  grade: Grade;
  onduty: boolean;
  payment: number;
}