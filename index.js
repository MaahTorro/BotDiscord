// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// DOTENV
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

// importação dos comandos
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const commands = require(filePath)
    if ("data" in commands && "execute" in commands) {
        client.commands.set(commands.data.name, commands)
    } else {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes`)
    }
}

console.log(client.commands) 

// Login do Bot
client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

// Listener de interações com o bot
client.on(Events.InteractionCreate, async interaction =>{
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interaction)
    }
    catch (error) {
        console.error(error)
        await interaction.reply("houve um erro ao executar esse comando")
    }

})  