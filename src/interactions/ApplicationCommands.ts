import type { Tuple } from 'extended-utility-types';
import type { snowflake } from '../';

/**
 * Application commands are commands that an application can register to
 * Discord. They provide users a first-class way of interacting directly with
 * an application that feels deeply integrated into Discord.
 *
 * @remarks
 * `CHAT_INPUT` command names must be all lowercase matching `^[\w-]{1,32}$`.
 * `USER` and `MESSAGE` commands may be mixed case and can include spaces.
 *
 * @source {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure|Application Commands}
 */
export type ApplicationCommand = ChatInputCommand | UserCommand | MessageCommand;

export interface BaseApplicationCommand {
	/**
	 * Unique ID of the command. Valid for all types.
	 */
	id: snowflake;

	/**
	 * The type of command. Valid for all types.
	 *
	 * @defaultValue `1`
	 */
	type?: ApplicationCommandType;

	/**
	 * Unique ID of the parent application. Valid for all types.
	 */
	application_id: snowflake;

	/**
	 * `1-32` character name. Valid for all types.
	 */
	name: string;

	/**
	 * `1-100` character description for `CHAT_INPUT` commands. Empty string for
	 * `USER` and `MESSAGE` commands. Valid for all types.
	 */
	description: string;

	/**
	 * The parameters for the command. Max `25`. Valid for `CHAT_INPUT` types.
	 */
	options?: Partial<Tuple<ApplicationCommandOption, 25>>;

	/**
	 * Whether the command is enabled by default when the app is added to a
	 * guild. Valid for all types.
	 *
	 * @defaultValue `true`
	 */
	default_permission?: boolean;

	/**
	 * Auto-incrementing version identifier updated during substantial record
	 * changes. Valid for all types.
	 */
	version: snowflake;
}

export interface ChatInputCommand extends BaseApplicationCommand {
	/**
	 * `1` for Chat Input Commands.
	 */
	readonly type: ApplicationCommandType.ChatInput;

	/**
	 * `1-100` character description for `CHAT_INPUT` commands.
	 */
	description: string;

	/**
	 * The parameters for the command. Max `25`.
	 */
	options: Partial<Tuple<ApplicationCommandOption, 25>>;
}

export interface UserCommand extends Omit<BaseApplicationCommand, 'options'> {
	/**
	 * `2` for User Commands.
	 */
	readonly type: ApplicationCommandType.User;

	/**
	 * Empty string for `USER` commands.
	 */
	readonly description: '';
}

export interface MessageCommand extends Omit<BaseApplicationCommand, 'options'> {
	/**
	 * `2` for Message Commands.
	 */
	readonly type: ApplicationCommandType.Message;

	/**
	 * Empty string for `MESSAGE` commands.
	 */
	readonly description: '';
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types|Application Commands}
 */
export enum ApplicationCommandType {
	/**
	 * Slash commands; a text-based command that shows up when a user types `/`.
	 */
	ChatInput = 1,

	/**
	 * A UI-based command that shows up when you right click or tap on a user.
	 */
	User,

	/**
	 * A UI-based command that shows up when you right click or tap on a
	 * message.
	 */
	Message
}

/**
 * @remarks
 * Required `options` must be listed before optional options.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption|Slash Commands}
 */
export interface ApplicationCommandOption {
	/**
	 * The type of option.
	 */
	type: ApplicationCommandOptionType;

	/**
	 * `1-32` lowercase character name matching `^[\w-]{1,32}$`.
	 */
	name: string;

	/**
	 * `1-100` character description.
	 */
	description: string;

	/**
	 * If the parameter is required or optional.
	 *
	 * @defaultValue `false`
	 */
	required?: boolean;

	/**
	 * Choices for `STRING`, `INTEGER`, and `NUMBER` types for the user to pick
	 * from. Max `25`.
	 */
	choices?: Partial<Tuple<ApplicationCommandOptionChoice, 25>>;

	/**
	 * If the option is a subcommand or subcommand group type, this nested
	 * `options` will be the parameters.
	 */
	options?: ApplicationCommandOption[];
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype|Application Command}
 */
export enum ApplicationCommandOptionType {
	SubCommand = 1,
	SubCommandGroup,
	String,

	/**
	 * Any integer between `-2 ^ 53` and `2 ^ 53`.
	 */
	Integer,
	Boolean,
	User,

	/**
	 * Includes all channel types and categories.
	 */
	Channel,
	Role,

	/**
	 * Includes users and roles.
	 */
	Mentionable,

	/**
	 * Any double between `-2 ^ 53` and `2 ^ 53`.
	 */
	Number
}

/**
 * If `choices` are specified for an option, they are the **only** valid values
 * for a user to pick.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice|Slash Commands}
 */
export interface ApplicationCommandOptionChoice {
	/**
	 * `1-100` character choice name.
	 */
	name: string;

	/**
	 * Value of the choice. Up to `100` characters if string.
	 */
	value: string | number;
}

/**
 * All options have names, and an option can either be a parameter and input
 * value–in which case `value` will be set–or it can denote a subcommand or
 * group–in which case it will contain a top-level key and another array of
 * options.
 *
 * `value` and `options` are mutually exclusive.
 *
 * @source {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-interaction-data-option-structure|Application Commands}
 */
export interface ApplicationCommandInteractionDataOption {
	/**
	 * The name of the parameter.
	 */
	name: string;

	/**
	 * Value of {@link ApplicationCommandOptionType}.
	 */
	type: ApplicationCommandOptionType;

	/**
	 * The value of the pair.
	 */
	value?: string | number | boolean | snowflake;

	/**
	 * Present if this option is a group or subcommand.
	 */
	options?: ApplicationCommandInteractionDataOption[];
}

export interface PartialGuildApplicationCommandPermissions {
	/**
	 * The ID of the command.
	 */
	id: snowflake;

	/**
	 * The permissions for the command in the guild.
	 */
	permissions: ApplicationCommandPermissions[];
}

/**
 * Returned when fetching the permissions for a command in a guild.
 *
 * @source {@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure|Application Commands}
 */
export interface GuildApplicationCommandPermissions {
	/**
	 * The ID of the command.
	 */
	id: snowflake;

	/**
	 * The ID of the application the command belongs to.
	 */
	application_id: snowflake;

	/**
	 * The ID of the guild.
	 */
	guild_id: snowflake;

	/**
	 * The permissions for the command in the guild.
	 */
	permissions: ApplicationCommandPermissions[];
}

/**
 * Application command permissions allow commands to be enabled or disabled for
 * specific users or roles within a guild.
 *
 * @source {@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-structure|Application Commands}
 */
export interface ApplicationCommandPermissions {
	/**
	 * The ID of the role or user.
	 */
	id: snowflake;

	/**
	 * Role or user.
	 */
	type: ApplicationCommandPermissionType;

	/**
	 * `true` to allow, `false` to disallow.
	 */
	permission: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type|Application Commands}
 */
export enum ApplicationCommandPermissionType {
	Role = 1,
	User
}
