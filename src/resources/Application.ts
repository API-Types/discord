import type { Nullable } from 'extended-utility-types';
import type { PartialUser, snowflake, Team, User } from '../';

/**
 * @source {@link https://discord.com/developers/docs/resources/application#application-object-application-structure|Application}
 */
export interface Application {
	/**
	 * The ID of the app.
	 */
	id: snowflake;

	/**
	 * The name of the app.
	 */
	name: string;

	/**
	 * The icon hash of the app.
	 */
	icon: Nullable<string>;

	/**
	 * The description of the app.
	 */
	description: string;

	/**
	 * An array of RPC origin URLs, if RPC is enabled.
	 */
	rpc_origins?: string[];

	/**
	 * When `false`, only the app owner can join the app's bot to guilds.
	 */
	bot_public: boolean;

	/**
	 * When `true`, the app's bot will only join upon completion of the full
	 * OAuth2 code grant flow.
	 */
	bot_require_code_grant: boolean;

	/**
	 * The URL of the app's Terms of Service.
	 */
	terms_of_service_url?: string;

	/**
	 * The URL of the app's Privacy Policy.
	 */
	privacy_policy_url?: string;

	/**
	 * Partial user object containing info on the owner of the application.
	 */
	owner?: PartialUser & Pick<User, 'flags' | 'public_flags'>;

	/**
	 * If this application is a game sold on Discord, this field will be the
	 * summary field for the store page of its primary SKU.
	 */
	summary: string;

	/**
	 * The hex encoded key for verification in interactions.
	 */
	verify_key: string;

	/**
	 * If the application belongs to a team, this will be a list of the members
	 * of that team.
	 */
	team: Nullable<Team>;

	/**
	 * If this application is a game sold on Discord, this field will be the
	 * guild to which it has been linked.
	 */
	guild_id?: snowflake;

	/**
	 * If this application is a game sold on Discord, this field will be the ID
	 * of the "Game SKU" that is created, if exists.
	 */
	primary_sku_id?: snowflake;

	/**
	 * If this application is a game sold on Discord, this field will be the URL
	 * slug that links to the store page.
	 */
	slug?: string;

	/**
	 * If this application is a game sold on Discord, this field will be the
	 * hash of the image on store embeds.
	 */
	cover_image?: string;

	/**
	 * The application's public flags.
	 */
	flags?: ApplicationFlags;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/application#application-object-application-flags|Application}
 */
export enum ApplicationFlags {
	ManagedEmoji = 1 << 2,
	GroupDMCreate = 1 << 4,
	GatewayPresence = 1 << 12,
	GatewayPresenceLimited = 1 << 13,
	GatewayGuildMembers = 1 << 14,
	GatewayGuildMembersLimited = 1 << 15,
	VerificationPendingGuildLimit = 1 << 16,
	Embedded = 1 << 17
}

export enum LibraryApplicationFlags {
	Hidden = 1 << 0,
	Private = 1 << 1,
	OverlayDisabled = 1 << 2,
	Entitled = 1 << 3,
	Premium = 1 << 4
}

export interface ApplicationAsset {
	id: snowflake;
	name: string;
	type: number;
}
