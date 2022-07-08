const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed, Client, Intents} = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
module.exports={
  data:new SlashCommandBuilder()
  .setName("zweryfikuj")
  .setDescription("Zweryfikuj się na serwerze")
  .addStringOption(option=>option.setName("link").setDescription("Link do weryfikacji")),
  async execute(interaction)
  {
    const string = interaction.options.get('link').value;
    if(string.startsWith("https"))
    {
    const fetch = require('node-fetch');
    const response = await fetch(string);
  const body = await response.text();
  if(body.search("Stark")>=1)
  {
    var guild = client.guilds.cache.get('990972742448844820');
    let role = interaction.guild.roles.cache.find(r => r.id === "990975260239212585");
    const user = interaction.member;
  user.roles.add(role);
  const goodMessage = new MessageEmbed()
  .setTitle("Weryfikacja pomyślna")
  .addFields(
    {name:"Treść: ", value:"Gratulacje! Pomyślnie się zweryfikowałeś"}
  )
  .setColor("#00FFFF")
  .setTimestamp()
  .setFooter("Bananek")
    return interaction.reply({embeds:[goodMessage]});
  }
  else if(body.search("Stark")<1){
    const badMessage = new MessageEmbed()
    .setTitle("Weryfikacja nieudana!")
    .addFields(
      {name:"Treść: ", value:"Nie zweryfikowałeś się! Dołącz najpierw do świata Stark"}
    )
    .setColor("#00FFFF")
    .setTimestamp()
    .setFooter("Bananek")
      return interaction.reply({embeds:[badMessage]});

  }
    }
    else{
      const failureMessage = new MessageEmbed()
      .setTitle("Błąd wykonania komendy!")
      .addFields(
        {name:"Treść", value: "Wiadomość, którą wysłałeś, nie jest linkiem"}
      )
      .setColor("#00FFFF")
      .setFooter("Bananek")
      .setTimestamp()
      return interaction.reply({embeds:[failureMessage]});
    }
  },
}
