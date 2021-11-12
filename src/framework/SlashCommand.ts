import type { ApplicationCommandData, ApplicationCommandOptionData, ApplicationCommandPermissionData, CommandInteraction } from 'discord.js'
import type { Awaitable } from '@sapphire/utilities'
import { env } from '../lib'
import { Piece } from '@sapphire/framework'
import type { PieceContext } from '@sapphire/framework'

export abstract class SlashCommand extends Piece {
	public readonly commandData: SlashCommandOptions
	public readonly guildOnly: boolean

	public constructor( context: PieceContext, options: SlashCommandOptions ) {
		super( context, options )

		this.commandData = {
			defaultPermission: options.defaultPermission ?? true,
			description: options.description ?? 'No description provided',
			name: this.name,
			options: options.options ?? [],
			permissions: options.permissions ?? []
		}

		this.guildOnly = env.NODE_ENV === 'development' || ( options.guildOnly ?? false )
	}

	public abstract run( interaction: CommandInteraction ): Awaitable<unknown>
}

export type SlashCommandOptions = ApplicationCommandData & {
	defaultPermission?: boolean
	description?: string
	enabled?: boolean
	guildOnly?: boolean
	options?: ApplicationCommandOptionData[]
	permissions?: ApplicationCommandPermissionData[]
}
