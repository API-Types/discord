import type { Range } from 'extended-utility-types';
import type {
	ActionRow,
	AllowedMentions,
	ComponentType,
	GuildMember,
	Message,
	PartialChannel,
	PartialEmbed,
	PartialGuildMember,
	Role,
	Snowflake,
	User
} from '../';
import type { BaseInteraction, GuildIdentifiable, Identifiable, PartialTuple, WithType } from '../__internal__';

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#a-quick-note-on-limits|Slash Commands}
 */
export enum SlashCommandLimit {
	/**
	 * An app can have up to `100` top-level global commands with unique names.
	 */
	GlobalCommands = 100,

	/**
	 * An app can have up to an additional `100` guild commands per guild.
	 */
	GuildCommands = 100,

	/**
	 * An app can have up to `25` subcommand groups on a top-level command.
	 */
	SubcommandGroups = 25,

	/**
	 * An app can have up to `25` subcommands within a subcommand group.
	 */
	Subcommands = 25,

	/**
	 * Commands can have up to `25` `options`.
	 */
	CommandOptions = 25,

	/**
	 * Options can have up to `25` `choices`.
	 */
	CommandOptionChoices = 25,

	/**
	 * Maximum of `4000` characters for combined name, description, and value properties for each
	 * command and its subcommands and groups.
	 */
	Characters = 4000,

	/**
	 * Global rate limit of `200` application command creates per day per guild.
	 */
	GlobalRateLimit = 200
}

/**
 * An application command is the base "command" model that belongs to an application.
 *
 * @remarks
 * - A command, or each individual subcommand, can have a maximum of `25` `options`.
 * - Required `options` must be listed before optional `options`.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommand|Slash Commands}
 */
export interface ApplicationCommand extends Identifiable, Partial<GuildIdentifiable> {
	/**
	 * Unique ID of the parent application.
	 */
	application_id: Snowflake;

	/**
	 * `1-32` lowercase character name matching `^[\w-]{1,32}$`.
	 */
	name: string;

	/**
	 * `1-100` character description.
	 */
	description: string;

	/**
	 * The parameters for the command.
	 */
	options?: PartialTuple<ApplicationCommandOption, 24>;

	/**
	 * Whether the command is enabled by default when the app is added to a guild.
	 *
	 * @defaultValue `true`
	 */
	default_permission?: boolean;
}

/**
 * @remarks
 * A maximum of `25` `choices` per option can be specified.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption|Slash Commands}
 */
export type ApplicationCommandOption = {
	/**
	 * `1-32` character name matching `^[\w-]{1,32}$`
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
} & (
	| {
			type: 1 | 2;
			options: PartialTuple<ApplicationCommandOption, 24>;
	  }
	| {
			type: 3;
			choices: ApplicationCommandOptionChoiceType<string>;
	  }
	| {
			type: 4;
			choices: ApplicationCommandOptionChoiceType<number>;
	  }
	| {
			type: Range<5, 9>;
	  }
);

type ApplicationCommandOptionChoiceType<T> = PartialTuple<{ name: string; value: T }, 24>;

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype|Application Command}
 */
export enum ApplicationCommandOptionType {
	/**
	 * Organized commands grouped by specifying actions within a command or group.
	 */
	SubCommand = 1,

	/**
	 * Organized subcommands grouped by subcommands with similar actions or resources within a
	 * command.
	 */
	SubCommandGroup,
	String,
	Integer,
	Boolean,
	User,
	Channel,
	Role,
	Mentionable
}

/**
 * If `choices` are specified for an option, they are the **only** valid values for a user to pick.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice|Slash Commands}
 */
export interface ApplicationCommandOptionChoice {
	/**
	 * `1-100` character choice name.
	 */
	name: string;

	/**
	 * Value of the choice, up to `100` characters if string.
	 */
	value: string | number;
}

export interface PartialGuildApplicationCommandPermissions extends Identifiable {
	/**
	 * The permissions for the command in the guild.
	 */
	permissions: ApplicationCommandPermissions[];
}

/**
 * Returned when fetching the permissions for a command in a guild.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#application-command-permissions-object-guild-application-command-permissions-structure|Slash Commands}
 */
export interface GuildApplicationCommandPermissions
	extends PartialGuildApplicationCommandPermissions,
		GuildIdentifiable {
	/**
	 * The ID of the application the command belongs to.
	 */
	application_id: Snowflake;
}

/**
 * Application command permissions allow commands to be enabled or disabled for specific users or
 * roles within a guild.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#application-command-permissions-object-application-command-permissions-structure|Slash Commands}
 */
export interface ApplicationCommandPermissions extends Identifiable, WithType<ApplicationCommandPermissionType> {
	/**
	 * `true` to allow, `false` to disallow.
	 */
	permission: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#application-command-permissions-object-application-command-permission-type|Slash Commands}
 */
export enum ApplicationCommandPermissionType {
	Role = 1,
	User
}

/**
 * An interaction is the base "thing" that is sent when a user invokes a command, and is the same
 * for Slash Commands and other future interaction types.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction|Slash Commands}
 */
export type Interaction = GuildInteraction | DMInteraction;

export interface GuildInteraction extends BaseInteraction, GuildIdentifiable {
	/**
	 * The command data payload.
	 */
	data: ApplicationCommandInteractionData;

	/**
	 * The channel it was sent from.
	 */
	channel_id: Snowflake;

	/**
	 * Guild member data for the invoking user, including permissions.
	 */
	member: GuildMember;

	/**
	 * For components, the message they were attached to.
	 */
	message?: Message;
}

export interface DMInteraction extends Omit<GuildInteraction, 'guild_id' | 'member'> {
	/**
	 * User object for the invoking user.
	 */
	user: User;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype|Slash Commands}
 */
export enum InteractionRequestType {
	Ping = 1,
	ApplicationCommand,
	MessageComponent
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata|Slash Commands}
 */
export interface ApplicationCommandInteractionData extends Identifiable {
	/**
	 * The name of the invoked command.
	 */
	name: string;

	/**
	 * Converted users + roles + channels.
	 */
	resolved?: ApplicationCommandInteractionDataResolved;

	/**
	 * The params + values from the user.
	 */
	options?: PartialTuple<ApplicationCommandInteractionDataOption, 24>;

	/**
	 * For components, the `custom_id` of the component.
	 */
	custom_id?: string;
	values?: string[];

	/**
	 * For components, the `type` of the component.
	 */
	readonly component_type?: ComponentType;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-application-command-interaction-data-resolved-structure|Slash Commands}
 */
export interface ApplicationCommandInteractionDataResolved {
	users?: Record<Snowflake, User>;
	members?: Record<Snowflake, PartialGuildMember & Required<Pick<GuildMember, 'user'>>>;
	roles?: Record<Snowflake, Role>;
	channels?: Record<Snowflake, PartialChannel>;
}

/**
 * All options have names, and an option can either be a parameter and input value–in which case
 * `value` will be set–or it can denote a subcommand or group–in which case it will contain a
 * top-level key and another array of `options`.
 *
 * `value` and `options` are mutually exclusive.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption|Slash Commands}
 */
export type ApplicationCommandInteractionDataOption = {
	/**
	 * The name of the parameter.
	 */
	name: string;
} & (
	| {
			type: 1 | 2;
			options: ApplicationCommandInteractionDataOption[];
	  }
	| {
			type: 3;
			value: string;
	  }
	| {
			type: 4;
			value: number;
	  }
	| {
			type: 5;
			value: boolean;
	  }
	| {
			type: Range<6, 9>;
			value: Snowflake;
	  }
);

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response|Slash Commands}
 */
export interface InteractionResponse extends WithType<InteractionCallbackType> {
	/**
	 * An optional response message.
	 */
	data?: InteractionApplicationCommandCallbackData;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype|Slash Commands}
 */
export enum InteractionCallbackType {
	/**
	 * ACK a `Ping`.
	 */
	Pong = 1,

	/**
	 * Respond to an interaction with a message.
	 */
	ChannelMessageSource = 4,

	/**
	 * ACK an interaction and edit a response later; the user sees a loading state.
	 */
	DeferredChannelMessageSource,

	/**
	 * For components, ACK an interaction and edit the original message later; the user does not see
	 * a loading state.
	 */
	DeferredUpdateMessage,

	/**
	 * For components, edit the message the component was attached to.
	 */
	UpdateMessage
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata|Slash Commands}
 */
export interface InteractionApplicationCommandCallbackData {
	/**
	 * Is the response TTS.
	 */
	tts?: boolean;

	/**
	 * Message content.
	 */
	content?: string;
	embeds?: PartialTuple<PartialEmbed, 9>;

	/**
	 * Allowed mentions object.
	 */
	allowed_mentions?: AllowedMentions;
	flags?: InteractionApplicationCommandCallbackDataFlags;
	components?: PartialTuple<ActionRow, 5>;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response-object-interaction-application-command-callback-data-flags|Slash Commands}
 */
export enum InteractionApplicationCommandCallbackDataFlags {
	/**
	 * Only the user receiving the message can see it.
	 */
	Ephemeral = 1 << 6
}

/**
 * This is sent on the message object when the message is a response to an Interaction.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#messageinteraction|Slash Commands}
 */
export interface MessageInteraction extends Identifiable, WithType<InteractionRequestType> {
	/**
	 * The name of the `ApplicationCommand`.
	 */
	name: string;

	/**
	 * The user who invoked the interaction.
	 */
	user: User;
}
