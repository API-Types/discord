import type { Nullable } from 'extended-utility-types';
import type {
	AutoArchiveDuration,
	DefaultMessageNotificationLevel,
	ExplicitContentFilterLevel,
	GuildScheduledEventEntityType,
	GuildScheduledEventStatus,
	IntegrationExpireBehavior,
	MFALevel,
	Overwrite,
	PartialIntegration,
	PartialRole,
	PrivacyLevel,
	snowflake,
	StickerFormatType,
	ThreadChannel,
	User,
	VerificationLevel,
	Webhook
} from '../';

/**
 * Whenever an admin action is performed on the API, an entry is added to the
 * respective guild's audit log. A reason can be specified by attaching the
 * `X-Audit-Log-Reason` request header. This header supports URL encoded
 * `UTF-8` characters.
 *
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure|Audit Log}
 */
export interface AuditLog {
	/**
	 * List of webhooks found in the audit log.
	 */
	webhooks: Webhook[];

	/**
	 * List of users found in the audit log.
	 */
	users: User[];

	/**
	 * List of audit log entries.
	 */
	audit_log_entries: AuditLogEntry[];

	/**
	 * List of partial integration objects.
	 */
	integrations: PartialIntegration[];

	/**
	 * List of threads found in the audit log.
	 *
	 * @remarks
	 * Threads referenced in `THREAD_CREATE` and `THREAD_UPDATE` events are
	 * included in the threads map, since archived threads might not be kept in
	 * memory by clients.
	 */
	threads: ThreadChannel[];
}

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure|Audit Log}
 */
export interface AuditLogEntry {
	/**
	 * ID of the affected entity.
	 */
	target_id: Nullable<string>;

	/**
	 * Changes made to the `target_id`.
	 */
	changes?: AuditLogChange[];

	/**
	 * The user who made the changes.
	 */
	user_id: Nullable<snowflake>;

	/**
	 * ID of the entry.
	 */
	id: snowflake;

	/**
	 * Type of action that occurred.
	 */
	action_type: AuditLogEvent;

	/**
	 * Additional info for certain action types.
	 */
	options?: OptionalAuditEntryInfo;

	/**
	 * The reason for the change (`0-512` characters).
	 */
	reason?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events|Audit Log}
 */
export enum AuditLogEvent {
	GuildUpdate = 1,
	ChannelCreate = 10,
	ChannelUpdate,
	ChannelDelete,
	ChannelOverwriteCreate,
	ChannelOverwriteUpdate,
	ChannelOverwriteDelete,
	MemberKick = 20,
	MemberPrune,
	MemberBanAdd,
	MemberBanRemove,
	MemberUpdate,
	MemberRoleUpdate,
	MemberMove,
	MemberDisconnect,
	BotAdd,
	RoleCreate = 30,
	RoleUpdate,
	RoleDelete,
	InviteCreate = 40,
	InviteUpdate,
	InviteDelete,
	WebhookCreate = 50,
	WebhookUpdate,
	WebhookDelete,
	EmojiCreate = 60,
	EmojiUpdate,
	EmojiDelete,
	MessageDelete = 72,
	MessageBulkDelete,
	MessagePin,
	MessageUnpin,
	IntegrationCreate = 80,
	IntegrationUpdate,
	IntegrationDelete,
	StageInstanceCreate,
	StageInstanceUpdate,
	StageInstanceDelete,
	StickerCreate = 90,
	StickerUpdate,
	StickerDelete,
	GuildScheduledEventCreate = 100,
	GuildScheduledEventUpdate,
	GuildScheduledEventDelete,
	ThreadCreate = 110,
	ThreadUpdate,
	ThreadDelete
}

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info|Audit Log}
 */
export interface OptionalAuditEntryInfo {
	/**
	 * Number of days after which inactive members were kicked. Only present on
	 * `MEMBER_PRUNE` action types.
	 */
	delete_member_days?: string;

	/**
	 * Number of members removed by the prune. Only present on `MEMBER_PRUNE`
	 * action types.
	 */
	members_removed?: string;

	/**
	 * Channel in which the entities were targeted. Present on the following
	 * action types:
	 * - `MEMBER_MOVE`
	 * - `MESSAGE_PIN`
	 * - `MESSAGE_UNPIN`
	 * - `MESSAGE_DELETE`
	 * - `STAGE_INSTANCE_CREATE`
	 * - `STAGE_INSTANCE_UPDATE`
	 * - `STAGE_INSTANCE_DELETE`
	 */
	channel_id?: snowflake;

	/**
	 * ID of the message that was targeted. Present on the following action
	 * types:
	 * - `MESSAGE_PIN`
	 * - `MESSAGE_UNPIN`
	 */
	message_id?: snowflake;

	/**
	 * Number of entities that were targeted. Present on the following action
	 * types:
	 * - `MESSAGE_DELETE`
	 * - `MESSAGE_BULK_DELETE`
	 * - `MEMBER_DISCONNECT`
	 * - `MEMBER_MOVE`
	 */
	count?: string;

	/**
	 * ID of the overwritten entity. Present on the following action types:
	 * - `CHANNEL_OVERWRITE_CREATE`
	 * - `CHANNEL_OVERWRITE_UPDATE`
	 * - `CHANNEL_OVERWRITE_DELETE`
	 */
	id?: snowflake;

	/**
	 * Type of overwritten entity–`'0'` for `role` or `'1'` for `member`.
	 * Present on the following action types:
	 * - `CHANNEL_OVERWRITE_CREATE`
	 * - `CHANNEL_OVERWRITE_UPDATE`
	 * - `CHANNEL_OVERWRITE_DELETE`
	 */
	type?: '0' | '1';

	/**
	 * Name of the role if type is `'0'` (not present if type is `'1'`). Present
	 * on the following action types:
	 * - `CHANNEL_OVERWRITE_CREATE`
	 * - `CHANNEL_OVERWRITE_UPDATE`
	 * - `CHANNEL_OVERWRITE_DELETE`
	 */
	role_name?: string;
}

/**
 * @remarks
 * If `new_value` is not present in the change object, while `old_value` is,
 * that means the property that was changed has been reset, or set to `null`.
 *
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure|Audit Log}
 */
export type AuditLogChange = { [K in keyof AuditLogChangeKey]: BaseAuditLogChange<K> }[keyof AuditLogChangeKey];

export interface BaseAuditLogChange<K extends keyof AuditLogChangeKey> {
	/**
	 * New value of the key.
	 */
	new_value?: AuditLogChangeKey[K];

	/**
	 * Old value of the key.
	 */
	old_value?: AuditLogChangeKey[K];

	/**
	 * Name of audit log change key.
	 */
	key: K;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-key|Audit Log}
 */
export interface AuditLogChangeKey {
	/**
	 * Any name changed.
	 */
	name: string;

	/**
	 * Guild or sticker description changed.
	 */
	description: string;

	/**
	 * Guild icon changed.
	 */
	icon_hash: string;

	/**
	 * Guild invite splash page artwork changed.
	 */
	splash_hash: string;

	/**
	 * Guild discovery splash changed.
	 */
	discovery_splash_hash: string;

	/**
	 * Guild banner changed.
	 */
	banner_hash: string;

	/**
	 * Guild owner changed.
	 */
	owner_id: snowflake;

	/**
	 * Guild region changed.
	 */
	region: string;

	/**
	 * Guild's preferred locale changed.
	 */
	preferred_locale: string;

	/**
	 * Guild AFK channel changed.
	 */
	afk_channel_id: snowflake;

	/**
	 * Guild AFK timeout duration changed.
	 */
	afk_timeout: number;

	/**
	 * Guild's rules channel changed.
	 */
	rules_channel_id: snowflake;

	/**
	 * Guild's public updates channel changed.
	 */
	public_updates_channel_id: snowflake;

	/**
	 * Guild's two-factor auth requirement changed.
	 */
	mfa_level: MFALevel;

	/**
	 * Guild's required verification level changed.
	 */
	verification_level: VerificationLevel;

	/**
	 * Change in whose messages are scanned and deleted for explicit content in
	 * the server.
	 */
	explicit_content_filter: ExplicitContentFilterLevel;

	/**
	 * Guild's default message notification level changed.
	 */
	default_message_notifications: DefaultMessageNotificationLevel;

	/**
	 * Guild invite vanity URL changed.
	 */
	vanity_url_code: string;

	/**
	 * New role added.
	 */
	$add: PartialRole[];

	/**
	 * Role removed.
	 */
	$remove: PartialRole[];

	/**
	 * Change in number of days after which inactive and role-unassigned members
	 * are kicked.
	 */
	prune_delete_days: number;

	/**
	 * Server widget enabled/disabled.
	 */
	widget_enabled: boolean;

	/**
	 * Channel ID of the server widget changed.
	 */
	widget_channel_id: snowflake;

	/**
	 * ID of the system channel of the server changed.
	 */
	system_channel_id: snowflake;

	/**
	 * Text or voice channel position changed.
	 */
	position: number;

	/**
	 * Channel or stage instance topic changed.
	 */
	topic: string;

	/**
	 * Voice channel bitrate changed.
	 */
	bitrate: number;

	/**
	 * Permissions on a channel changed.
	 */
	permission_overwrites: Overwrite[];

	/**
	 * Channel NSFW restriction changed.
	 */
	nsfw: boolean;

	/**
	 * Application ID of the added or removed webhook or bot.
	 */
	application_id: snowflake;

	/**
	 * Amount of seconds a user has to wait before sending another message
	 * changed.
	 */
	rate_limit_per_user: number;

	/**
	 * Permissions for a role changed.
	 */
	permissions: string;

	/**
	 * Role color changed.
	 */
	color: number;

	/**
	 * Role is now displayed/no longer displayed separate from online users.
	 */
	hoist: boolean;

	/**
	 * Role is now mentionable/unmentionable.
	 */
	mentionalble: boolean;

	/**
	 * A permission on a text or voice channel was allowed for a role.
	 */
	allow: string;

	/**
	 * A permission on a text or voice channel was denied for a role.
	 */
	deny: string;

	/**
	 * Invite code changed.
	 */
	code: string;

	/**
	 * Channel for invite code changed.
	 */
	channel_id: snowflake;

	/**
	 * Person who created invite code changed.
	 */
	inviter_id: snowflake;

	/**
	 * Change to max number of times invite code can be used.
	 */
	max_uses: number;

	/**
	 * Number of times an invite code can be used changed.
	 */
	uses: number;

	/**
	 * How long the invite code lasts changed.
	 */
	max_age: number;

	/**
	 * Invite code is temporary/never expires.
	 */
	temporary: boolean;

	/**
	 * User server deafened/undeafened.
	 */
	deaf: boolean;

	/**
	 * User server muted/unmuted.
	 */
	mute: boolean;

	/**
	 * User nickname changed.
	 */
	nick: string;

	/**
	 * User avatar changed.
	 */
	avatar_hash: string;

	/**
	 * The ID of the changed entity–sometimes used in conjunction with other
	 * keys.
	 */
	id: snowflake;

	/**
	 * Type of entity created.
	 */
	type: number | string;

	/**
	 * Integration emoticons enabled/disabled.
	 */
	enable_emoticons: boolean;

	/**
	 * Integration expiring subscriber behavior changed.
	 */
	expire_behavior: IntegrationExpireBehavior;

	/**
	 * Integration expire grace period changed.
	 */
	expire_grace_period: number;

	/**
	 * New user limit in a voice channel.
	 */
	user_limit: number;

	/**
	 * The privacy level of the stage instance.
	 */
	privacy_level: PrivacyLevel;

	/**
	 * Related emoji of sticker changed.
	 */
	tags: string;

	/**
	 * Format type of sticker changed.
	 */
	format_type: StickerFormatType;

	/**
	 * Availability of sticker changed.
	 */
	available: boolean;

	/**
	 * The guild the sticker is in changed.
	 */
	guild_id: snowflake;

	/**
	 * Thread is now archived/unarchived.
	 */
	archived: boolean;

	/**
	 * Thread is now locked/unlocked.
	 */
	locked: boolean;

	/**
	 * Auto archive duration changed.
	 */
	auto_archive_duration: AutoArchiveDuration;

	/**
	 * Default auto archive duration for newly created threads changed.
	 */
	default_auto_archive_duration: AutoArchiveDuration;

	/**
	 * Entity type of a guild scheduled event was changed.
	 */
	entity_type: GuildScheduledEventEntityType;

	/**
	 * Status of a guild scheduled event was changed.
	 */
	status: GuildScheduledEventStatus;

	/**
	 * The SKUs of a guild event was changed.
	 */
	sku_ids: snowflake[];
}
