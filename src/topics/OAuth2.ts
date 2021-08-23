import type { Application, User } from '../';

/**
 * @remarks
 * In accordance with the relevant RFCs, the token and token revocation URLs
 * will only accept a content type of `x-www-form-urlencoded`. JSON content is
 * not permitted and will return an error.
 *
 * @source {@link https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-urls|OAuth2}
 */
export enum OAuth2URL {
	/**
	 * Base authorization URL.
	 */
	Base = 'https://discord.com/api/oauth2/authorize',

	/**
	 * Token URL.
	 */
	Token = 'https://discord.com/api/oauth2/token',

	/**
	 * Token Revocation URL.
	 */
	TokenRevocation = 'https://discord.com/api/oauth2/token/revoke'
}

/**
 * Some scopes require approval from Discord to use. Requesting them from a user
 * without approval from Discord may cause undocumented/error behavior in the
 * OAuth2 flow.
 *
 * @remarks
 * `guilds.join` and `bot` require you to have a bot account linked to your
 * application. Also, in order to add a user to a guild, your bot has to already
 * belong to that guild.
 *
 * @source {@link https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes|OAuth2}
 */
export enum OAuth2Scope {
	/**
	 * Allows your app to fetch data from a user's "Now Playing/Recently Played"
	 * list. Requires Discord approval.
	 */
	ActivitiesRead = 'activities.read',

	/**
	 * Allows your app to update a user's activity. Requires Discord approval.
	 */
	ActivitiesWrite = 'activities.write',

	/**
	 * Allows your app to read build data for a user's applications.
	 */
	ApplicationsBuildsRead = 'applications.builds.read',

	/**
	 * Allows your app to upload/update builds for a user's applications.
	 * Requires Discord approval.
	 */
	ApplicationsBuildsUpload = 'applications.builds.upload',

	/**
	 * Allows your app to use commands in a guild.
	 */
	ApplicationsCommands = 'applications.commands',

	/**
	 * Allows your app to update its commands via bearer token. Client
	 * credentials grant only.
	 */
	ApplicationsCommandsUpdate = 'applications.commands.update',

	/**
	 * Allows your app to read entitlements for a user's applications.
	 */
	ApplicationsEntitlements = 'applications.entitlements',

	/**
	 * Allows your app to read and update store data for a user's applications.
	 */
	ApplicationsStoreUpdate = 'applications.store.update',

	/**
	 * For OAuth2 bots, this puts the bot in the user's selected guild by
	 * default.
	 */
	Bot = 'bot',

	/**
	 * Allows `/users/@me/connections` to return linked third-party accounts.
	 */
	Connections = 'connections',

	/**
	 * Allows `/users/@me` to return an `email`.
	 */
	Email = 'email',

	/**
	 * Allows your app to join users to a group DM.
	 */
	GroupDMJoin = 'gdm.join',

	/**
	 * Allows `/users/@me/guilds` to return basic information about all of a
	 * user's guilds.
	 */
	Guilds = 'guilds',

	/**
	 * Allows `/guilds/{guild.id}/members/{user.id}` to be used for joining
	 * users to a guild.
	 */
	GuildsJoin = 'guilds.join',

	/**
	 * Allows `/users/@me` without `email`.
	 */
	Identify = 'identify',

	/**
	 * For local RPC server API access, this allows you to read messages from
	 * all client channels (otherwise restricted to channels/guilds your app
	 * creates).
	 */
	MessagesRead = 'messages.read',

	/**
	 * Allows your app to know a user's friends and implicit relationships.
	 * Requires Discord approval.
	 */
	RelationshipsRead = 'relationships.read',

	/**
	 * For local RPC server access, this allows you to control a user's local
	 * Discord client. Requires Discord approval.
	 */
	RPC = 'rpc',

	/**
	 * For local RPC server access, this allows you to update a user's activity.
	 * Requires Discord approval.
	 */
	RPCActivitiesWrite = 'rpc.activities.write',

	/**
	 * For local RPC server access, this allows you to receive notifications
	 * pushed out to the user. Requires Discord approval.
	 */
	RPCNotificationsRead = 'rpc.notifications.read',

	/**
	 * For local RPC server access, this allows you to read a user's voice
	 * settings and listen for voice events. Requires Discord approval.
	 */
	RPCVoiceRead = 'rpc.voice.read',

	/**
	 * For local RPC server access, this allows you to updates a user's voice
	 * settings. Requires Discord approval.
	 */
	RPCVoiceWrite = 'rpc.voice.write',

	/**
	 * This generates a webhook that is returned in the oauth token response for
	 * authorization code grants.
	 */
	WebhookIncoming = 'webhook.incoming'
}

/**
 * Returns the bot's application object without `flags`
 *
 * @endpoint [GET](https://discord.com/developers/docs/topics/oauth2#get-current-bot-application-information) `/oauth2/applications/@me`
 */
export interface GetCurrentBotApplicationInformation {
	response: Omit<Application, 'flags'>;
}

/**
 * Returns info about the current authorization. Requires authentication with a
 * bearer token.
 *
 * @endpoint [GET](https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information) `/oauth2/@me`
 */
export interface GetCurrentAuthorizationInformation {
	response: AuthorizationInformation;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information-response-structure|OAuth2}
 */
export interface AuthorizationInformation {
	/**
	 * The current application.
	 */
	application: Partial<Application>;

	/**
	 * The scopes the user has authorized the application for.
	 */
	scopes: `${OAuth2Scope}`[];

	/**
	 * When the access token expires.
	 */
	expires: string;

	/**
	 * The user who has authorized, if the user has authorized with the
	 * `identify` scope.
	 */
	user?: User;
}
