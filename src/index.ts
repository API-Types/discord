import type { DeepReadonly } from 'extended-utility-types';
import type { JSONErrorCode } from './';

export * from './interactions';
export * from './resources';
export * from './topics';

/**
 * Milliseconds since Discord Epoch, the first second of `2015` or `1420070400000`.
 *
 * @source {@Link https://discord.com/developers/docs/reference#snowflakes|Reference}
 */
export const DiscordEpoch = 1_420_070_400_000;

export const DefaultRoleColor = '#99AAB5';

export enum BaseURL {
	/**
	 * @source {@Link https://discord.com/developers/docs/reference#api-reference-base-url|Reference}
	 */
	API = 'https://discord.com/api/v9',

	/**
	 * @source {@Link https://discord.com/developers/docs/reference#image-formatting-image-base-url|Reference}
	 */
	CDN = 'https://cdn.discordapp.com'
}

/**
 * Error responses will specify which JSON key contains the error, the error code, and a human
 * readable error message.
 *
 * @source {@Link https://discord.com/developers/docs/reference#error-messages|Reference}
 */
export interface ErrorResponse {
	readonly code: JSONErrorCode;
	readonly errors?: ArrayError | ObjectError;
	readonly message: string;
}

/**
 * @source {@Link https://discord.com/developers/docs/reference#error-messages-array-error|Reference}
 */
export interface ArrayError {
	readonly [index: `${number}`]: ObjectError;
}

/**
 * @source {@Link https://discord.com/developers/docs/reference#error-messages-object-error|Reference}
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
 * Discord utilizes Twitter's snowflake format for uniquely identifiable descriptors (IDs). These
 * IDs are guaranteed to be unique across all of Discord, except in some unique scenarios in which
 * child objects share their parent's ID. Because Snowflake IDs are up to `64` bits in size, they
 * are always returned as strings in the HTTP API to prevent integer overflows in some languages.
 *
 * @source {@Link https://discord.com/developers/docs/reference#snowflakes|Reference}
 */
export type Snowflake = `${bigint}`;

/**
 * Discord utilizes a subset of markdown for rendering message content on its clients, while also
 * adding some custom functionality to enable things like mentioning users and channels.
 *
 * Using the markdown for either users, roles, or channels will usually mention the target(s)
 * accordingly, but this can be suppressed using the `allowed_mentions` parameter when creating a
 * message. Standard emoji are currently rendered using Twemoji for Desktop/Android and Apple's
 * native emoji on iOS.
 *
 * Timestamps will display the given timestamp in the user's timezone and locale.
 *
 * @source {@Link https://discord.com/developers/docs/reference#message-formatting|Reference}
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
 * @source {@Link https://discord.com/developers/docs/reference#message-formatting-timestamp-styles|Reference}
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

export enum DiscordColor {
	Blurple = '#5865f2',
	Green = '#57F287',
	Yellow = '#FEE75C',
	Fuchsia = '#EB459E',
	Red = '#ED4245'
}

export enum DiscordLimit {
	MaxUserGuilds = 100,
	MaxUserGuildsPremium = 200,
	MaxMessagesPerChannel = 50,
	MaxMessagesForJump = 50,
	MaxMentionsPerFetch = 25,
	MaxLoadedMessages = 200,
	TruncatedMessageViewSize = 100,
	MaxMessageCacheSize = 250,
	MaxMessageLength = 2000,
	MaxMessageLengthPremium = 4000,
	MaxTTSLength = 200,
	MaxPinsPerChannel = 50,
	MaxChannelNameLength = 100,
	NoteMaxLength = 256,
	IdleDuration = 600_000,
	TypingTimeout = 10_000,
	TypingDelayLocal = 1500,
	MaxTypingUsers = 5,
	SlowmodeCooldownBufferMS = 100,
	MaxRoleLength = 32,
	MaxAttachmentSize = 8_388_608,
	MaxPremiumTier1AttachmentSize = 52_428_800,
	MaxPremiumTier2AttachmentSize = 104_857_600,
	MaxStaffAttachmentSize = 209_715_200,
	MaxPremiumGuildTier2AttachmentSize = 52_428_800,
	MaxPremiumGuildTier3AttachmentSize = 104_857_600,
	EmbedLifetime = 7_200_000,
	MaxGamesNews = 100,
	AvatarSize = 128,
	AvatarMaxSize = 1024,
	UserBannerMaxWidth = 2400,
	UserBannerMaxHeight = 960,
	SplashSize = 2048,
	MaxPTTReleaseDelay = 200,
	BitrateMin = 800,
	BitrateDefault = 64_000,
	BitrateMax = 96_000,
	MaxVoiceUserLimit = 99,
	MaxMutualGuilds = 5,
	MaxGroupDMParticipants = 10,
	MaxGroupDMStaffParticipants = 25,
	MaxAutocompleteResults = 10,
	SmallGuildMemberThreshold = 30,
	SearchPageSize = 25,
	EmojiMaxSlots = 50,
	EmojiMaxSlotsMore = 200,
	EmojiMaxLength = 32,
	EmojiMaxFilesizeKB = 256,
	MaxGuildFolderNameLength = 32,
	MaxImageWidth = 2560,
	MaxImageHeight = 2560,
	AuditLogPageLimit = 50,
	MaxReasonLength = 256,
	MaxVideoWidth = 3840,
	MaxVideoHeight = 2160,
	RequestDataLimitDays = 30,
	MaxMembersNotifyAllMessages = 2500,
	WelcomeOldGuildAgeThreshold = 2_592_000_000,
	ReactionTooltipMaxUsers = 3,
	DefaultNumReactionUsers = 100
}

export enum LoginState {
	None = 'NONE',
	LoggingIn = 'LOGGIN_IN',
	AccountScheduledForDeletion = 'ACCOUNT_SCHEDULED_FOR_DELETION',
	AccountDisabled = 'ACCOUNT_DISABLED',
	MFAStep = 'MFA_STEP',
	LoggingInMFA = 'LOGGING_IN_MFA',
	MFASMSStep = 'MFA_SMS_STEP',
	LoggingInMFASMS = 'LOGGING_IN_MFA_SMS',
	LoginAgeGate = 'LOGIN_AGE_GATE',
	PasswordRecoveryPhoneVerification = 'PASSWORD_RECOVERY_PHONE_VERIFICATION',
	PasswordRecoveryVerifyPhone = 'PASSWORD_RECOVERY_VERIFY_PHONE',
	PhoneIPAuthorization = 'PHONE_IP_AUTHORIZATION'
}

export enum RegistrationState {
	None = 'NONE',
	Registering = 'REGISTERING',
	RegisterAgeGate = 'REGISTER_AGE_GATE',
	RegisterWithError = 'REGISTER_WITH_ERROR'
}

export enum FriendSection {
	AddFriend = 'ADD_FRIEND',
	All = 'ALL',
	Online = 'ONLINE',
	Pending = 'PENDING',
	Blocked = 'BLOCKED'
}
