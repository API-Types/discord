import type { Nullable, Range } from 'extended-utility-types';
import type { Connection, DMChannel, PartialGuild, Profile, Relationship, Snowflake, User, UserSettings } from '../../';

/**
 * Returns the user object of the requester's account.
 *
 * For OAuth2, this requires the `identify` scope, which will return the object *without* an email,
 * and optionally the `email` scope, which returns the object *with* an email.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/user#get-current-user) `/users/@me`
 */
export interface GetCurrentUser {
	response: User;
}

/**
 * Returns a user object for a given user ID.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/user#get-user) `/users/{user.id}`
 */
export interface GetUser {
	response: User;
}

/**
 * Modify the requester's user account settings. Returns a user object on success.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/user#modify-current-user) `/users/@me`
 */
export interface ModifyCurrentUser {
	body: {
		/**
		 * User's username, if changed may cause the user's discriminator to be randomized.
		 */
		username?: string;

		/**
		 * If passed, modifies the user's avatar.
		 */
		avatar?: Nullable<string>;
	};

	response: User;
}

/**
 * Returns a list of partial guild objects the current user is a member of. Requires the `guilds`
 * OAuth2 scope.
 *
 * @remarks
 * This endpoint returns `200` guilds by default, which is the maximum number of guilds a non-bot
 * user can join. Therefore, pagination is **not needed** for integrations that need to get a list
 * of the users' guilds.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/user#get-current-user-guilds) `/users/@me/guilds`
 */
export interface GetCurrentUserGuilds {
	query: {
		/**
		 * Get guilds before this guild ID.
		 */
		before?: Snowflake;

		/**
		 * Get guilds after this guild ID.
		 */
		after?: Snowflake;

		/**
		 * Max number of guilds to return.
		 *
		 * @defaultValue `200`
		 */
		limit?: Range<1, 200>;
	};

	response: PartialGuild[];
}

/**
 * Leave a guild. Returns a `204` empty response on success.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/user#leave-guild) `/users/@me/guilds/{guild.id}`
 */
export interface LeaveGuild {
	response: never;
}

/**
 * Create a new DM channel with a user. Returns a DM channel object.
 *
 * @remarks
 * This endpoint should not be used to DM everyone in a server about something. DMs should generally
 * be initiated by a user action. If a significant amount of DMs are opened too quickly, your bot
 * may be rate limited or blocked from opening new ones.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/user#create-dm) `/users/@me/channels`
 */
export interface CreateDM {
	body: {
		/**
		 * The recipient to open a DM channel with.
		 */
		recipient_id: Snowflake;
	};

	response: DMChannel;
}

/**
 * Create a new group DM channel with multiple users. Returns a DM channel object.
 *
 * @remarks
 * This endpoint is limited to `10` active group DMs.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/user#create-dm) `/users/@me/channels`
 */
export interface CreateGroupDM {
	body: {
		/**
		 * Access tokens of users that have granted an app the `gdm.join` scope.
		 */
		access_tokens: string[];

		/**
		 * A dictionary of user IDs to their respective nicknames.
		 */
		nicks: Record<Snowflake, string>;
	};

	response: DMChannel;
}

/**
 * Returns a list of connection objects.
 *
 * Requires the `connections` OAuth2 scope.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/user#get-user-connections) `/users/@me/connections`
 */
export interface GetUserConnections {
	response: Connection[];
}

/**
 * @endpoint GET `/users/@me/relationships`
 */
export interface GetUserRelationships {
	response: Relationship[];
}

/**
 * @endpoint GET `/users/{user.id}/profile`
 */
export interface GetUserProfile {
	query: {
		with_mutual_guilds?: boolean;
	};

	response: Profile;
}

/**
 * @endpoint PATCH `/users/@me/settings`
 */
export interface ModifyUserSettings {
	body: Partial<UserSettings>;
	response: UserSettings;
}
