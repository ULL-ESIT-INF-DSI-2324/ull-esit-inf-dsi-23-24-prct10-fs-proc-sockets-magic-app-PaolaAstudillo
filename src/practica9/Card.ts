export enum MagicColor {
    White = "White",
    Blue = "Blue",
    Black = "Black",
    Red = "Red",
    Green = "Green",
    Grey = "Grey",
    Multicolored = "Multicolored",
    Cyan = "Cyan",
    Yellow = "Yellow",
    Magenta = "Magenta"
  }
  
  export enum MagicType {
    Land = "Land",
    Creature = "Creature",
    Enchantment = "Enchantment",
    Sorcery = "Sorcery",
    Instant = "Instant",
    Artifact = "Artifact",
    Planeswalker = "Planeswalker"
  }
  
  export enum MagicRarity {
    Common = "Common",
    Uncommon = "Uncommon",
    Rare = "Rare",
    Mythic = "Mythic"
  }
  
  export class MagicCard {
    constructor(
      public id: number,
      public name: string,
      public manaCost: number,
      public color: MagicColor,
      public type: MagicType,
      public rarity: MagicRarity,
      public text: string,
      public marketValue: number,
      public powerToughness?: [number, number],
      public loyalty?: number
    ) {}
  }
  