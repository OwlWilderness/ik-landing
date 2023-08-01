import { Interaction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Provides information about the server.')
export async function execute(interaction: Interaction) {
  // if we're not repliable then exit
  if (!interaction.isRepliable()) {
    return
  }
  // interaction.guild is the object representing the Guild in which the command was run
  await interaction.reply(
    `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`
  )
}
