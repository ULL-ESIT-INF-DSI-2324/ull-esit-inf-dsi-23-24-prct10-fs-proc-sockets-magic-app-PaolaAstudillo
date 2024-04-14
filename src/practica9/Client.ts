import net from 'net';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface Card {
    id: number;
    name: string;
    manaCost: number;
    color: string;
    type: string;
    rarity: string;
    text: string;
    marketValue: number;
}

function sendCommand(command: string, cardData: Card | unknown, userName: string) {
    const client = new net.Socket();
    const requestData = JSON.stringify({
        action: command,
        card: cardData,
        userName: userName
    });

    client.connect(2424, 'localhost', () => {
        console.log('Connected to server.');
        client.write(requestData + '\n');
    });

    client.on('data', (data) => {
        console.log('Server response:', data.toString());
        client.destroy(); // kill client after server's response
    });

    client.on('close', () => {
        console.log('Connection closed');
    });
}

yargs(hideBin(process.argv))
    .command('add <user> <id> <name> <manaCost> <color> <type> <rarity> <text> <marketValue>', 'Add a new card', (yargs) => {
        return yargs.positional('user', {
            describe: 'User\'s name',
            type: 'string'
        }).options({
            id: { type: 'number', demandOption: true },
            name: { type: 'string', demandOption: true },
            manaCost: { type: 'number', demandOption: true },
            color: { type: 'string', demandOption: true },
            type: { type: 'string', demandOption: true },
            rarity: { type: 'string', demandOption: true },
            text: { type: 'string', demandOption: true },
            marketValue: { type: 'number', demandOption: true },
        });
    }, (argv) => {
        const card: Card = {
            id: argv.id,
            name: argv.name,
            manaCost: argv.manaCost,
            color: argv.color,
            type: argv.type,
            rarity: argv.rarity,
            text: argv.text,
            marketValue: argv.marketValue
        };
        sendCommand('add', card, argv.user as string);
    })
    .command('update <user> <id> <name> <manaCost> <color> <type> <rarity> <text> <marketValue>', 'Update a card', (yargs) => {
        return yargs.positional('user', {
            describe: 'User\'s name',
            type: 'string'
        }).options({
            id: { type: 'number', demandOption: true },
            name: { type: 'string', demandOption: true },
            manaCost: { type: 'number', demandOption: true },
            color: { type: 'string', demandOption: true },
            type: { type: 'string', demandOption: true },
            rarity: { type: 'string', demandOption: true },
            text: { type: 'string', demandOption: true },
            marketValue: { type: 'number', demandOption: true },
        });
    }, (argv) => {
        const card: Card = {
            id: argv.id,
            name: argv.name,
            manaCost: argv.manaCost,
            color: argv.color,
            type: argv.type,
            rarity: argv.rarity,
            text: argv.text,
            marketValue: argv.marketValue
        };
        sendCommand('update', card, argv.user as string);
    })
    .command('delete <user> <id>', 'Delete a card', (yargs) => {
        return yargs.positional('user', {
            describe: 'User\'s name',
            type: 'string'
        }).options({
            id: { type: 'number', demandOption: true }
        });
    }, (argv) => {
        sendCommand('delete', { id: argv.id }, argv.user as string);
    })
    .command('list <user>', 'List all cards of a user', (yargs) => {
        return yargs.positional('user', {
            describe: 'User\'s name',
            type: 'string'
        });
    }, (argv) => {
        sendCommand('list', {}, argv.user as string);
    })
    .command('read <user> <id>', 'Read a card details', (yargs) => {
        return yargs.positional('user', {
            describe: 'User\'s name',
            type: 'string'
        }).options({
            id: { type: 'number', demandOption: true }
        });
    }, (argv) => {
        sendCommand('read', { id: argv.id }, argv.user as string);
    })
    .help()
    .parse();
