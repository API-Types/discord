/**
 * Your connection to the gateway may sometimes close. When it does, you will receive a close code
 * that tells you what happened.
 *
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes|Opcodes and Status Codes}
 */
export enum GatewayCloseCode {
	UnknownError = 4000,
	UnknownOPCode,

	/**
	 * An invalid payload was sent.
	 */
	DecodeError,

	/**
	 * A payload was sent prior to identifying.
	 */
	NotAuthenticated,

	/**
	 * The account token sent with your identify payload is incorrect.
	 */
	AuthenticationFailed,
	AlreadyAuthenticated,

	/**
	 * The sequence sent when resuming the session was invalid. Reconnect and start a new
	 * session.
	 */
	InvalidSequence = 4007,

	/**
	 * Payloads are being sent too quickly. You will be disconnected on receiving this.
	 */
	RateLimited,
	SessionTimedOut,
	InvalidShard,
	ShardingRequired,
	InvalidAPIVersion,
	InvalidIntents,
	DisallowedIntents
}

/**
 * All gateway events in Discord are tagged with an opcode that denotes the payload type.
 *
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes|Opcodes and Status Codes}
 */
export enum GatewayOPCode {
	/**
	 * An event was dispatched. The client can receive this action.
	 */
	Dispatch,

	/**
	 * Fired periodically by the client to keep the connection alive. The client can send and
	 * receive this action.
	 */
	Heartbeat,

	/**
	 * Starts a new session during the initial handshake. The client can send this action.
	 */
	Identify,

	/**
	 * Update the client's presence. The client can send this action.
	 */
	PresenceUpdate,

	/**
	 * Used to join/leave or move between voice channels. The client can send this action.
	 */
	VoiceStateUpdate,
	VoiceGuildPing,

	/**
	 * Resume a previous session that was disconnected. The client can send this action.
	 */
	Resume,

	/**
	 * You should attempt to reconnect and resume immediately. The client can receive this action.
	 */
	Reconnect,

	/**
	 * Request information about offline guild members in a large guild. The client can send this
	 * action.
	 */
	RequestGuildMembers,

	/**
	 * The session has been invalidated. You should reconnect and identify/resume accordingly. The
	 * client can receive this action.
	 */
	InvalidSession,

	/**
	 * Sent immediately after connecting, contains the `heartbeat_interval` to use. The client can
	 * receive this action.
	 */
	Hello,

	/**
	 * Sent in response to receiving a heartbeat to acknowledge that it has been received. The
	 * client can receive this action.
	 */
	HeartbeatAck
}

/**
 * The API can return more detailed error codes through a `code` key in a JSON error response.
 * The response will also contain a `message` key containing a more friendly error string.
 *
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes|Opcodes and Status Codes}
 */
export enum JSONErrorCode {
	/**
	 * General error (such as a malformed request body, amongst other things).
	 */
	General,
	UnknownAccount = 10_001,
	UnknownApplication,
	UnknownChannel,
	UnknownGuild,
	UnknownIntegration,
	UnknownInvite,
	UnknownMember,
	UnknownMessage,
	UnknownOverwrite,
	UnknownPlatform,
	UnknownRole,
	UnknownToken,
	UnknownUser,
	UnknownEmoji,
	UnknownWebhook,
	UnknownWebhookService,
	UnknownSession,
	UnknownBan = 10_026,
	UnknownSKU,
	UnknownStoreListing,
	UnknownEntitlement,
	UnknownBuild,
	UnknownLobby,
	UnknownBranch,
	UnknownStoreDirectoryLayout,
	UnknownRedistributable = 10_036,
	UnknownGiftCode = 10_038,
	UnknownGuildTemplate = 10_057,
	UnknownDiscoveryCategory = 10_059,
	UnknownSticker,
	UnknownInteraction = 10_062,
	UnknownApplicationCommand,
	UnknownApplicationCommandPermissions,
	UnknownStageInstance = 10_067,
	UnknownGuildMemberVerificationForm,
	UnknownGuildWelcomeScreen,

	/**
	 * Bots cannot use this endpoint.
	 */
	BotDisallowed = 20_001,

	/**
	 * Only bots can use this endpoint.
	 */
	BotRequired,
	RPCProxyDisallowed,

	/**
	 * Explicit content cannot be sent to the desired recipient(s).
	 */
	ExplicitContent = 20_009,
	AccountScheduledForDeletion = 20_011,
	UserUnauthorizedForApplication,
	AccountDisabled,
	SlowmodeRateLimited = 20_016,

	/**
	 * Only the owner of this account can perform this action.
	 */
	InvalidAccountOwner = 20_018,

	/**
	 * This message cannot be edited due to announcement rate limits.
	 */
	ChannelFollowingRateLimited = 20_022,
	UnderMinimumAge = 20_024,

	/**
	 * The channel you are writing has hit the write rate limit.
	 */
	ChannelRateLimited = 20_028,

	/**
	 * The Stage topic, server name, server description, or channel names contain words that are not
	 * allowed.
	 */
	InvalidWords = 20_031,

	/**
	 * Guild premium subscription level too low.
	 */
	InvalidGuildPremiumSubscriptionLevel = 20_035,

	/**
	 * Maximum number of guilds reached (100).
	 */
	TooManyGuilds = 30_001,

	/**
	 * Maximum number of friends reached (1000).
	 */
	TooManyFriends,

	/**
	 * Maximum number of pins reached for the channel (50).
	 */
	TooManyPinsInChannel,

	/**
	 * Maximum number of recipients reached (10).
	 */
	TooManyRecipients,

	/**
	 * Maximum number of guild roles reached (250).
	 */
	TooManyGuildRoles,
	TooManyUsingUsername,

	/**
	 * Maximum number of webhooks reached (10).
	 */
	TooManyWebhooks,
	TooManyEmojis,

	/**
	 * Maximum number of reactions reached (20).
	 */
	TooManyReactions = 30_010,

	/**
	 * Maximum number of channels reached (500).
	 */
	TooManyChannels = 30_013,

	/**
	 * Maximum number of attachments in a message reached (10).
	 */
	TooManyAttachments = 30_015,

	/**
	 * Maximum number of invites reached (1000).
	 */
	TooManyInvites,
	TooManyAnimatedEmojis = 30_018,
	GuildAtCapacity,
	NotEnoughGuildMembers = 30_029,

	/**
	 * Maximum number of server categories has been reached (5).
	 */
	TooManyGuildCategories,

	/**
	 * Maximum number of guild discovery subcategories has been reached (5).
	 */
	TooManyDiscoverySubcategories,

	/**
	 * Guild already has a template.
	 */
	GuildTemplateExists,
	TooManyThreadMembers = 30_033,

	/**
	 * Maximum number of bans for non-guild members have been exceeded.
	 */
	TooManyNonGuildMemberBans = 30_035,
	TooManyBanFetches = 30_037,
	TooManyStickers = 30_039,
	Unauthorized = 40_001,
	EmailVerificationRequired,
	DMOpenRateLimited,
	SendMessageTemporarilyDisabled,
	RequestEntityTooLarge,
	FeatureTemporarilyDisabled,
	UserBanned,
	ConnectionRevoked = 40_012,
	DeleteAccountTransferTeamOwnership = 40_028,
	UserNotConnectedToVoice = 40_032,
	MessageAlreadyCrossposted,
	ApplicationCommandNameExists = 40_041,
	InvalidAccess = 50_001,
	InvalidAccountType,

	/**
	 * Cannot execute action on a DM channel.
	 */
	InvalidDMAction,

	/**
	 * Guild widget disabled.
	 */
	InvalidEmbedDisabled,

	/**
	 * Cannot edit a message authored by another user.
	 */
	InvalidMessageAuthor,
	InvalidMessageEmpty,
	InvalidMessageSendUser,

	/**
	 * Cannot send messages in a voice channel.
	 */
	InvalidMessageSendNonText,

	/**
	 * Channel verification level is too high to gain access.
	 */
	InvalidMessageVerificationLevel,

	/**
	 * OAuth2 application does not have a bot.
	 */
	InvalidOAuthAppBot,

	/**
	 * OAuth2 application limit reached.
	 */
	InvalidOAuthAppLimit,
	InvalidOAuthState,
	InvalidPermissions,
	InvalidToken,

	/**
	 * Note was too long.
	 */
	InvalidNote,

	/**
	 * Provided too few or too many messages to delete (`2 ≤ x ≤ 100`).
	 */
	InvalidBulkDeleteCount,
	InvalidMFALevel,
	InvalidPassword,

	/**
	 * A message can only be pinned to the channel it was sent in.
	 */
	InvalidPinMessageChannel,
	InvalidInviteCode,

	/**
	 * Cannot execute action on a system message.
	 */
	InvalidMessageAction,
	InvalidPhoneNumber,
	InvalidClientID,

	/**
	 * Cannot execute action on this channel type.
	 */
	InvalidChannelType,
	InvalidOAuth2AccessToken,
	InvalidOAuth2MissingScope,
	InvalidWebhookToken,
	InvalidRole,
	InvalidRecipients = 50_033,

	/**
	 * A message provided was too old to bulk delete (\> 14 days).
	 */
	InvalidMessageAge,

	/**
	 * Invalid form body (returned for both `application/json` and `multipart/form-data` bodies),
	 * or invalid `Content-Type` provided.
	 */
	InvalidFormBody,

	/**
	 * An invite was accepted to a guild the application's bot is not in.
	 */
	InvalidGuildInvite,
	InvalidAPIVersion = 50_041,

	/**
	 * File uploaded exceeds the maximum size.
	 */
	InvalidFileSize = 50_045,
	InvalidFileUploaded,
	InvalidGiftRedemptionExhausted = 50_050,
	InvalidGiftRedemptionOwned,
	InvalidGiftSelfRedemption = 50_054,
	InvalidGiftPaymentSourceRequired = 50_070,

	/**
	 * Cannot delete a channel required for Community guilds.
	 */
	RequiredCommunityChannel = 50_074,
	InvalidStickerSent = 50_081,

	/**
	 * Tried to perform an operation on an archived thread.
	 */
	InvalidThreadArchiveState = 50_083,
	InvalidThreadNotificationSettings,

	/**
	 * `before` value is earlier than the thread creation date.
	 */
	InvalidBeforeThreadCreationDateValue,
	MFAEnabled = 60_001,
	MFADisabled,
	MFARequired,
	MFAUnverified,
	MFAInvalidSecret,
	MFAInvalidTicket,
	MFAInvalidCode,
	MFAInvalidSession,
	PhoneNumberUnableToSend = 70_003,
	PhoneVerificationRequired = 70_007,
	RelationshipIncomingDisabled = 80_000,
	RelationshipIncomingBlocked,
	RelationshipInvalidUserBot,
	RelationshipInvalidSelf,
	RelationshipInvalidDiscordTag,
	RelationshipAlreadyFriends = 80_007,
	ReactionBlocked = 90_001,
	InvalidGiftRedemptionSubscriptionManaged = 100_021,
	InvalidGiftRedemptionSubscriptionIncompatible = 100_023,
	InvalidGiftRedemptionInvoiceOpen,
	ListingAlreadyJoined = 120_000,
	ListingTooManyMembers,
	ListingJoinBlocked,
	APIResourceOverloaded = 130_000,
	StageAlreadyOpen = 150_006,
	ThreadAlreadyCreated = 160_004,
	ThreadLocked,
	TooManyThreads,
	TooManyAnnouncementThreads,

	/**
	 * Invalid JSON for uploaded Lottie file.
	 */
	InvalidLottieJSON = 170_001,

	/**
	 * Uploaded Lotties cannot contain rasterized images such as `PNG` or `JPEG`.
	 */
	InvalidLottieRasterizedImage,
	StickerFrameRateExceeded,

	/**
	 * Sticker frame count exceeds maximum of `1000` frames.
	 */
	StickerFrameCountExceeded,

	/**
	 * Lottie animation maximum dimensions exceeded.
	 */
	LottieAnimationDimensionsExceeded,

	/**
	 * Sticker frame rate is either too small or too large.
	 */
	InvalidStickerFrameRate,

	/**
	 * Sticker animation duration exceeds maximum of `5` seconds.
	 */
	StickerAnimationDurationExceeded
}

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes|Opcodes and Status Codes}
 */
export enum RPCCloseCode {
	/**
	 * You connected to the RPC server with an invalid client ID.
	 */
	InvalidClientID = 4000,

	/**
	 * You connected to the RPC server with an invalid origin.
	 */
	InvalidOrigin,

	/**
	 * You are being rate limited.
	 */
	RateLimited,

	/**
	 * The OAuth2 token associated with a connection was revoked.
	 */
	TokenRevoked,

	/**
	 * The RPC Server version specified in the connection string was not valid.
	 */
	InvalidVersion,

	/**
	 * The encoding specified in the connection string was not valid.
	 */
	InvalidEncoding
}

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-error-codes|Opcodes and Status Codes}
 */
export enum RPCErrorCode {
	UnknownError = 1000,
	ServiceUnavailable,
	TransactionAborted,
	InvalidPayload = 4000,
	InvalidCommand = 4002,
	InvalidGuild,
	InvalidEvent,
	InvalidChannel,
	InvalidPermissions,
	InvalidClientID,

	/**
	 * An invalid OAuth2 application origin was used to authorize or authenticate with.
	 */
	InvalidOrigin,

	/**
	 * An invalid OAuth2 token was used to authorize or authenticate with.
	 */
	InvalidToken,
	InvalidUser,
	InvalidInvite,
	InvalidActivityJoinRequest,
	InvalidLobby,
	InvalidLobbySecret,
	InvalidEntitlement,
	InvalidGiftCode,
	InvalidGuildTemplate,
	OAuth2Error = 5000,
	SelectChannelTimedOut,
	GetGuildTimedOut,

	/**
	 * You tried to join a user to a voice channel but the user was already in one.
	 */
	SelectVoiceForceRequired,
	CaptureShortcutAlreadyListening,
	InvalidActivitySecret,
	NoEligibleActivity,
	LobbyFull,
	PurchaseCancelled,
	PurchaseError,
	UnauthorizedForAchievement,
	RateLimited
}

export enum DispatchErrorCode {
	ApplicationNotFound = 101,
	DiskLow = 2022,
	DiskPermissionDenied = 2025,
	RedistributableInstallFailed,
	ApplicationLoadFailed = 2034,
	DeserializationFailed = 2047,
	Interrupted = 2055,
	MaxRequestRetriesExceeded = 2058,
	AuthenticationFailed = 2063,
	IOPermissionDenied,
	NoManifests,
	PostInstallCancelled,
	APIError = 2069,
	FileNameTooLong = 2072,
	NotEntitled,
	ApplicationLockFailed = 2076,
	NotDirectory,
	InvalidDrive,
	DiskFull = 2080
}

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes|Opcodes and Status Codes}
 */
export enum VoiceCloseCode {
	UnknownOPCode = 4001,

	/**
	 * An invalid payload was sent in your identifying to the Gateway.
	 */
	DecodeFailure,

	/**
	 * A payload was sent before identifying with the gateway.
	 */
	NotAuthenticated,

	/**
	 * An incorrect token was sent in your identify payload.
	 */
	AuthenticationFailed,
	AlreadyAuthenticated,
	InvalidSession,
	SessionTimeout = 4009,
	ServerNotFound = 4011,
	UnknownProtocol,

	/**
	 * Channel was deleted, you were kicked, voice server changed, or the main gateway session was
	 * dropped. Should not reconnect.
	 */
	Disconnected = 4014,
	VoiceServerCrashed,
	UnknownEncryptionMode
}

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes|Opcodes and Status Codes}
 */
export enum VoiceOPCode {
	/**
	 * Begin a voice websocket connection. This is sent by the client.
	 */
	Identify,

	/**
	 * Select the voice protocol. This is sent by the client.
	 */
	SelectProtocol,

	/**
	 * Complete the websocket handshake. This is sent by the server.
	 */
	Ready,

	/**
	 * Keep the websocket connection alive. This is sent by the client.
	 */
	Heartbeat,

	/**
	 * Describe the session. This is sent by the server.
	 */
	SessionDescription,

	/**
	 * Indicate which users are speaking. This is sent by the client and server.
	 */
	Speaking,

	/**
	 * Sent to acknowledge a received client heartbeat. This is sent by the server.
	 */
	HeartbeatAck,

	/**
	 * Resume a connection. This is sent by the client.
	 */
	Resume,

	/**
	 * Time to wait between sending heartbeats in milliseconds. This is sent by the server.
	 */
	Hello,

	/**
	 * Acknowledge a successful session resume. This is sent by the server.
	 */
	Resumed,

	/**
	 * A client has disconnected from the voice channel. This is sent by the server.
	 */
	ClientDisconnect = 13
}

export enum LobbyError {
	NoError,
	UnknownError,
	ServiceUnavailable,
	NotFound,
	InvalidSecret,
	Full,
	LobbyLimitReached,
	AlreadyConnecting
}
