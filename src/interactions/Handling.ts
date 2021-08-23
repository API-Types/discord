import type { Tuple } from 'extended-utility-types';
import type {
	ActionRow,
	AllowedMentions,
	ApplicationCommandInteractionDataOption,
	ApplicationCommandOption,
	ApplicationCommandType,
	ComponentType,
	Embed,
	GuildMember,
	Message,
	PartialChannel,
	Role,
	SelectOption,
	snowflake,
	User
} from '../';

/**
 * An Interaction is the message that an application receives when a user uses
 * an application command or a message component.
 *
 * For Slash Commands, it includes the values that the user submitted.
 *
 * For User Commands and Message Commands, it includes the resolved user or
 * message on which the action was taken.
 *
 * For Message Components it includes identifying information about the
 * component that was used. It will also include some metadata about how the
 * interaction was triggered: the `guild_id`, `channel_id`, `member` and other
 * fields.
 *
 * @source {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-structure|Receiving and Responding}
 */
export type Interaction = GuildInteraction | DMInteraction;

export interface BaseInteraction {
	/**
	 * ID of the interaction.
	 */
	id: snowflake;

	/**
	 * ID of the application this interaction is for.
	 */
	application_id: snowflake;

	/**
	 * The type of interaction.
	 */
	type: InteractionType;

	/**
	 * The command data payload.
	 *
	 * @remarks
	 * This is always present on application command and message component
	 * interaction types. It is optional for future-proofing against new
	 * interaction types.
	 */
	data?: InteractionData;

	/**
	 * The guild it was sent from.
	 */
	guild_id?: snowflake;

	/**
	 * The channel it was sent from.
	 */
	channel_id?: snowflake;

	/**
	 * Guild member data for the invoking user, including permissions.
	 *
	 * @remarks
	 * `member` is sent when the interaction is invoked in a guild, and `user`
	 * is sent when invoked in a DM.
	 */
	member?: GuildMember;

	/**
	 * User object for the invoking user, if invoked in a DM.
	 */
	user?: User;

	/**
	 * A continuation token for responding to the interaction.
	 */
	readonly token: string;
	readonly version: 1;

	/**
	 * For components, the message they were attached to.
	 */
	message?: Message;
}

export interface GuildInteraction extends Omit<BaseInteraction, 'user'> {
	/**
	 * The guild it was sent from.
	 */
	guild_id: snowflake;

	/**
	 * Guild member data for the invoking user, including permissions.
	 */
	member: GuildMember & Required<Pick<GuildMember, 'permissions'>>;
}

export interface DMInteraction extends Omit<BaseInteraction, 'guild_id' | 'member'> {
	/**
	 * User object for the invoking user.
	 */
	user: User;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-request-type|Receiving and Responding}
 */
export enum InteractionType {
	Ping = 1,
	ApplicationCommand,
	MessageComponent
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-data-structure|Receiving and Responding}
 */
export type InteractionData = ApplicationCommandInteractionData | ComponentInteractionData;

export interface BaseInteractionData {
	/**
	 * The ID of the invoked command. Present on Application Command interaction
	 * types.
	 */
	id: snowflake;

	/**
	 * The name of the invoked command. Present on Application Command
	 * interaction types.
	 */
	name: string;

	/**
	 * The type of the invoked command. Present on Application Command
	 * interaction types.
	 */
	type: ApplicationCommandType;

	/**
	 * Converted users, roles, and channels. Present on Application Command
	 * interaction types.
	 */
	resolved?: ResolvedData;

	/**
	 * The params and values from the user. Present on Application Command
	 * interaction types.
	 */
	options?: ApplicationCommandOption[];

	/**
	 * The custom ID of the component. Present on Message Component interaction
	 * types.
	 */
	custom_id?: string;

	/**
	 * The type of the component. Present on Message Component interaction
	 * types.
	 */
	component_type?: ComponentType;

	/**
	 * The values the user selected. Present on Message Component (Select Menu)
	 * interaction types.
	 */
	values?: Partial<Tuple<SelectOption, 25>>;

	/**
	 * ID of the user or message targetted by a user or message command. Present
	 * on User Command and Message Command interaction types.
	 */
	target_id?: snowflake;
}

export type ApplicationCommandInteractionData =
	| ChatInputInteractionData
	| UserCommandInteractionData
	| MessageCommandInteractionData;

export interface BaseApplicationCommandInteractionData {
	/**
	 * The ID of the invoked command.
	 */
	id: snowflake;

	/**
	 * The name of the invoked command.
	 */
	name: string;

	/**
	 * The type of the invoked command.
	 */
	type: ApplicationCommandType;
}

export interface ChatInputInteractionData extends BaseApplicationCommandInteractionData {
	/**
	 * `1` for Chat Input Commands.
	 */
	readonly type: ApplicationCommandType.ChatInput;

	/**
	 * Converted users, roles, and channels.
	 */
	resolved: ResolvedData;

	/**
	 * The params and values from the user.
	 */
	options: ApplicationCommandInteractionDataOption[];
}

export interface UserCommandInteractionData extends BaseApplicationCommandInteractionData {
	/**
	 * `2` for User Commands.
	 */
	readonly type: ApplicationCommandType.User;

	/**
	 * ID of the user targetted by the user command.
	 */
	target_id: snowflake;
}

export interface MessageCommandInteractionData extends BaseApplicationCommandInteractionData {
	/**
	 * `3` for Message Commands.
	 */
	readonly type: ApplicationCommandType.Message;

	/**
	 * ID of the message targetted by the message command.
	 */
	target_id: snowflake;
}

export interface ComponentInteractionData {
	/**
	 * The custom ID of the component.
	 */
	custom_id: string;

	/**
	 * The type of the component.
	 */
	component_type: ComponentType;

	/**
	 * The values the user selected.
	 */
	values?: Partial<Tuple<SelectOption, 25>>;
}

/**
 * @remarks
 * If data for a Member is included, data for its corresponding User will also
 * be included.
 *
 * @source {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure|Receiving and Responding}
 */
export interface ResolvedData {
	/**
	 * The IDs and User objects.
	 */
	users?: Readonly<Record<snowflake, User>>;

	/**
	 * The IDs and partial Member objects.
	 */
	members?: Readonly<Record<snowflake, Omit<GuildMember, 'user' | 'deaf' | 'mute'>>>;

	/**
	 * The IDs and Role objects.
	 */
	roles?: Readonly<Record<snowflake, Role>>;

	/**
	 * The IDs and partial Channel objects.
	 */
	channels?: Readonly<Record<snowflake, PartialChannel>>;

	/**
	 * The IDs and partial Message objects.
	 */
	messages?: Readonly<Record<snowflake, Message>>;
}

/**
 * This is sent on the message object when the message is a response to an
 * interaction without an existing message.
 *
 * @remarks
 * This means response to Message Components do not include this property,
 * instead including a message reference object as components *always* exist on
 * pre-existing messages.
 *
 * @source {@link https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure|Receiving and Responding}
 */
export interface MessageInteraction {
	/**
	 * The ID of the interaction.
	 */
	id: snowflake;

	/**
	 * The type of the interaction.
	 */
	type: InteractionType;

	/**
	 * The name of the application command.
	 */
	name: string;

	/**
	 * The user who invoked the interaction.
	 */
	user: User;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-response-structure|Receiving and Responding}
 */
export interface InteractionResponse {
	/**
	 * The type of response.
	 */
	type: InteractionCallbackType;

	/**
	 * An optional response message.
	 */
	data?: InteractionCallbackData;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type|Receiving and Responding}
 */
export enum InteractionCallbackType {
	/**
	 * ACK a `Ping`.
	 */
	Pong = 1,

	/**
	 * Respond to an interaction with a message.
	 */
	ChannelMessageWithSource = 4,

	/**
	 * ACK an interaction and edit a response later. The user sees a loading
	 * state.
	 */
	DeferredChannelMessageWithSource,

	/**
	 * For components, ACK an interaction and edit the original message later.
	 * The user does not see a loading state.
	 */
	DeferredUpdateMessage,

	/**
	 * For components, edit the message the component was attached to.
	 */
	UpdateMessage
}

/**
 * @remarks
 * Not all message fields are currently supported.
 *
 * @source {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure|Receiving and Responding}
 */
export interface InteractionCallbackData {
	/**
	 * Is the response TTS.
	 */
	tts?: boolean;

	/**
	 * Message content.
	 */
	content?: string;

	/**
	 * Supports up to `10` embeds.
	 */
	embeds?: Partial<Tuple<Embed, 10>>;

	/**
	 * Allowed mentions object.
	 */
	allowed_mentions?: AllowedMentions;

	/**
	 * Interaction callback data flags.
	 */
	flags?: InteractionCallbackDataFlags;

	/**
	 * Message components.
	 */
	components?: Partial<Tuple<ActionRow, 5>>;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-flags|Receiving and Responding}
 */
export enum InteractionCallbackDataFlags {
	/**
	 * Only the user receiving the message can see it.
	 */
	Ephemeral = 1 << 6
}
