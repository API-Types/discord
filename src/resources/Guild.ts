import type { Nullable, Tuple } from 'extended-utility-types';
import type {
	Channel,
	Emoji,
	GuildSticker,
	PartialChannel,
	PartialUser,
	PresenceUpdate,
	Role,
	snowflake,
	StageInstance,
	StatusType,
	ThreadChannel,
	User,
	VoiceState
} from '../';
import { TextChannel } from './';

export interface PartialGuild {
	/**
	 * Guild ID.
	 */
	id: snowflake;

	/**
	 * Guild name (`2-100` characters, excluding trailing and leading
	 * whitespace).
	 */
	name: Nullable<string>;

	/**
	 * Splash hash.
	 */
	splash: Nullable<string>;

	/**
	 * Banner hash.
	 */
	banner?: Nullable<string>;

	/**
	 * The description for the guild.
	 */
	description?: Nullable<string>;

	/**
	 * Enabled guild features.
	 */
	features?: `${GuildFeature}`[];

	/**
	 * Verification level required for the guild.
	 */
	verification_level?: VerificationLevel;

	/**
	 * The vanity URL code for the guild.
	 */
	vanity_url_code?: Nullable<string>;

	/**
	 * `true` if this guild is unavailable due to an outage.
	 */
	unavailable?: boolean;
}

/**
 * Represents an isolated collection of users and channels, and are often
 * referred to as "servers" in the UI.
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-structure|Guild}
 */
export interface Guild extends PartialGuild {
	/**
	 * Icon hash.
	 */
	icon: Nullable<string>;

	/**
	 * Icon hash. Returned when in the template object.
	 */
	icon_hash?: Nullable<string>;

	/**
	 * Discovery splash hash. Only present for guilds with the `DISCOVERABLE`
	 * feature.
	 */
	discovery_splash: Nullable<string>;

	/**
	 * `true` if the user is the owner of the guild.
	 *
	 * @remarks
	 * This field is only sent when using the `GET Current User Guilds` endpoint
	 * and is relative to the request user.
	 */
	owner?: boolean;

	/**
	 * ID of owner.
	 */
	owner_id: snowflake;

	/**
	 * Total permissions for the user in the guild (excludes overwrites).
	 *
	 * @remarks
	 * This field is only sent when using the `GET Current User Guilds` endpoint
	 * and is relative to the request user.
	 */
	permissions?: string;

	/**
	 * ID of AFK channel.
	 */
	afk_channel_id: Nullable<snowflake>;

	/**
	 * AFK timeout in seconds.
	 */
	afk_timeout: number;

	/**
	 * `true` if the server widget is enabled.
	 */
	wdiget_enabled?: boolean;

	/**
	 * The channel ID that the widget will generate an invite to, or `null` if
	 * set to no invite.
	 */
	widget_channel_id?: Nullable<snowflake>;

	/**
	 * Verification level required for the guild.
	 */
	verification_level: VerificationLevel;

	/**
	 * Default message notifications level.
	 */
	default_message_notifications: DefaultMessageNotificationLevel;

	/**
	 * Explicit content filter level.
	 */
	explicit_content_filter: ExplicitContentFilterLevel;

	/**
	 * Roles in the guild.
	 */
	roles: Role[];

	/**
	 * Custom guild emojis.
	 */
	emojis: Emoji[];

	/**
	 * Enabled guild features.
	 */
	features: `${GuildFeature}`[];

	/**
	 * Required MFA level for the guild.
	 */
	mfa_level: MFALevel;

	/**
	 * Application ID of the guild creator if it is bot-created.
	 */
	application_id: Nullable<snowflake>;

	/**
	 * The ID of the channel where guild notices such as welcome messages and
	 * boost events are posted.
	 */
	system_channel_id: Nullable<snowflake>;

	/**
	 * System channel flags.
	 */
	system_channel_flags: SystemChannelFlags;

	/**
	 * The ID of the channel where Community guilds can display rules and/or
	 * guidelines.
	 */
	rules_channel_id: Nullable<snowflake>;

	/**
	 * When this guild was joined at.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	joined_at?: Nullable<string>;

	/**
	 * `true` if this is considered a large guild.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	large?: boolean;

	/**
	 * `true` if this guild is unavailable due to an outage.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	unavailable?: boolean;

	/**
	 * Total number of members in this guild.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	member_count?: number;

	/**
	 * States of members currently in voice channels; lacks the `guild_id` key.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	voice_states?: Omit<VoiceState, 'guild_id'>[];

	/**
	 * Users in the guild.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	members?: GuildMember[];

	/**
	 * Channels in the guild.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	channels?: Channel[];

	/**
	 * All active threads in the guild that you have permission to view.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	threads?: ThreadChannel[];

	/**
	 * Presences of the members in the guild, will only include non-offline
	 * members if the size is greater than `large threshold`.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	presences?: Partial<PresenceUpdate['d']>[];

	/**
	 * The maximum number of presences for the guild.
	 */
	max_presences?: Nullable<number>;

	/**
	 * The maximum number of members for the guild.
	 */
	max_members?: number;

	/**
	 * The vanity URL code for the guild.
	 */
	vanity_url_code: Nullable<string>;

	/**
	 * The description of a Community guild.
	 */
	description: Nullable<string>;

	/**
	 * Banner hash.
	 */
	banner: Nullable<string>;

	/**
	 * Premium tier (Server Boost level).
	 */
	premium_tier: PremiumTier;

	/**
	 * The number of boosts this guild currently has.
	 */
	premium_subscription_count?: number;

	/**
	 * The preferred locale of a Community guild; used in server discovery and
	 * notices from Discord.
	 *
	 * @defaultValue `en-US`
	 */
	preferred_locale: string;

	/**
	 * The ID of the channel where admins and moderators of Community guilds
	 * receive notices from Discord.
	 */
	public_updates_channel_id: Nullable<snowflake>;

	/**
	 * The maximum amount of users in a video channel.
	 */
	max_video_channel_users?: number;

	/**
	 * Approximate number of members in this guild. Returned from the
	 * `GET /guilds/{guild.id}` endpoint when `with_counts` is `true`.
	 */
	approximate_member_count?: number;

	/**
	 * Approximate number of non-offline members in this guild. Returned from
	 * the `GET /guilds/{guild.id}` endpoint when `with_counts` is `true`.
	 */
	approximate_presence_count?: number;

	/**
	 * The welcome screen of a Community guild, shown to new members. Returned
	 * when in the invite object.
	 */
	welcome_screen?: WelcomeScreen;

	/**
	 * Guild NSFW level.
	 */
	nsfw_level: GuildNSFWLevel;

	/**
	 * Stage instances in the guild.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	stage_instances?: StageInstance[];

	/**
	 * Custom guild stickers.
	 */
	stickers?: GuildSticker[];
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level|Guild}
 */
export enum DefaultMessageNotificationLevel {
	/**
	 * Members will receive notifications for all messages by default.
	 */
	AllMessages,

	/**
	 * Members will receive notifications only for messages that `@mention`
	 * them by default.
	 */
	OnlyMentions
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level|Guild}
 */
export enum ExplicitContentFilterLevel {
	/**
	 * Media content will not be scanned.
	 */
	Disabled,

	/**
	 * Media content sent by members without any roles will be scanned.
	 */
	MembersWithoutRoles,

	/**
	 * Media content sent by any member will be scanned.
	 */
	AllMembers
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level|Guild}
 */
export enum MFALevel {
	/**
	 * Guild has no MFA/2FA requirement for moderation actions.
	 */
	None,

	/**
	 * Guild has a 2FA requirement for moderation actions.
	 */
	Elevated
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level|Guild}
 */
export enum VerificationLevel {
	/**
	 * Unrestricted.
	 */
	None,

	/**
	 * Must have a verified email on account.
	 */
	Low,

	/**
	 * Must be registered on Discord for longer than `5` minutes.
	 */
	Medium,

	/**
	 * Must be a member of the server for longer than `10` minutes.
	 */
	High,

	/**
	 * Must have a verified phone number.
	 */
	VeryHigh
}

export enum GuildNSFWLevel {
	Default,
	Explicit,
	Safe,
	AgeRestricted
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier|Guild}
 */
export enum PremiumTier {
	/**
	 * Guild has not unlocked any Server Boost perks.
	 */
	None,

	/**
	 * Guild has unlocked Server Boost level 1 perks.
	 */
	Tier1,

	/**
	 * Guild has unlocked Server Boost level 2 perks.
	 */
	Tier2,

	/**
	 * Guild has unlocked Server Boost level 3 perks.
	 */
	Tier3
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags|Guild}
 */
export enum SystemChannelFlags {
	/**
	 * Suppress member join notifications.
	 */
	SuppressJoinNotifications = 1 << 0,

	/**
	 * Suppress server boost notifications.
	 */
	SuppressPremiumSubscriptions = 1 << 1,

	/**
	 * Suppress server setup tips.
	 */
	SuppressGuildReminderNotifications = 1 << 2
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-features|Guild}
 */
export enum GuildFeature {
	/**
	 * Guild has access to set an animated guild icon.
	 */
	AnimatedIcon = 'ANIMATED_ICON',

	/**
	 * Guild has access to set a guild banner image.
	 */
	Banner = 'BANNER',

	/**
	 * Guild has access to use commerce features.
	 */
	Commerce = 'COMMERCE',

	/**
	 * Guild can enable welcome screen, Membership Screening, stage channels,
	 * and discovery, and receives community updates.
	 */
	Community = 'COMMUNITY',

	/**
	 * Guild is able to be discovered in the directory.
	 */
	Discoverable = 'DISCOVERABLE',

	/**
	 * Guild cannot be discoverable.
	 */
	DiscoverableDisabled = 'DISCOVERABLE_DISABLED',

	/**
	 * Guild is able to be featured in the directory.
	 */
	Featurable = 'FEATURABLE',

	/**
	 * Guild has access to set an invite splash background.
	 */
	InviteSplash = 'INVITE_SPLASH',

	/**
	 * Guild has enabled Membership Screening.
	 */
	MemberVerificationGateEnabled = 'MEMBER_VERIFICATION_GATE_ENABLED',

	/**
	 * Guild has enabled monetization.
	 */
	MonetizationEnabled = 'MONETIZATION_ENABLED',

	/**
	 * Guild has increased custom sticker slots.
	 */
	MoreStickers = 'MORE_STICKERS',

	/**
	 * Guild has access to create news channels.
	 */
	News = 'NEWS',

	/**
	 * Guild is partnered.
	 */
	Partnered = 'PARTNERED',

	/**
	 * Guild can be previewed before joining via Membership Screening or the
	 * directory.
	 */
	PreviewEnabled = 'PREVIEW_ENABLED',

	/**
	 * Guild has access to create private threads.
	 */
	PrivateThreads = 'PRIVATE_THREADS',

	/**
	 * Guild has access to the seven day archive time for threads.
	 */
	SevenDayThreadArchive = 'SEVEN_DAY_THREAD_ARCHIVE',

	/**
	 * Guild has access to the three day archive time for threads.
	 */
	ThreeDayThreadArchive = 'THREE_DAY_THREAD_ARCHIVE',

	/**
	 * Guild has enabled ticketed events.
	 */
	TicketedEventsEnabled = 'TICKETED_EVENTS_ENABLED',

	/**
	 * Guild has access to set a vanity URL.
	 */
	VanityURL = 'VANITY_URL',

	/**
	 * Guild is verified.
	 */
	Verified = 'VERIFIED',

	/**
	 * Guild has access to set 384kbps bitrate in voice (previously VIP voice
	 * servers).
	 */
	VIPRegions = 'VIP_REGIONS',

	/**
	 * Guild has enabled the welcome screen.
	 */
	WelcomeScreenEnabled = 'WELCOME_SCREEN_ENABLED'
}

/**
 * Represents an Offline Guild, or a Guild whose information has not been
 * provided through Guild Create events during the Gateway connect.
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#unavailable-guild-object-example-unavailable-guild|Guild}
 */
export interface UnavailableGuild {
	/**
	 * Guild ID.
	 */
	id: snowflake;
	readonly unavailable: true;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-preview-object-guild-preview-structure|Guild}
 */
export interface GuildPreview
	extends Pick<Guild, 'id' | 'name' | 'icon' | 'splash' | 'discovery_splash' | 'emojis' | 'features'> {
	/**
	 * Approximate number of members in this guild.
	 */
	approximate_member_count: number;

	/**
	 * Approximate number of online members in this guild.
	 */
	approximate_presence_count: number;

	/**
	 * The description for the guild, if the guild is discoverable.
	 */
	description: Nullable<string>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-widget-object-guild-widget-structure|Guild}
 */
export interface GuildWidgetSettings {
	/**
	 * Whether the widget is enabled.
	 */
	enabled: boolean;

	/**
	 * The widget channel ID.
	 */
	channel_id: Nullable<snowflake>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-example-get-guild-widget|Guild}
 */
export interface GuildWidget {
	id: snowflake;
	name: string;
	instant_invite: Nullable<string>;
	channels: GuildWidgetChannel[];
	members: GuildWidgetMember[];
	presence_count: number;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-example-get-guild-widget|Guild}
 */
export type GuildWidgetChannel = Omit<PartialChannel, 'type'> & Pick<TextChannel, 'position'>;

export interface GuildWidgetMember extends PartialUser {
	status: StatusType;
	avatar_url: string;
	activity?: { name: string };
}

/**
 * @source {@link https://discord.com/developers/docs/resources/invite#invite-stage-instance-object-example-invite-stage-instance|Invite}
 */
export interface PartialGuildMember {
	/**
	 * The user this guild member represents.
	 */
	user?: User;

	/**
	 * This users guild nickname.
	 */
	nick?: Nullable<string>;

	/**
	 * The member's guild avatar hash.
	 */
	avatar: Nullable<string>;

	/**
	 * Array of role object IDs.
	 */
	roles: snowflake[];

	/**
	 * When the user joined the guild.
	 */
	joined_at: string;

	/**
	 * When the user started boosting the guild.
	 */
	premium_since?: Nullable<string>;

	/**
	 * Whether the user has not yet passed the guild's Membership Screening
	 * requirements.
	 */
	pending?: boolean;
}

/**
 * @remarks
 * - The `user` field won't be included in the member object attached to
 * `MESSAGE_CREATE` and `MESSAGE_UPDATE` gateway events.
 * - In `GUILD_` events, `pending` will always be included as `true` or `false`.
 * In non `GUILD_` events which can only be triggered by non-`pending` users,
 * `pending` will not be included.
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure|Guild}
 */
export interface GuildMember extends PartialGuildMember {
	/**
	 * Whether the user is deafened in voice channels.
	 */
	deaf: boolean;

	/**
	 * Whether the user is muted in voice channels.
	 */
	mute: boolean;

	/**
	 * Total permissions of the member in the channel, including overwrites.
	 * Returned when in the interaction object.
	 */
	permissions?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-object-example-partial-integration-object|Audit Log}
 */
export interface PartialIntegration {
	/**
	 * Integration ID.
	 */
	id: snowflake;

	/**
	 * Integration name.
	 */
	name: string;

	/**
	 * Integration type.
	 */
	type: IntegrationType;

	/**
	 * Integration account information.
	 */
	account: IntegrationAccount;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-structure|Guild}
 */
export interface Integration extends PartialIntegration {
	/**
	 * Is this integration enabled.
	 */
	enabled: boolean;

	/**
	 * Is this integration syncing.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	syncing?: boolean;

	/**
	 * ID that this integration uses for "subscribers".
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	role_id?: snowflake;

	/**
	 * Whether emoticons should be synced for this integration (Twitch only
	 * currently).
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	enable_emoticons?: boolean;

	/**
	 * The behavior of expiring subscribers.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	expire_behavior?: IntegrationExpireBehavior;

	/**
	 * The grace period (in days) before expiring subscribers.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	expire_grace_period?: number;

	/**
	 * User for this integration.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	user?: User;

	/**
	 * When this integration was last synced.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	synced_at?: string;

	/**
	 * How many subscribers this integration has.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	subscriber_count?: number;

	/**
	 * Has this integration been revoked.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	revoked?: boolean;

	/**
	 * The bot/OAuth2 application for discord integrations.
	 */
	application?: IntegrationApplication;
}

export type IntegrationType = 'twitch' | 'youtube' | 'discord';

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors|Guild}
 */
export enum IntegrationExpireBehavior {
	RemoveRole,
	Kick
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-account-object-integration-account-structure|Guild}
 */
export interface IntegrationAccount {
	/**
	 * ID of the account.
	 */
	id: string;

	/**
	 * Name of the account.
	 */
	name: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure|Guild}
 */
export interface IntegrationApplication {
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
	 * The summary of the app.
	 */
	summary: string;

	/**
	 * The bot associated with this application.
	 */
	bot?: User;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#ban-object-ban-structure|Guild}
 */
export interface Ban {
	/**
	 * The reason for the ban.
	 */
	reason: Nullable<string>;

	/**
	 * The banned user.
	 */
	user: User;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-structure|Guild}
 */
export interface WelcomeScreen {
	/**
	 * The server description shown in the welcome screen.
	 */
	description: Nullable<string>;

	/**
	 * The channels shown in the welcome screen (up to `5`).
	 */
	welcome_channels: Partial<Tuple<WelcomeScreenChannel, 5>>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure|Guild}
 */
export interface WelcomeScreenChannel {
	/**
	 * The channel's ID.
	 */
	channel_id: snowflake;

	/**
	 * The description shown for the channel.
	 */
	description: string;

	/**
	 * The emoji ID, if the emoji is custom.
	 */
	emoji_id: Nullable<snowflake>;

	/**
	 * The emoji name if custom, the unicode character if standard, or `null` if
	 * no emoji is set.
	 */
	emoji_name: Nullable<string>;
}

/**
 * In guilds with Membership Screening enabled, when a member joins, Guild
 * Member Add will be emitted but they will initially be restricted from doing
 * any actions in the guild, and `pending` will be `true` in the member object.
 * When the member completes the screening, Guild Member Update will be emitted
 * and `pending` will be `false`.
 *
 * Giving the member a role will bypass Membership Screening as well as the
 * guild's verification level, giving the member immediate access to chat.
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#membership-screening-object|Guild}
 */
export interface MembershipScreening {
	/**
	 * When the fields were last updated.
	 */
	version: string;

	/**
	 * The steps in the screening form.
	 */
	form_fields: ScreeningField[];

	/**
	 * The server description shown in the screening form.
	 */
	description: Nullable<string>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#membership-screening-object-membership-screening-field-structure|Guild}
 */
export interface ScreeningField {
	field_type: ScreeningFieldType;

	/**
	 * The title of the field.
	 */
	label: string;

	/**
	 * The list of rules.
	 */
	values?: string[];

	/**
	 * Whether the user has to fill out the field.
	 */
	required: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#membership-screening-object-membership-screening-field-types|Guild}
 */
export enum ScreeningFieldType {
	Terms = 'Server Rules'
}
