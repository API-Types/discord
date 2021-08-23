import type { Nullable, Range } from 'extended-utility-types';
import type { Activity, GatewayOPCode, snowflake } from '../../';

export interface CommandPayload<O extends GatewayOPCode> {
	/**
	 * Opcode for the payload.
	 */
	op: O;
	readonly s: null;
	readonly t: null;
}

export type GatewayCommandPayload =
	| Identify
	| Resume
	| Heartbeat
	| RequestGuildMembers
	| UpdateVoiceState
	| UpdatePresence;

/**
 * Used to trigger the initial handshake with the gateway.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#identify|Gateway}
 */
export interface Identify extends CommandPayload<GatewayOPCode.Identify> {
	d: {
		/**
		 * Authentication token.
		 */
		token: string;

		/**
		 * Connection properties
		 */
		properties: ConnectionProperties;

		/**
		 * Whether this connection supports compression of packets.
		 *
		 * @defaultValue `false`
		 */
		compress?: boolean;

		/**
		 * Total number of members where the gateway will stop sending offline
		 * members in the guild member list.
		 *
		 * @defaultValue `50`
		 */
		large_threshold?: Range<50, 250>;

		/**
		 * Used for Guild Sharding
		 */
		shard?: [shard_id: number, num_shards: number];

		/**
		 * Presence structure for initial presence information.
		 */
		presence?: UpdatePresence['d'];

		/**
		 * The Gateway Intents you wish to receive.
		 */
		intents: number;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties|Gateway}
 */
export interface ConnectionProperties {
	/**
	 * Your operating system.
	 */
	$os: string;

	/**
	 * Your library name.
	 */
	$browser: string;

	/**
	 * Your library name.
	 */
	$device: string;
}

/**
 * Used to replay missed events when a disconnected client resumes.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#resume|Gateway}
 */
export interface Resume extends CommandPayload<GatewayOPCode.Resume> {
	d: {
		/**
		 * Session token.
		 */
		token: string;

		/**
		 * Session ID.
		 */
		session_id: string;

		/**
		 * Last sequence number received.
		 */
		seq: number;
	};
}

/**
 * Used to maintain an active gateway connection. Must be sent every
 * `heartbeat_interval` milliseconds after the Opcode 10 Hello payload is
 * received. The inner `d` key is the last sequence number—`s`—received by the
 * client. If you have not yet received one, send `null`.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#heartbeat|Gateway}
 */
export interface Heartbeat extends CommandPayload<GatewayOPCode.Heartbeat> {
	d: Nullable<number>;
}

/**
 * Used to request all members for a guild or a list of guilds. When initially
 * connecting, if you are using Gateway Intents and don't have the
 * `GUILD_PRESENCES` intent, or if the guild is over 75k members, it will only
 * send members who are in voice, plus the member for you (the connecting user).
 * Otherwise, if a guild has over `large_threshold` members (value in the
 * Gateway Identify), it will only send members who are online, have a role,
 * have a nickname, or are in a voice channel, and if it has under
 * `large_threshold` members, it will send all members. If a client wishes to
 * receive additional members, they need to explicitly request them via this
 * operation. The server will send Guild Members Chunk events in response with
 * up to `1000` members per chunk until all members that match the request have
 * been sent.
 *
 * **Limitations**
 * - `GUILD_PRESENCES` intent is required to set `presences = true`. Otherwise,
 * it will always be `false`
 * - `GUILD_MEMBERS` intent is required to request the entire member list—
 * `(query='', limit=0<=n)`
 * - You will be limited to requesting `1` `guild_id` per request
 * - Requesting a prefix (`query` parameter) will return a maximum of `100`
 * members
 * - Requesting `user_ids` will continue to be limited to returning `100`
 * members
 *
 * @remarks
 * `nonce` can only be up to `32` bytes. If you send an invalid `nonce` it will
 * be ignored and the reply `member_chunk`(s) will not have a `nonce` set.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#request-guild-members|Gateway}
 */
export interface RequestGuildMembers extends CommandPayload<GatewayOPCode.RequestGuildMembers> {
	d: {
		/**
		 * ID of the guild to get members for.
		 */
		guild_id: snowflake;

		/**
		 * String that username starts with, or an empty string to return all
		 * members.
		 */
		query?: string;

		/**
		 * Maximum number of members to send matching the `query`. A limit of
		 * `0` can be used with an empty string `query` to return all members.
		 */
		limit?: number;

		/**
		 * Used to specify if we want the presences of the matched members.
		 */
		presences?: boolean;

		/**
		 * Used to specify which users you wish to fetch.
		 */
		user_ids?: snowflake | snowflake[];

		/**
		 * Nonce to identify the Guild Members Chunk response
		 */
		nonce?: string;
	};
}

/**
 * Sent when a client wants to join, move, or disconnect from a voice channel.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#update-voice-state|Gateway}
 */
export interface UpdateVoiceState extends CommandPayload<GatewayOPCode.VoiceStateUpdate> {
	d: {
		/**
		 * ID of the guild.
		 */
		guild_id: snowflake;

		/**
		 * ID of the voice channel client wants to join (`null` if
		 * disconnecting).
		 */
		channel_id: Nullable<snowflake>;

		/**
		 * Is the client muted.
		 */
		self_mute: boolean;

		/**
		 * Is the client deafened.
		 */
		self_deaf: boolean;
	};
}

/**
 * Sent by the client to indicate a presence or status update.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#update-presence|Gateway}
 */
export interface UpdatePresence extends CommandPayload<GatewayOPCode.PresenceUpdate> {
	d: {
		/**
		 * Unix time (in milliseconds) of when the client went idle, or `null`
		 * if the client is not idle.
		 */
		since: Nullable<number>;

		/**
		 * `null`, or the user's activities.
		 */
		activities: Nullable<Activity[]>;

		/**
		 * The user's new status.
		 */
		status: StatusType;

		/**
		 * Whether or not the client is AFK.
		 */
		afk: boolean;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#update-status-status-types|Gateway}
 */
export type StatusType = 'idle' | 'dnd' | 'online' | 'offline' | 'invisbile';
