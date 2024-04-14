import { MagicCard } from "../practica9/Card.js";
import * as fs from 'fs/promises';
import { dirname, join } from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

export class MagicCardCollection {
  private cards: Map<number, MagicCard>;

  constructor(private username: string) {
    this.cards = new Map();
    this.loadCollection().catch(error => console.log(chalk.red('Failed to load collection on init:', error)));
  }

  private getCollectionFilePath(): string {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    return join(__dirname, '../../data', `${this.username}.json`);
  }

  private async loadCollection(): Promise<void> {
    const filePath = this.getCollectionFilePath();
    try {
      const rawData = await fs.readFile(filePath, 'utf8');
      const cardData: MagicCard[] = JSON.parse(rawData);
      cardData.forEach(card => this.cards.set(card.id, card));
    } catch (error) {
      // Si el archivo no existe, simplemente no carga ninguna carta
      if (error.code !== 'ENOENT') {
        console.log(chalk.red('Failed to load collection:'), error);
      }
    }
  }

  private async writeCollection(): Promise<void> {
    const filePath = this.getCollectionFilePath();
    const cardData = Array.from(this.cards.values());
    try {
      await fs.writeFile(filePath, JSON.stringify(cardData, null, 2));
    } catch (error) {
      console.log(chalk.red('Failed to write collection:'), error);
    }
  }

  public async addCard(card: MagicCard): Promise<string> {
    if (this.cards.has(card.id)) {
      return chalk.red(`Error: Card with ID ${card.id} already exists.`);
    }
    this.cards.set(card.id, card);
    await this.writeCollection();
    return chalk.green(`Card with ID ${card.id} added.`);
  }

  public async updateCard(card: MagicCard): Promise<string> {
    if (!this.cards.has(card.id)) {
      return chalk.red(`Error: Card with ID ${card.id} not found.`);
    }
    this.cards.set(card.id, card);
    await this.writeCollection();
    return chalk.green(`Card with ID ${card.id} updated.`);
  }

  public async deleteCard(cardId: number): Promise<string> {
    if (!this.cards.has(cardId)) {
      return chalk.red(`Error: Card with ID ${cardId} not found.`);
    }
    this.cards.delete(cardId);
    await this.writeCollection();
    return chalk.green(`Card with ID ${cardId} deleted.`);
  }

  public listCards(): string {
    if (this.cards.size === 0) {
      return chalk.yellow('No cards in the collection.');
    }
    let response = chalk.green('Listing all cards:\n');
    this.cards.forEach(card => {
      response += `${this.getColor(card.color)}ID: ${card.id}, Name: ${card.name}\n`;
    });
    return response;
  }

  public readCard(cardId: number): string {
    const card = this.cards.get(cardId);
    if (!card) {
      return chalk.red(`Error: Card with ID ${cardId} not found.`);
    }
    return `${this.getColor(card.color)}Card details for ID ${cardId}: ` + JSON.stringify(card, null, 2);
  }

  private getColor(color: string) {
    switch (color.toLowerCase()) {
      case 'white': return chalk.white;
      case 'blue': return chalk.blue;
      case 'black': return chalk.black;
      case 'red': return chalk.red;
      case 'green': return chalk.green;
      case 'grey': return chalk.gray;
      case 'multicolored': return chalk.magenta;  // Example: multicolored could be magenta
      case 'cyan': return chalk.cyan;
      case 'yellow': return chalk.yellow;
      case 'magenta': return chalk.magenta;
      default: return chalk.white;
    }
  }
}
