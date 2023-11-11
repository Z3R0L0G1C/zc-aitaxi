import { Item, PlayerData, Vector } from "../common";

export class ServerFunctions {
  /** 
   * Server side function for fetching an entity's world position 
   */
  GetEntityCoords(entity: number): Vector

  /** 
   * @returns player's identifier of specified type or null if not found
   */
  GetIdentifier(source: number, type: string): string | null

  /** 
   * @returns player source from a given identifier or null if not found 
   */
  GetSource(identifier: string): number | null

  /** 
   * @param source: Either player's source or also accepts an identifier using QBCore.Functions.GetSource internally
   * @returns Player object 
   */
  GetPlayer(source: number | string): Player

  /** 
   * @param citizenid: Player's citizenid
   * @returns Player object
   */
  GetPlayerByCitizenId(citizenid: string): Player

  /** 
   * @param number: Character's Phone Number
   * @returns Player object
   */
  GetPlayerByPhone(number: number): Player

  /** 
   * @returns Array of all logged in players, ignores players with 'logged-out' state 
   */
  GetPlayers(): number[]

  /** If player with server id 1 is online and all other player IDs are in order without gaps, this object is serialised as an array
   *  otherwise it will be serialised as an object where the key is the server ID and the value is the player object.
   *  You **should** however treat this as an object.
   * @returns Object or Array of players
   */
  GetQBPlayers(): PlayersObject | Player[]

  /**  
   *  @param {string} job: Job name to fetch on duty players for
   *  @returns tuple of player id array and the number of players on duty with the specified job
   */
  GetPlayersOnDuty(job: string): [number[], number]

  /** 
   *  @param {string} job: Job name to fetch on duty players for
   *  @returns count of players on duty for the specified job 
   */
  GetDutyCount(job: string): number

  /**
   * QBCore.Functions.GetBucketObjects
   * @returns Routing Bucket objects for players and entities
   */
  GetBucketObjects(): [PlayerBucketObj, EntityBucketObj]

  /**
   * QBCore.Functions.SetPlayerBucket
   * Adds the player to specified routing bucket
   * @param player_source 
   * @param bucket
   * @returns true if successful
   */
  SetPlayerBucket(player_source: number, bucket: number): boolean

  /**
   * QBCore.Functions.SetPlayerBucket
   * Adds the entity to specified routing bucket
   * @param entity 
   * @param bucket
   * @returns true if successful
   */
  SetEntityBucket(entity: number, bucket: number): boolean

  /**
   * QBCore.Functions.GetPlayersInBucket
   * @param bucket Routing bucket number
   * @returns array of all player ids in the bucket
   */
  GetPlayersInBucket(bucket: number): number[]

  /**
   * QBCore.Functions.GetEntitiesInBucket
   * @param bucket Routing bucket number
   * @returns array of all entity handles in the bucket or false if it is empty
   */
  GetEntitiesInBucket(bucket: number): number[] | false

  /**
   * QBCore.Functions.IsPlayerInBucket
   * @param player_source 
   * @param bucket 
   * @returns true if the player is in the specified bucket
   */
  IsPlayerInBucket(player_source: number, bucket: number): boolean

  /** 
   * Registers a new server callback, use QBCore.Functions.TriggerCallback on the client side to trigger the callback 
   */
  CreateCallback(name: string, cb: (source: number, cb: Function, ...args: any[]) => void): void

  /** 
   * Triggers a server callback 
   */
  TriggerCallback(name: string, source: number, cb: Function, ...args: any[]): void

  /** 
   * registers a callback function that will be triggered when a player uses the specified item 
   */
  CreateUseableItem(item: string, cb: (source: number, item: Item) => void): void

  /** 
   * @returns true if the specified item has a callback when used
   */
  CanUseItem(item: string): boolean

  /** 
   * Triggers the item callback for the specified item. Note: This does not remove the item from the player 
   */
  UseItem(source: number, item: string): void

  /** 
   * Used internally on connection, use DropPlayer instead 
   */
  Kick(source: number, reason: string, setKickReason: Function, deferrals: any): void

  /** Only use when QBCore.Config.Whitelist is set to true
   * @returns true if the player is whitelisted 
   */
  IsWhitelisted(source: number): boolean

  /** 
   * Sets the player's admin privileges to the specified level, updates permission list and database
   */
  AddPermission(source: number, permission: number): void

  /** 
   * Sets the player's permission level to 'user', deletes from database 
   */
  RemovePermission(source: number): void

  /** 
   * @returns true if the user has the specified permission 
   */
  HasPermission(source: number, permission: string): boolean

  /** 
   * @returns the user's permission level 
   */
  GetPermission(source: number): string

  /** Should be IsOnDuty but this function name is in dutch?
   * @returns if the player is an admin, returns their ON DUTY status 
   */
  IsOptin(source: number): boolean

  /** Should be ToggleDuty but this function name is in dutch? 
   *  If the player is an admin, it will toggle their ON DUTY status
   */
  ToggleOptin(source: number): void

  /** 
   * @returns true if the player is banned 
   */
  IsPlayerBanned(source: number): boolean

  /** 
   * @returns true if there is already a player online with this license 
   */
  IsLicenseInUse(license: string): boolean
}

// Global player functions
export class PlayerFunctions {
  /** 
   * Internal function, constructor to player class 
   */
  CreatePlayer(): Player

  /** 
   * Saves the player to the database
   */
  Save(source: number): void

  /** 
   * Gives the player 'logged out' status, e.g. the state they have before and during character selection 
   */
  Logout(source: number): void

  /** 
   * Deletes a player's character from the database
   */
  DeleteCharacter(source: number, citizenid: string): void

  /** 
   * Internal function, fetches from database and parses saved inventory data during character loading
   */
  LoadInventory(PlayerData: PlayerData): PlayerData

  /** 
   * Saves the player's currently active character's inventory to the database 
   */
  SaveInventory(source: number): void

  /** 
   * Calculates the total weight of a list of items 
   */
  GetTotalWeight(items: Item[]): number

  /** 
   * Returns an array of all of the inventory slots that currently hold a specified item 
   */
  GetSlotsByItem(items: Item[], itemName: string): number[]

  /** 
   * Returns the first slot that holds a specified item 
   */
  GetFirstSlotByItem(items: Item[], itemName: string): number

  /** 
   * Internal function, generates a new unique citizenid for a new character 
   */
  CreateCitizenId(): string

  /** 
   * Internal function, generates a new unique fingerprint for a new character 
   */
  CreateFingerId(): string

  /** 
   * Internal function, generates a new unique crypto-wallet id for a new character 
   */
  CreateWalletId(): string

  /** 
   * Internal function, generates a new unique phone id for a new character 
   */
  CreateSerialNumber(): string
}

export declare interface Player {
  PlayerData: PlayerData;
  Functions: SelfFunctions;
}

declare interface PlayersObject {
  [key: number]: Player
}

// Functions that the player object can call on itself
export class SelfFunctions {
  /** 
   * Refreshes the player's playerdata, if second argument is true it refreshes commands 
   */
  UpdatePlayerData(dontUpdateChat: boolean): void

  /** 
   * Sets the job of a player at the specified grade
   * @returns true if the job was set, false otherwise 
   */
  SetJob(job: string, grade: string | number): boolean
  
  /** 
   * Sets the gang of a player at the specified grade
   * @returns true if the gang was set, false otherwise 
   */
  SetGang(gang: string, grade: string | number): boolean

  /** 
   * Sets the duty state of a player to the specified boolean 
   */
  SetJobDuty(onDuty: boolean): void

  /** 
   * Sets the specified metadata key to the specified value 
   */
  SetMetaData(meta: string, value: any): void

  /** 
   * Increase the player's job reputation by given amount 
   */
  AddJobReputation(amount: number): void

  /** 
   * Adds to the player's balanced a specified amount of the specified type
   * Optional reason argument is used in logs 
   * @returns true if the balance was added, false otherwise
   */
  AddMoney(type: string, amount: number, reason?: string): boolean

  /** 
   * Removes a specified amount of money from the player's balance of the specified type
   * Optional reason argument is used in logs
   * @returns true if the balance was removed, false otherwise 
   */
  RemoveMoney(type: string, amount: number, reason?: string): boolean

  /** 
   * Overwrites the players balance of a specified type with the specified amount
   * Optional reason argument is used in logs
   * @returns true if the balance was set, false otherwise
   */
  SetMoney(type: string, amount: number, reason?: string): boolean

  /** 
   * @returns the player's balance of the specified type 
   */
  GetMoney(type: string): number

  /** 
   *  Adds a specified amount of a specified item to the player's inventory
   *  Optional slot param to specify a specific inventory slot to add to
   *  Optional info param to add metadata to the item
   *  @returns true if the item was added, false otherwise
   */
  AddItem(item: string, amount: number, slot?: number, info?: any): boolean

  /** 
   * Removes a specified amount of a specified item from the player's inventory
   * Optional slot param to specify a specific inventory slot to remove from
   * @returns true if the item was removed, false otherwise 
   */
  RemoveItem(item: string, amount: number, slot?: number): boolean

  /** 
   * Overwrites the player's inventory with the specified contents
   * Refreshes the player's commands if second argument is true
   */
  SetInventory(items: Item[], dontUpdateChat: boolean): void

  /** 
   * Wipes the player's inventory 
   */
  ClearInventory(): void

  /** 
   * Fetches the specified item in the player's inventory at the first matching slot
   * @returns the item if the player has it, null otherwise 
   */
  GetItemByName(item: string): Item | null

  /** 
   *  Fetches the specified item in the player's inventory across all slots
   *  @returns all matching items if the player has them, null otherwise
   */
  GetItemsByName(item: string): Item[] | null

  /** 
   * Sets the player's card number charinfo data to the specified value 
   */
  SetCreditCard(cardNumber: string): void

  /** 
   * Fetches the player's card and checks if the item has the metadata matching the card number
   * @param cardNumber: The number of the card
   * @param type: Name of the card item to find
   * @returns inventory slot that the item is in 
   */
  GetCardSlot(cardNumber: string, type: string): number | null

  /** 
   * Fetches the item in a specified slot
   * @returns Item in the specified slot or null if the slot is empty 
   */
  GetItemBySlot(slot: number): Item | null

  /** 
   * Saves the player to the database, shorthand for QBCore.Player.Save(self.PlayerData.source) 
   */
  Save(): void
}

export declare class Commands {
  /** 
   *  Refreshes commands for specified player
   */
  Refresh(source: number): void
  
  /** 
   * Adds a new command
   * @param name: The name of the command
   * @param help: Help text for the command
   * @param arguments: Declare expected arguments and provide help text for each argument
   * @param argsrequire: If true the user must enter all arguments
   * @param callback: Callback function to run when the command is executed, passes params source, args
   * @param permission: Permission level required to execute the command
   */
  Add(name: string, help: string, arguments: CommandHelp[], argsrequire: boolean, callback: (source: number, args: any) => void, permission: string): void

  List: Command[]
}

declare interface Command {
  [key: string]: {
    permission: string;
    arguments: CommandHelp,
    name: string,
    help: string,
    argsrequired: boolean,
    callback: Function
  }
}

declare interface CommandHelp {
  name: string;
  help: string;
}

export declare interface UseableItem {
  [key: string]: Function
}

export declare interface PlayerBucket {
  player_id: number;
  player_bucket: number;
}

export declare interface PlayerBucketObj {
  [key: string]: PlayerBucket
}
export declare interface EntityBucket {
  entity_id: number;
  entity_bucket: number;
}

export declare interface EntityBucketObj {
  [key: number]: EntityBucket
}