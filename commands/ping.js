// ping pong :D
const { SlashCommandBuilder } = require("discord.js")

module.exports = { 

    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde seu ping com 'Pong' !!"),

async execute(interaction) {
    await interaction.reply("Pong!")
   } 
}

