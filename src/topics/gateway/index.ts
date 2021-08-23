import type { GatewayCommandPayload, GatewayEventPayload } from './';

export * from './Activity';
export * from './Commands';
export * from './Events';

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure|Gateway}
 */
export type GatewayPayload = GatewayCommandPayload | GatewayEventPayload;

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#connecting-gateway-url-params|Gateway}
 */
export interface GatewayURL {
	/**
	 * Gateway Version to use.
	 */
	v: 9;

	/**
	 * The encoding of received gateway packets.
	 */
	encoding: EncodingType;

	/**
	 * The (optional) compression of gateway packets.
	 */
	compress?: 'zlib-stream';
}

/**
 * While using ETF there are some additional constraints to note:
 *
 * - Snowflake IDs are transmitted as 64-bit integers over ETF.
 * - The client must not send compressed messages to the server.
 * - Payloads must use string keys, atom keys will lead to a `4002` decode
 * error.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#etfjson|Gateway}
 */
export type EncodingType = 'json' | 'etf';

/**
 * Returns an object with a single valid WSS URL, which the client can use for
 * Connecting. Clients **should** cache this value and only call this endpoint
 * to retrieve a new URL if they are unable to properly establish a connection
 * using the cached version of the URL.
 *
 * @remarks
 * This endpoint does not require authentication.
 *
 * @endpoint [GET](https://discord.com/developers/docs/topics/gateway#get-gateway) `/gateway`
 */
export interface GetGateway {
	response: {
		readonly url: 'wss://gateway.discord.gg/';
	};
}

/**
 * Returns an object based on the information in Get Gateway, plus additional
 * metadata that can help during the operation of large or sharded bots. Unlike
 * Get Gateway, this route should not be cached for extended periods of time as
 * the value is not guaranteed to be the same per-call, and changes as the bot
 * joins/leaves guilds.
 *
 * @remarks
 * - This endpoint requires authentication using a valid bot token.
 *
 * @endpoint [GET](https://discord.com/developers/docs/topics/gateway#get-gateway-bot) `/gateway/bot`
 */
export interface GetGatewayBot {
	response: {
		/**
		 * The WSS URL that can be used for connecting to the gateway.
		 */
		url: string;

		/**
		 * The recommended number of shards to use when connecting.
		 */
		shards: number;

		/**
		 * Information on the current session start limit.
		 */
		session_start_limit: SessionStartLimit;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#session-start-limit-object-session-start-limit-structure|Gateway}
 */
export interface SessionStartLimit {
	/**
	 * The total number of session starts the current user is allowed.
	 */
	total: 1000;

	/**
	 * The remaining number of session starts the current user is allowed.
	 */
	remaining: number;

	/**
	 * The number of milliseconds after which the limit resets.
	 */
	reset_after: number;

	/**
	 * The number of identify requests allowed per `5` seconds.
	 */
	max_concurrency: number;
}

/**
 * When identifying to the gateway, you can specify an `intents` parameter which
 * allows you to conditionally subscribe to pre-defined "intents", groups of
 * events defined by Discord. If you do not specify a certain intent, you will
 * not receive any of the gateway events that are batched into that group.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#list-of-intents|Gateway}
 */
export enum Intents {
	/**
	 * - `GUILD_CREATE`
	 * - `GUILD_UPDATE`
	 * - `GUILD_DELETE`
	 * - `GUILD_ROLE_CREATE`
	 * - `GUILD_ROLE_UPDATE`
	 * - `GUILD_ROLE_DELETE`
	 * - `CHANNEL_CREATE`
	 * - `CHANNEL_UPDATE`
	 * - `CHANNEL_DELETE`
	 * - `CHANNEL_PINS_UPDATE`
	 * - `THREAD_CREATE`
	 * - `THREAD_UPDATE`
	 * - `THREAD_DELETE`
	 * - `THREAD_LIST_SYNC`
	 * - `THREAD_MEMBER_UPDATE`
	 * - `THREAD_MEMBERS_UPDATE`
	 * - `STAGE_INSTANCE_CREATE`
	 * - `STAGE_INSTANCE_UPDATE`
	 * - `STAGE_INSTANCE_DELETE`
	 */
	Guilds = 1 << 0,

	/**
	 * - `GUILD_MEMBER_ADD`
	 * - `GUILD_MEMBER_UPDATE`
	 * - `GUILD_MEMBER_REMOVE`
	 * - `THREAD_MEMBERS_UPDATE`
	 */
	GuildMembers = 1 << 1,

	/**
	 * - `GUILD_BAN_ADD`
	 * - `GUILD_BAN_REMOVE`
	 */
	GuildBans = 1 << 2,

	/**
	 * - `GUILD_EMOJIS_UPDATE`
	 * - `GUILD_STICKERS_UPDATE`
	 */
	GuildEmojisAndStickers = 1 << 3,

	/**
	 * - `GUILD_INTEGRATIONS_UPDATE`
	 * - `INTEGRATION_CREATE`
	 * - `INTEGRATION_UPDATE`
	 * - `INTEGRATION_DELETE`
	 */
	GuildIntegrations = 1 << 4,

	/**
	 * - `WEBHOOKS_UPDATE`
	 */
	GuildWebhooks = 1 << 5,

	/**
	 * - `INVITE_CREATE`
	 * - `INVITE_DELETE`
	 */
	GuildInvites = 1 << 6,

	/**
	 * - `VOICE_STATE_UPDATE`
	 */
	GuildVoiceStates = 1 << 7,

	/**
	 * - `PRESENCE_UPDATE`
	 */
	GuildPresences = 1 << 8,

	/**
	 * - `MESSAGE_CREATE`
	 * - `MESSAGE_UPDATE`
	 * - `MESSAGE_DELETE`
	 * - `MESSAGE_DELETE_BULK`
	 */
	GuildMessages = 1 << 9,

	/**
	 * - `MESSAGE_REACTION_REMOVE`
	 * - `MESSAGE_REACTION_ADD`
	 * - `MESSAGE_REACTION_REMOVE_ALL`
	 * - `MESSAGE_REACTION_REMOVE_EMOJI`
	 */
	GuildMessageReactions = 1 << 10,

	/**
	 * - `TYPING_START`
	 */
	GuildMessageTyping = 1 << 11,

	/**
	 * - `MESSAGE_CREATE`
	 * - `MESSAGE_UPDATE`
	 * - `MESSAGE_DELETE`
	 * - `CHANNEL_PINS_UPDATE`
	 */
	DirectMessages = 1 << 12,

	/**
	 * - `MESSAGE_REACTION_ADD`
	 * - `MESSAGE_REACTION_REMOVE`
	 * - `MESSAGE_REACTION_REMOVE_ALL`
	 * - `MESSAGE_REACTION_REMOVE_EMOJI`
	 */
	DirectMessageReactions = 1 << 13,

	/**
	 * - `TYPING_START`
	 */
	DirectMessageTyping = 1 << 14
}
