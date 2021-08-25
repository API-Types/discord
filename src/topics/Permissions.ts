import type { CamelCase, Delimit } from 'extended-utility-types';
import type { snowflake } from '../';

/**
 * Permissions in Discord are a way to limit and grant certain abilities to
 * users. A set of base permissions can be configured at the guild level for
 * different roles. When these roles are attached to users, they grant or
 * revoke specific privileges within the guild. Along with the guild-level
 * permissions, Discord also supports permission overwrites that can be
 * assigned to individual guild roles or guild members on a per-channel basis.
 *
 * @source {@link https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags|Permissions}
 */
export enum PermissionFlags {
	/**
	 * Allows creation of instant invites. Applies to text, voice, and stage
	 * channels.
	 */
	CreateInstantInvite = 1 << 0,

	/**
	 * Allows kicking members.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor
	 * authentication when used on a guild that has server-wide 2FA enabled.
	 */
	KickMembers = 1 << 1,

	/**
	 * Allows banning members.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor
	 * authentication when used on a guild that has server-wide 2FA enabled.
	 */
	BanMembers = 1 << 2,

	/**
	 * Allows all permissions and bypasses channel permission overwrites.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor
	 * authentication when used on a guild that has server-wide 2FA enabled.
	 */
	Administrator = 1 << 3,

	/**
	 * Allows management and editing of channels. Applies to text, voice, and
	 * stage channels.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor
	 * authentication when used on a guild that has server-wide 2FA enabled.
	 */
	ManageChannels = 1 << 4,

	/**
	 * Allows management and editing of the guild.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor
	 * authentication when used on a guild that has server-wide 2FA enabled.
	 */
	ManageGuild = 1 << 5,

	/**
	 * Allows for the addition of reactions to messages. Applies to text
	 * channels.
	 */
	AddReactions = 1 << 6,

	/**
	 * Allows for viewing of audit logs.
	 */
	ViewAuditLog = 1 << 7,

	/**
	 * Allows for using priority speaker in a voice channel. Applies to voice
	 * channels.
	 */
	PrioritySpeaker = 1 << 8,

	/**
	 * Allows the user to go live. Applies to voice channels.
	 */
	Stream = 1 << 9,

	/**
	 * Allows guild members to view a channel, which includes reading messages
	 * in text channels. Applies to text, voice, and stage channels.
	 */
	ViewChannel = 1 << 10,

	/**
	 * Allows for sending messages in a channel. Applies to text channels.
	 */
	SendMessages = 1 << 11,

	/**
	 * Allows for sending of `/tts` messages. Applies to text channels.
	 */
	SendTTSMessages = 1 << 12,

	/**
	 * Allows for deletion of other users messages. Applies to text channels.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor
	 * authentication when used on a guild that has server-wide 2FA enabled.
	 */
	ManageMessages = 1 << 13,

	/**
	 * Links sent by users with this permission will be auto-embedded. Applies
	 * to text channels.
	 */
	EmbedLinks = 1 << 14,

	/**
	 * Allows for uploading images and files. Applies to text channels.
	 */
	AttachFiles = 1 << 15,

	/**
	 * Allows for reading of message history. Applies to text channels.
	 */
	ReadMessageHistory = 1 << 16,

	/**
	 * Allows for using the `@everyone` tag to notify all users in a channel,
	 * and the `@here` tag to notify all online users in a channel. Applies to
	 * text channels.
	 */
	MentionEveryone = 1 << 17,

	/**
	 * Allows the usage of custom emojis from other servers. Applies to text
	 * channels.
	 */
	UseExternalEmojis = 1 << 18,

	/**
	 * Allows for viewing guild insights.
	 */
	ViewGuildInsights = 1 << 19,

	/**
	 * Allows for joining of a voice channel. Applies to voice and stage
	 * channels.
	 */
	Connect = 1 << 20,

	/**
	 * Allows for speaking in a voice channel. Applies to voice channels.
	 */
	Speak = 1 << 21,

	/**
	 * Allows for muting members in a voice channel. Applies to voice and stage
	 * channels.
	 */
	MuteMembers = 1 << 22,

	/**
	 * Allows for deafening of members in a voice channel. Applies to voice and
	 * stage channels.
	 */
	DeafenMembers = 1 << 23,

	/**
	 * Allows for moving of members between voice channels. Applies to voice and
	 * stage channels.
	 */
	MoveMembers = 1 << 24,

	/**
	 * Allows for using voice-activity-detection in a voice channel. Applies to
	 * voice channels.
	 */
	UseVAD = 1 << 25,

	/**
	 * Allows for modification of own nickname.
	 */
	ChangeNickname = 1 << 26,

	/**
	 * Allows for modification of other users nicknames.
	 */
	ManageNicknames = 1 << 27,

	/**
	 * Allows management and editing of roles. Applies to text, voice, and stage
	 * channels.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor
	 * authentication when used on a guild that has server-wide 2FA enabled.
	 */
	ManageRoles = 1 << 28,

	/**
	 * Allows management and editing of webhooks. Applies to text channels.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor
	 * authentication when used on a guild that has server-wide 2FA enabled.
	 */
	ManageWebhooks = 1 << 29,

	/**
	 * Allows management and editing of emojis and stickers.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor
	 * authentication when used on a guild that has server-wide 2FA enabled.
	 */
	ManageEmojisAndStickers = 1 << 30,

	/**
	 * Allows members to use slash commands in text channels. Applies to text
	 * channels.
	 */
	UseApplicationCommands = 1 << 31,

	/**
	 * Allows for requesting to speak in stage channels. Applies to stage
	 * channels.
	 */
	RequestToSpeak = 1 << 32,

	/**
	 * Allows for creating and deleting events.
	 */
	ManageEvents = 1 << 33,

	/**
	 * Allows for deleting and archiving threads, and viewing all private
	 * threads. Applies to text channels.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor
	 * authentication when used on a guild that has server-wide 2FA enabled.
	 */
	ManageThreads = 1 << 34,

	/**
	 * Allows for creating and participating in threads. Applies to text
	 * channels.
	 */
	UsePublicThreads = 1 << 35,

	/**
	 * Allows for creating and participating in private threads. Applies to text
	 * channels.
	 */
	UsePrivateThreads = 1 << 36,

	/**
	 * Allows the usage of custom stickers from other servers. Applies to text
	 * channels.
	 */
	UseExternalStickers = 1 << 37
}

export type Permission =
	| Uppercase<Delimit<CamelCase<Exclude<keyof typeof PermissionFlags, 'UseVAD' | 'SendTTSMessages'>>, '_'>>
	| 'SEND_TTS_MESSAGES'
	| 'USE_VAD';

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-example-partial-role-object|Audit Log}
 */
export interface PartialRole {
	/**
	 * Role ID.
	 */
	id: snowflake;

	/**
	 * Role name.
	 */
	name: string;
}

/**
 * Roles represent a set of permissions attached to a group of users. Roles have
 * unique names, colors, and can be "pinned" to the side bar, causing their
 * members to be listed separately. Roles are unique per guild, and can have
 * separate permission profiles for the global context (guild) and channel
 * context. The `@everyone` role has the same ID as the guild it belongs to.
 *
 * Roles without colors (`color == 0`) do not count towards the final computed
 * color in the user list.
 *
 * @source {@link https://discord.com/developers/docs/topics/permissions#role-object-role-structure|Permissions}
 */
export interface Role extends PartialRole {
	/**
	 * Integer representation of hexadecimal color code.
	 */
	color: number;

	/**
	 * If this role is pinned in the user listing.
	 */
	hoist: boolean;

	/**
	 * Position of this role.
	 */
	position: number;

	/**
	 * Permission bit set.
	 */
	permissions: `${number | bigint}`;

	/**
	 * Whether this role is managed by an integration.
	 */
	managed: boolean;

	/**
	 * Whether this role is mentionable.
	 */
	mentionable: boolean;

	/**
	 * The tags this role has.
	 */
	tags?: RoleTag;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure|Permissions}
 */
export interface RoleTag {
	/**
	 * The ID of the bot this role belongs to.
	 */
	bot_id?: snowflake;

	/**
	 * The ID of the integration this role belongs to.
	 */
	integration_id?: snowflake;

	/**
	 * Whether this is the guild's premium subscriber role.
	 */
	readonly premium_subscriber?: null;
}
