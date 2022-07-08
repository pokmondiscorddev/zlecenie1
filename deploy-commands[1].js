const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	if (Object.keys(command).length === 0) continue;
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}
(async () => {
  try {
    console.log('❯ Refreshing application slash commands...');

    await rest.put(Routes.applicationCommands(clientId, guildId), {
      body: commands
    });

    console.log('❯ Successfully refreshed application slash commands.');
  } catch (error) {
    console.error(error);
  }
})();

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
