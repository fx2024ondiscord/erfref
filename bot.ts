import { Client, GatewayIntentBits, Message, TextChannel } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const VERCEL_API_URL = process.env.VERCEL_API_URL || 'https://erfref.vercel.app/';

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('/linkroblox')) {
    const link = message.content.split(' ')[1];
    if (!link) {
      await message.reply('Please provide a Roblox link. Usage: `/linkroblox <link>`');
      return;
    }

    try {
      const response = await fetch(`${VERCEL_API_URL}/generate-key`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link, userId: message.author.id }),
      });

      const data = await response.json();

      if (data.success) {
        await message.reply(`Key generated: \`${data.key}\``);
      } else {
        await message.reply(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error generating key:', error);
      await message.reply('An error occurred while generating the key. Please try again later.');
    }
  }

  if (message.content.startsWith('/verifykey')) {
    const key = message.content.split(' ')[1];
    if (!key) {
      await message.reply('Please provide a key. Usage: `/verifykey <key>`');
      return;
    }

    try {
      const response = await fetch(`${VERCEL_API_URL}/verify-key`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, userId: message.author.id }),
      });

      const data = await response.json();

      if (data.success) {
        await message.reply(`Access granted. Navigate to: ${data.websiteUrl}`);
      } else {
        await message.reply(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error verifying key:', error);
      await message.reply('An error occurred while verifying the key. Please try again later.');
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

