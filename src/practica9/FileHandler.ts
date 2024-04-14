import { MagicCard } from '../practica9/Card.js';
import * as fs from 'fs/promises';
import { join } from 'path';

export class MagicFileHandler {
  static async getFilePath(username: string, cardId?: number): Promise<string> {
    const basePath = join(__dirname, '..', 'data', username);
    try {
      await fs.access(basePath);
    } catch {
      await fs.mkdir(basePath, { recursive: true });
    }
    return cardId ? join(basePath, `${cardId}.json`) : basePath;
  }

  static async saveCardToFile(card: MagicCard, username: string): Promise<void> {
    const filePath = await this.getFilePath(username, card.id);
    await fs.writeFile(filePath, JSON.stringify(card, null, 2));
  }

  static async loadCardFromFile(cardId: number, username: string): Promise<MagicCard | null> {
    const filePath = await this.getFilePath(username, cardId);
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      return JSON.parse(fileContent) as MagicCard;
    } catch {
      return null;
    }
  }

  static async deleteCard(cardId: number, username: string): Promise<void> {
    const filePath = await this.getFilePath(username, cardId);
    await fs.unlink(filePath);
  }

  static async loadAllCards(username: string): Promise<MagicCard[]> {
    const basePath = await this.getFilePath(username);
    try {
      const files = await fs.readdir(basePath);
      const cards = await Promise.all(
        files.map(async file => {
          const content = await fs.readFile(join(basePath, file), 'utf8');
          return JSON.parse(content) as MagicCard;
        })
      );
      return cards;
    } catch {
      return [];
    }
  }
}
