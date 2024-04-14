import { MagicCard } from "../practica9/Card.js";
import * as fs from 'fs/promises';
import { dirname, join } from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

/**
 * Clase que gestiona una colección de cartas Magic para un usuario específico.
 * Utiliza operaciones de archivos asíncronas para cargar y guardar cartas en formato JSON.
 */
export class MagicCardCollection {
  private cards: Map<number, MagicCard>;

  /**
   * Constructor de la clase MagicCardCollection.
   * @param username El nombre de usuario de la colección.
   */
  constructor(private username: string) {
    this.cards = new Map();
    this.loadCollection().catch(error => console.log(chalk.red('Error al cargar la colección al iniciar:', error)));
  }

  /**
   * Obtiene la ruta al archivo de colección JSON para el usuario.
   * @returns La ruta al archivo JSON.
   */
  private getCollectionFilePath(): string {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    return join(__dirname, '../../data', `${this.username}.json`);
  }

  /**
   * Carga la colección de cartas del archivo JSON.
   */
  private async loadCollection(): Promise<void> {
    const filePath = this.getCollectionFilePath();
    try {
      const rawData = await fs.readFile(filePath, 'utf8');
      const cardData: MagicCard[] = JSON.parse(rawData);
      cardData.forEach(card => this.cards.set(card.id, card));
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.log(chalk.red('Error al cargar la colección:'), error);
      }
    }
  }

  /**
   * Guarda la colección actual de cartas en el archivo JSON.
   */
  private async writeCollection(): Promise<void> {
    const filePath = this.getCollectionFilePath();
    const cardData = Array.from(this.cards.values());
    try {
      await fs.writeFile(filePath, JSON.stringify(cardData, null, 2));
    } catch (error) {
      console.log(chalk.red('Error al escribir la colección:'), error);
    }
  }

  /**
   * Añade una nueva carta a la colección.
   * @param card La carta a añadir.
   * @returns Mensaje indicando el resultado de la operación.
   */
  public async addCard(card: MagicCard): Promise<string> {
    if (this.cards.has(card.id)) {
      return chalk.red(`Error: La carta con ID ${card.id} ya existe.`);
    }
    this.cards.set(card.id, card);
    await this.writeCollection();
    return chalk.green(`Carta con ID ${card.id} añadida.`);
  }

  /**
   * Actualiza una carta existente en la colección.
   * @param card La carta con los datos actualizados.
   * @returns Mensaje indicando el resultado de la operación.
   */
  public async updateCard(card: MagicCard): Promise<string> {
    if (!this.cards.has(card.id)) {
      return chalk.red(`Error: No se encontró la carta con ID ${card.id}.`);
    }
    this.cards.set(card.id, card);
    await this.writeCollection();
    return chalk.green(`Carta con ID ${card.id} actualizada.`);
  }

  /**
   * Elimina una carta de la colección.
   * @param cardId El ID de la carta a eliminar.
   * @returns Mensaje indicando el resultado de la operación.
   */
  public async deleteCard(cardId: number): Promise<string> {
    if (!this.cards.has(cardId)) {
      return chalk.red(`Error: No se encontró la carta con ID ${cardId}.`);
    }
    this.cards.delete(cardId);
    await this.writeCollection();
    return chalk.green(`Carta con ID ${cardId} eliminada.`);
  }

  /**
   * Lista todas las cartas en la colección.
   * @returns Cadena con los detalles de todas las cartas.
   */
  public listCards(): string {
    if (this.cards.size === 0) {
      return chalk.yellow('No hay cartas en la colección.');
    }
    let response = chalk.green('Listado de todas las cartas:\n');
    this.cards.forEach(card => {
      response += `${this.getColor(card.color)}ID: ${card.id}, Nombre: ${card.name}\n`;
    });
    return response;
  }

  /**
   * Muestra los detalles de una carta específica.
   * @param cardId El ID de la carta.
   * @returns Detalles de la carta.
   */
  public readCard(cardId: number): string {
    const card = this.cards.get(cardId);
    if (!card) {
      return chalk.red(`Error: No se encontró la carta con ID ${cardId}.`);
    }
    return `${this.getColor(card.color)}Detalles de la carta con ID ${cardId}: ` + JSON.stringify(card, null, 2);
  }

  /**
   * Obtiene el color correspondiente para el texto de la consola basado en el color de la carta.
   * @param color El color de la carta.
   * @returns La función de chalk que corresponde al color.
   */
  private getColor(color: string) {
    switch (color.toLowerCase()) {
      case 'white': return chalk.white;
      case 'blue': return chalk.blue;
      case 'black': return chalk.black;
      case 'red': return chalk.red;
      case 'green': return chalk.green;
      case 'grey': return chalk.gray;
      case 'multicolored': return chalk.magenta;  // Ejemplo: multicolor podría ser magenta
      case 'cyan': return chalk.cyan;
      case 'yellow': return chalk.yellow;
      case 'magenta': return chalk.magenta;
      default: return chalk.white;
    }
  }
}
