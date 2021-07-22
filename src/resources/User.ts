import type { Nullable } from 'extended-utility-types';
import type { PartialIntegration, Snowflake } from '../';
import type { Identifiable, WithType } from '../__internal__';

export interface PartialUser {
	/**
	 * The user's ID. Requires the `identify` OAuth2 scope.
	 */
	id: Snowflake;

	/**
	 * The user's username, not unique across the platform. Requires the `identify` OAuth2 scope.
	 */
	username: string;

	/**
	 * The user's 4-digit discord-tag. Requires the `identify` OAuth2 scope.
	 */
	discriminator: string;

	/**
	 * The user's avatar hash. Requires the `identify` OAuth2 scope.
	 */
	avatar: Nullable<string>;
}

/**
 * Represents a base entity that can spawn across the entire platform, be members of guilds,
 * participate in text and voice chat, and much more. Users are separated by a distinction of "bot"
 * vs "normal." Although they are similar, bot users are automated users that are "owned" by another
 * user. Unlike normal users, bot users do not have a limitation on the number of Guilds they can be
 * a part of.
 *
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-user-structure|User}
 */
export interface User extends PartialUser {
	/**
	 * Whether the user belongs to an OAuth2 application. Requires the `identify` OAuth2 scope.
	 */
	bot?: boolean;

	/**
	 * Whether the user is an Official Discord System user (part of the urgent message system).
	 * Requires the `identify` OAuth2 scope.
	 */
	system?: boolean;

	/**
	 * Whether the user has two factor enabled on their account. Requires the `identify` OAuth2
	 * scope.
	 */
	mfa_enabled?: boolean;

	/**
	 * The user's chosen language option. Requires the `identify` OAuth2 scope.
	 */
	locale?: string;

	/**
	 * Whether the email on this account has been verified. Requires the `email` OAuth2 scope.
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
	 * The type of Nitro subscription on a user's account. Requires the `identify` OAuth2
	 * scope.
	 */
	premium_type?: PremiumType;

	/**
	 * The public flags on a user's account. Requires the `identify` OAuth2 scope.
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

export interface Profile {
	user: User;
	mutual_guilds?: MutualGuild[];
	connected_accounts: PartialConnection[];
	premium_since: Nullable<string>;
	premium_guild_since: Nullable<string>;
}

export interface MutualGuild extends Identifiable {
	nick: Nullable<string>;
}

export interface PartialConnection extends Identifiable, WithType<PlatformType> {
	/**
	 * The username of the connection account.
	 */
	name: string;

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
	 * Whether activities related to this connection will be shown in presence updates.
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

export interface Relationship extends Identifiable, WithType<RelationshipType> {
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
	 * User is not friends, but interacts with current user often (frequency + recency).
	 */
	Implicit
}
