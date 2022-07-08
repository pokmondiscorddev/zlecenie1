const fs = require('node:fs');
const { Client, Collection, Intents, Permissions } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {clientId, guildId, token}=  require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	if (Object.keys(command).length === 0) continue;
 commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}


client.once('ready', () => {
	console.log('Ready!');
});
const rest = new REST({ version: '9' }).setToken(token);
(async () => {
  try {
    console.log('❯ Odswiezam slashowe komendy');

    await rest.put(Routes.applicationCommands(clientId, guildId), {
      body: commands
    });

    console.log('❯ Skutecznie odswiezylem komendy.');
  } catch (error) {
    console.error(error);
  }
})();


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Wystapil blad podczas wykonania komendy', ephemeral: true });
	}
});


client.login(token);
