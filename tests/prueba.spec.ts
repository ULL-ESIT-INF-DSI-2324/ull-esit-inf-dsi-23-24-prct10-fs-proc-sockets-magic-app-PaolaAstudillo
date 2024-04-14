import "mocha";
import { expect } from "chai";
import { MagicCardCollection } from "../src/practica9/CardCollection.js";
import { MagicCard, MagicColor, MagicType, MagicRarity } from "../src/practica9/Card.js";
//no funciona
describe("CardCollection tests", () => {
  let collection: MagicCardCollection;
  const user = "Paola";

  beforeEach(() => {
    collection = new MagicCardCollection(user);
  });

  it("should add a card successfully to an empty collection", () => {
    const card = new MagicCard(
      1,
      "Magic Card",
      50,
      MagicColor.White,
      MagicType.Creature,
      MagicRarity.Rare,
      "Rules of magic.",
      20.00
    );
    const result = collection.addCard(card);
    expect(result).to.include('added');
  });

  it("should not add a duplicate card", () => {
    const card = new MagicCard(
      1,
      "Magic Card",
      50,
      MagicColor.White,
      MagicType.Creature,
      MagicRarity.Rare,
      "Rules of magic.",
      20.00
    );
    collection.addCard(card); // First add
    const result = collection.addCard(card); // Second add
    expect(result).to.include('already exists');
  });
});
