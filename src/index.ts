import type { DeepReadonly } from 'extended-utility-types';
import type { JSONErrorCode } from './';

export * from './interactions';
export * from './resources';
export * from './topics';

/**
 * Milliseconds since Discord Epoch, the first second of `2015` or
 * `1420070400000`.
 *
 * @source {@link https://discord.com/developers/docs/reference#snowflakes|Reference}
 */
export const DiscordEpoch = 1_420_070_400_000;

export enum BaseURL {
	/**
	 * @source {@link https://discord.com/developers/docs/reference#api-reference-base-url|Reference}
	 */
	API = 'https://discord.com/api/v9',

	/**
	 * @source {@link https://discord.com/developers/docs/reference#image-formatting-image-base-url|Reference}
	 */
	CDN = 'https://cdn.discordapp.com'
}

/**
 * Error responses will specify which JSON key contains the error, the error
 * code, and a human readable error message.
 *
 * @source {@link https://discord.com/developers/docs/reference#error-messages|Reference}
 */
export interface ErrorResponse {
	readonly code: JSONErrorCode;
	readonly errors?: ArrayError | ObjectError;
	readonly message: string;
}

/**
 * @source {@link https://discord.com/developers/docs/reference#error-messages-array-error|Reference}
 */
export interface ArrayError {
	readonly [index: string]: ObjectError;
}

/**
 * @source {@link https://discord.com/developers/docs/reference#error-messages-object-error|Reference}
 */
export interface ObjectError {
	readonly [field: string]: ArrayError | DeepReadonly<{ _errors: { code: string; message: string }[] }>;
}

export enum PublicReleaseChannel {
	Stable = 'stable',
	PTB = 'ptb',
	Canary = 'canary'
}

/**
 * Discord utilizes Twitter's snowflake format for uniquely identifiable
 * descriptors (IDs). These IDs are guaranteed to be unique across all of
 * Discord, except in some unique scenarios in which child objects share their
 * parent's ID. Because Snowflake IDs are up to `64` bits in size, they are
 * always returned as strings in the HTTP API to prevent integer overflows in
 * some languages.
 *
 * @source {@link https://discord.com/developers/docs/reference#snowflakes|Reference}
 */
export type snowflake = `${bigint}`;

/**
 * Discord utilizes a subset of markdown for rendering message content on its
 * clients, while also adding some custom functionality to enable things like
 * mentioning users and channels.
 *
 * Using the markdown for either users, roles, or channels will usually mention
 * the target(s) accordingly, but this can be suppressed using the
 * `allowed_mentions` parameter when creating a message. Standard emoji are
 * currently rendered using Twemoji for Desktop/Android and Apple's native emoji
 * on iOS.
 *
 * Timestamps will display the given timestamp in the user's timezone and
 * locale.
 *
 * @source {@link https://discord.com/developers/docs/reference#message-formatting|Reference}
 */
export type MessageFormats =
	| UserFormat
	| UserNicknameFormat
	| ChannelFormat
	| RoleFormat
	| CustomEmojiFormat
	| CustomEmojiAnimatedFormat
	| UnixTimestampFormat
	| UnixTimestampStyledFormat;

export type UserFormat = `<@${bigint}>`;

export type UserNicknameFormat = `<@!${bigint}>`;

export type ChannelFormat = `<#${bigint}>`;

export type RoleFormat = `<@&${bigint}>`;

export type CustomEmojiFormat = `<:${string}:${bigint}>`;

export type CustomEmojiAnimatedFormat = `<a:${string}:${bigint}>`;

export type UnixTimestampFormat = `<t:${number}>`;

export type UnixTimestampStyledFormat = `<t:${number}:${TimestampStyle}>`;

/**
 * @source {@link https://discord.com/developers/docs/reference#message-formatting-timestamp-styles|Reference}
 */
export enum TimestampStyle {
	/**
	 * @example '16:20'
	 */
	ShortTime = 't',

	/**
	 * @example '16:20:30'
	 */
	LongTime = 'T',

	/**
	 * @example '20/04/2021'
	 */
	ShortDate = 'd',

	/**
	 * @example '20 April 2021'
	 */
	LongDate = 'D',

	/**
	 * @example '20 April 2021 16:20'
	 */
	ShortDateTime = 'f',

	/**
	 * @example 'Tuesday, 20 April 2021 16:20'
	 */
	LongDateTime = 'F',

	/**
	 * @example '2 months ago'
	 */
	RelativeTime = 'R'
}
