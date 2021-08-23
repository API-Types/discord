import type { Nullable } from 'extended-utility-types';
import type { PartialIntegration, snowflake, StatusType } from '../';

export interface PartialUser {
	/**
	 * The user's ID. Requires the `identify` OAuth2 scope.
	 */
	id: snowflake;

	/**
	 * The user's username, not unique across the platform. Requires the
	 * `identify` OAuth2 scope.
	 */
	username: string;

	/**
	 * The user's 4-digit discord-tag. Requires the `identify` OAuth2 scope.
	 */
	discriminator: `${number}`;

	/**
	 * The user's avatar hash. Requires the `identify` OAuth2 scope.
	 */
	avatar: Nullable<string>;
}

/**
 * Users in Discord are generally considered the base entity. Users can spawn
 * across the entire platform, be members of guilds, participate in text and
 * voice chat, and much more. Users are separated by a distinction of "bot" vs
 * "normal." Although they are similar, bot users are automated users that are
 * "owned" by another user. Unlike normal users, bot users do *not* have a
 * limitation on the number of Guilds they can be a part of.
 *
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-user-structure|User}
 */
export interface User extends PartialUser {
	/**
	 * Whether the user belongs to an OAuth2 application. Requires the
	 * `identify` OAuth2 scope.
	 */
	bot?: boolean;

	/**
	 * Whether the user is an Official Discord System user (part of the urgent
	 * message system). Requires the `identify` OAuth2 scope.
	 */
	system?: boolean;

	/**
	 * Whether the user has two factor enabled on their account. Requires the
	 * `identify` OAuth2 scope.
	 */
	mfa_enabled?: boolean;

	/**
	 * The user's banner, or `null` if unset. Requires the `identify` OAuth2
	 * scope.
	 */
	banner?: Nullable<string>;

	/**
	 * The user's banner color, encoded as an integer representation of a
	 * hexadecimal color coode. Requires the `identify` OAuth2 scope.
	 */
	accent_color?: number;

	/**
	 * The user's chosen language option. Requires the `identify` OAuth2 scope.
	 */
	locale?: string;

	/**
	 * Whether the email on this account has been verified. Requires the `email`
	 * OAuth2 scope.
	 */
	verified?: boolean;

	/**
	 * The user's email. Requires the `email` OAuth2 scope.
	 */
	email?: Nullable<string>;

	/**
	 * The flags on a user's account. Requires the `identify` OAuth2 scope.
	 */
	flags?: UserFlags;

	/**
	 * The type of Nitro subscription on a user's account. Requires the
	 * `identify` OAuth2 scope.
	 */
	premium_type?: PremiumType;

	/**
	 * The public flags on a user's account. Requires the `identify` OAuth2
	 * scope.
	 */
	public_flags?: UserFlags;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-user-flags|User}
 */
export enum UserFlags {
	None,
	DiscordEmployee = 1 << 0,
	PartneredServerOwner = 1 << 1,
	HypesquadEvents = 1 << 2,
	BugHunterLevel1 = 1 << 3,
	MFASMS = 1 << 4,
	PremiumPromoDismissed = 1 << 5,
	HouseBravery = 1 << 6,
	HouseBrilliance = 1 << 7,
	HouseBalance = 1 << 8,
	EarlySupporter = 1 << 9,
	TeamUser = 1 << 10,
	HasUnreadUrgentMessages = 1 << 13,
	BugHunterLevel2 = 1 << 14,
	VerifiedBot = 1 << 16,
	EarlyVerifiedBotDeveloper = 1 << 17,
	DiscordCertifiedModerator = 1 << 18
}

/**
 * Premium types denote the level of premium a user has.
 *
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-premium-types|User}
 */
export enum PremiumType {
	None,
	NitroClassic,
	Nitro
}

export interface PartialConnection {
	/**
	 * ID of the connection account.
	 */
	id: string;

	/**
	 * The username of the connection account.
	 */
	name: string;

	/**
	 * The service of the connection.
	 */
	type: PlatformType;

	/**
	 * Whether the connection is verified.
	 */
	verified: boolean;
}

/**
 * The connection object that the user has attached.
 *
 * @source {@link https://discord.com/developers/docs/resources/user#connection-object-connection-structure|User}
 */
export interface Connection extends PartialConnection {
	/**
	 * Whether the connection is revoked.
	 */
	revoked?: boolean;

	/**
	 * An array of partial server integrations.
	 */
	integrations?: PartialIntegration[];

	/**
	 * Whether friend sync is enabled for this connection.
	 */
	friend_sync: boolean;

	/**
	 * Whether activities related to this connection will be shown in presence
	 * updates.
	 */
	show_activity: boolean;

	/**
	 * Visibility of this connection.
	 */
	visibility: VisibilityType;
}

export type PlatformType =
	| 'battlenet'
	| 'facebook'
	| 'github'
	| 'instagram'
	| 'leagueoflegends'
	| 'reddit'
	| 'samsung'
	| 'skype'
	| 'soundcloud'
	| 'spotify'
	| 'steam'
	| 'twitch'
	| 'twitter'
	| 'xbox'
	| 'youtube';

/**
 * @source {@link https://discord.com/developers/docs/resources/user#connection-object-visibility-types|User}
 */
export enum VisibilityType {
	/**
	 * Invisible to everyone except the user themselves.
	 */
	None,

	/**
	 * Visible to everyone.
	 */
	Everyone
}

export interface Profile {
	user: User;
	mutual_guilds?: MutualGuild[];
	connected_accounts: PartialConnection[];
	premium_since: Nullable<string>;
	premium_guild_since: Nullable<string>;
}

export interface MutualGuild {
	id: snowflake;
	nick: Nullable<string>;
}

export interface Relationship {
	id: snowflake;
	type: RelationshipType;
	nickname: Nullable<string>;
	user: User;
}

export enum RelationshipType {
	/**
	 * User has no intrinsic relationship.
	 */
	None,

	/**
	 * User is a friend.
	 */
	Friend,

	/**
	 * User is blocked.
	 */
	Blocked,

	/**
	 * User has a pending incoming friend request to connected user.
	 */
	PendingIncoming,

	/**
	 * Current user has a pending outgoing friend request to user.
	 */
	PendingOutgoing,

	/**
	 * User is not friends, but interacts with current user often (frequency +
	 * recency).
	 */
	Implicit
}

export interface UserSettings {
	/**
	 * Control how long you need to be inactive on desktop, in minutes, before
	 * receiving push notifications.
	 */
	afk_timeout: PushNotificationInactiveTimeout;

	/**
	 * Allows Discord to record when a screen reader is being used while using
	 * Discord to improve accessibility.
	 */
	allow_accessibility_detection: boolean;

	/**
	 * Play animated emojis.
	 */
	animate_emoji: boolean;

	/**
	 * Controls when stickers animate.
	 */
	animate_stickers: AnimateSticker;
	contact_sync_enabled: boolean;

	/**
	 * Automatically convert emoticons in messages to emojis.
	 */
	convert_emoticons: boolean;
	custom_status: CustomStatus;

	/**
	 * Allow direct messages from guild members. This setting is applied when a
	 * new guild is joined. It does not apply retroactively to existing guilds.
	 */
	default_guilds_restricted: boolean;
	detect_platform_accounts: boolean;

	/**
	 * Exposes context menu items helpful for people writing bots using the API.
	 */
	developer_mode: boolean;
	disable_games_tab: boolean;

	/**
	 * Allow playback and usage of `/tts` command.
	 */
	enable_tts_command: boolean;

	/**
	 * Automatically scan and delete direct messages received that contain
	 * explicit media content.
	 */
	explicit_content_filter: ExplicitUserContentFilterLevel;
	friend_discovery_flags: number;

	/**
	 * Who can add you as a friend.
	 */
	friend_source_flags: FriendSources;

	/**
	 * Automatically play GIFs when Discord is focused.
	 */
	gif_auto_play: boolean;
	guild_folders: GuildFolder[];
	guild_positions: snowflake[];

	/**
	 * Display images and videos when uploaded directly to Discord. Images
	 * larger than `10 MB` will not be previewed.
	 */
	inline_attachment_media: boolean;

	/**
	 * Display images and videos when posted as links to chat.
	 */
	inline_embed_media: boolean;
	locale: string;
	message_display_compact: boolean;
	native_phone_integration_enabled: boolean;

	/**
	 * Show website preview info from links pasted into chat.
	 */
	render_embeds: boolean;

	/**
	 * Show emoji reactions on messages.
	 */
	render_reactions: boolean;
	restricted_guilds: snowflake[];

	/**
	 * Display current activity (the game being played if detectable, an
	 * activity that supports Rich Presence, or a public Stage being attended)
	 * as a status message.
	 */
	show_current_game: boolean;
	status: StatusType;
	stream_notifications_enabled: boolean;
	theme: 'light' | 'dark';
	timezone_offset: number;

	/**
	 * Allow access on NSFW guilds on iOS.
	 */
	view_nsfw_guilds: boolean;
}

export type PushNotificationInactiveTimeout = 60 | 120 | 180 | 240 | 300 | 360 | 420 | 480 | 540 | 600;

export enum AnimateSticker {
	Always,

	/**
	 * On the desktop client, stickers will animate on hover or focus. On mobile
	 * clients, stickers will animate on long-press.
	 */
	Interaction,
	Never
}

export interface CustomStatus {
	text: string;
	expires_at: Nullable<string>;
	emoji_id: Nullable<snowflake>;
	emoji_name: Nullable<string>;
}

export enum ExplicitUserContentFilterLevel {
	/**
	 * Direct messages will not be scanned for explicit content.
	 */
	Disabled,

	/**
	 * Scan direct messages from everyone unless they are a friend.
	 */
	FriendsOnly,

	/**
	 * Scan direct messages from everyone.
	 */
	Everyone
}

export interface FriendSources {
	all?: boolean;
	mutual_friends?: boolean;
	mutual_guilds?: boolean;
}

export interface GuildFolder {
	guild_ids: [snowflake, ...snowflake[]];
	id: string | number;
	name: Nullable<string>;
	color: Nullable<number>;
}
