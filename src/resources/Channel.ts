import type { Nullable, Range, Tuple } from 'extended-utility-types';
import type {
	ActionRow,
	Application,
	GatewayReactionEmoji,
	GuildMember,
	MessageInteraction,
	snowflake,
	StickerItem,
	User
} from '../';

export interface PartialChannel {
	/**
	 * The ID of this channel.
	 */
	id: snowflake;

	/**
	 * The name of the channel (`1-100` characters).
	 */
	name: string;

	/**
	 * The type of channel.
	 */
	type: ChannelType;
}

/**
 * Represents a guild or DM channel within Discord.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure|Channel}
 */
export type Channel =
	| TextChannel
	| DMChannel
	| VoiceChannel
	| GroupDMChannel
	| CategoryChannel
	| NewsChannel
	| StoreChannel
	| ThreadChannel
	| StageChannel;

export interface BaseChannel {
	/**
	 * The ID of this channel.
	 */
	id: snowflake;

	/**
	 * The type of channel.
	 */
	type: ChannelType;

	/**
	 * The ID of the guild (may be missing for some channel objects received
	 * over gateway guild dispatches).
	 */
	guild_id?: snowflake;

	/**
	 * Sorting position of the channel.
	 */
	position?: number;

	/**
	 * Explicit permission overwrites for members and roles.
	 */
	permission_overwrites?: Overwrite[];

	/**
	 * The name of the channel (`1-100` characters).
	 */
	name?: string;

	/**
	 * The channel topic (`0-1024` characters).
	 */
	topic?: Nullable<string>;

	/**
	 * Whether the channel is NSFW.
	 */
	nsfw?: boolean;

	/**
	 * The ID of the last message sent in this channel (may not point to an
	 * existing or valid message).
	 */
	last_message_id?: Nullable<snowflake>;

	/**
	 * The bitrate (in bits) of the voice or stage channel.
	 */
	bitrate?: number;

	/**
	 * The user limit of the voice or stage channel.
	 */
	user_limit?: number;

	/**
	 * Amount of seconds a user has to wait before sending another message
	 * (`0-21600`); bots, as well as users with the permission `MANAGE_MESSAGES`
	 * or `MANAGE_CHANNEL`, are unaffected.
	 *
	 * @remarks
	 * This also applies to thread creation. Users can send one message and
	 * create one thread during each `rate_limit_per_user` interval.
	 */
	rate_limit_per_user?: number;

	/**
	 * The recipients of the DM.
	 */
	recipients?: Partial<Tuple<User, 9>>;

	/**
	 * Icon hash.
	 */
	icon?: Nullable<string>;

	/**
	 * ID of the creator of the group DM or thread.
	 */
	owner_id?: snowflake;

	/**
	 * Application ID of the group DM creator if it is bot-created.
	 */
	application_id?: snowflake;

	/**
	 * For guild channels: ID of the parent category for a channel (each parent
	 * category can contain up to `50` channels). For threads: ID of the text
	 * channel this thread was created in.
	 */
	parent_id?: Nullable<snowflake>;

	/**
	 * When the last pinned message was pinned. This may be `null` in events
	 * such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp?: Nullable<string>;

	/**
	 * Voice region ID for the voice or stage channel. Automatic when set to
	 * `null`.
	 */
	rtc_region?: Nullable<string>;

	/**
	 * The camera video quality mode of the voice or stage channel. `1` when
	 * not present.
	 */
	video_quality_mode?: VideoQualityMode;

	/**
	 * An approximate count of messages in a thread. Stops counting at `50`.
	 */
	message_count?: Range<0, 50>;

	/**
	 * An approximate count of users in a thread. Stops counting at `50`.
	 */
	member_count?: Range<0, 50>;

	/**
	 * Thread-specific fields not needed by other channels.
	 */
	thread_metadata?: ThreadMetadata;

	/**
	 * Thread member object for the current user, if they have joined the
	 * thread. Only included for certain API endpoints.
	 */
	member?: ThreadMember;

	/**
	 * Default duration for newly created threads, in minutes, to automatically
	 * archive the thread after recent activity.
	 */
	default_auto_archive_duration?: AutoArchiveDuration;

	/**
	 * Computed permissions for the invoking user in the channel, including
	 * overwrites. Only included when part of the `resolved` data received on a
	 * slash command interaction.
	 */
	permissions?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel|Channel}
 */
export interface TextChannel
	extends Required<
			Pick<
				BaseChannel,
				| 'id'
				| 'position'
				| 'permission_overwrites'
				| 'name'
				| 'topic'
				| 'nsfw'
				| 'last_message_id'
				| 'rate_limit_per_user'
				| 'last_pin_timestamp'
				| 'default_auto_archive_duration'
			>
		>,
		Pick<BaseChannel, 'guild_id'> {
	/**
	 * `0` for Text Channels.
	 */
	readonly type: ChannelType.GuildText;

	/**
	 * ID of the parent category for a channel (each parent category can contain
	 * up to `50` channels).
	 */
	parent_id: Nullable<snowflake>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-dm-channel|Channel}
 */
export interface DMChannel extends Required<Pick<BaseChannel, 'id' | 'last_message_id' | 'last_pin_timestamp'>> {
	/**
	 * `1` for DM Channels.
	 */
	readonly type: ChannelType.DM;

	/**
	 * The recipient of the DM.
	 */
	recipients: [User];
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-voice-channel|Channel}
 */
export interface VoiceChannel
	extends Required<
			Pick<
				BaseChannel,
				'id' | 'position' | 'permission_overwrites' | 'name' | 'nsfw' | 'bitrate' | 'user_limit' | 'rtc_region'
			>
		>,
		Pick<BaseChannel, 'guild_id' | 'video_quality_mode'> {
	/**
	 * `2` for Voice Channels.
	 */
	readonly type: ChannelType.GuildVoice;

	/**
	 * ID of the parent category for a channel (each parent category can contain
	 * up to `50` channels).
	 */
	parent_id: Nullable<snowflake>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-group-dm-channel|Channel}
 */
export interface GroupDMChannel
	extends Required<
		Pick<BaseChannel, 'id' | 'name' | 'last_message_id' | 'recipients' | 'icon' | 'last_pin_timestamp'>
	> {
	/**
	 * `3` for Group DM Channels.
	 */
	readonly type: ChannelType.GroupDM;

	/**
	 * ID of the creator of the group DM.
	 */
	owner_id: snowflake;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-channel-category|Channel}
 */
export interface CategoryChannel
	extends Required<Pick<BaseChannel, 'id' | 'position' | 'permission_overwrites' | 'name' | 'nsfw'>> {
	/**
	 * `4` for Category Channels.
	 */
	readonly type: ChannelType.GuildCategory;
	readonly parent_id: null;
}

/**
 * Bots can post or publish messages in this type of channel if they have the
 * proper permissions. These are called "Announcement Channels" in the client.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-news-channel|Channel}
 */
export interface NewsChannel extends Omit<TextChannel, 'type' | 'rate_limit_per_user'> {
	/**
	 * `5` for News Channels.
	 */
	readonly type: ChannelType.GuildNews;
}

/**
 * Bots can neither send or read messages from this channel type (as it is a
 * store page).
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-store-channel|Channel}
 */
export interface StoreChannel extends Omit<CategoryChannel, 'type' | 'parent_id'> {
	/**
	 * `6` for Store Channels.
	 */
	readonly type: ChannelType.GuildStore;

	/**
	 * ID of the parent category for a channel (each parent category can contain
	 * up to `50` channels).
	 */
	parent_id: Nullable<snowflake>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel|Channel}
 */
export interface ThreadChannel
	extends Required<
			Pick<
				BaseChannel,
				| 'id'
				| 'name'
				| 'last_message_id'
				| 'rate_limit_per_user'
				| 'last_pin_timestamp'
				| 'message_count'
				| 'member_count'
				| 'thread_metadata'
			>
		>,
		Pick<BaseChannel, 'guild_id' | 'member'> {
	/**
	 * `10`, `11`, or `12` for Thread Channels.
	 */
	readonly type: ChannelType.GuildNewsThread | ChannelType.GuildPublicThread | ChannelType.GuildPrivateThread;

	/**
	 * ID of the creator of the thread.
	 */
	owner_id: snowflake;

	/**
	 * ID of the text channel this thread was created in.
	 */
	parent_id: snowflake;
}

export interface StageChannel extends Omit<VoiceChannel, 'type' | 'video_quality_mode'> {
	/**
	 * `13` for Stage Channels.
	 */
	readonly type: ChannelType.GuildStageVoice;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types|Channel}
 */
export enum ChannelType {
	/**
	 * A text channel within a server.
	 */
	GuildText,

	/**
	 * A direct message between users.
	 */
	DM,

	/**
	 * A voice channel within a server.
	 */
	GuildVoice,

	/**
	 * A direct message between multiple users.
	 */
	GroupDM,

	/**
	 * An organizational category that contains up to `50` channels.
	 */
	GuildCategory,

	/**
	 * A channel that users can follow and crosspost into their own server.
	 */
	GuildNews,

	/**
	 * A channel in which game developers can sell their game on Discord.
	 */
	GuildStore,

	/**
	 * A temporary sub-channel within a `GUILD_NEWS` channel.
	 */
	GuildNewsThread = 10,

	/**
	 * A temporary sub-channel within a `GUILD_TEXT` channel.
	 */
	GuildPublicThread,

	/**
	 * A temporary sub-channel within a `GUILD_TEXT` channel that is only
	 * viewable by those invited and those with the `MANAGE_THREADS`
	 * permission.
	 */
	GuildPrivateThread,

	/**
	 * A voice channel for hosting events with an audience.
	 */
	GuildStageVoice,
	GuildDirectory
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes|Channel}
 */
export enum VideoQualityMode {
	/**
	 * Discord chooses the quality for optimal performance.
	 */
	Auto = 1,

	/**
	 * 720p.
	 */
	Full
}

/**
 * Represents a message sent in a channel within Discord.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-structure|Channel}
 */
export interface Message {
	/**
	 * ID of the message.
	 */
	id: snowflake;

	/**
	 * ID of the channel the message was sent in.
	 */
	channel_id: snowflake;

	/**
	 * ID of the guild the message was sent in.
	 */
	guild_id?: snowflake;

	/**
	 * The author of this message (not guaranteed to be a valid user).
	 *
	 * @remarks
	 * The author object follows the structure of the user object, but is only
	 * a valid user in the case where the message is generated by a user or bot
	 * user. If the message is generated by a webhook, the author object
	 * corresponds to the webhook's ID, username, and avatar. You can tell if a
	 * message is generated by a webhook by checking for the `webhook_id` on
	 * the message object.
	 */
	author: User;

	/**
	 * Member properties for this message's author.
	 *
	 * @remarks
	 * The member object exists in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events
	 * from text-based guild channels, provided that the author of the message
	 * is not a webhook. This allows bots to obtain real-time member data
	 * without requiring bots to store member state in memory.
	 */
	member?: GuildMember;

	/**
	 * Contents of the message.
	 */
	content: string;

	/**
	 * When this message was sent.
	 */
	timestamp: string;

	/**
	 * When this message was edited (or `null` if never).
	 */
	edited_timestamp?: Nullable<string>;

	/**
	 * Whether this was a TTS message.
	 */
	tts: boolean;

	/**
	 * Whether this message mentions everyone.
	 */
	mention_everyone: boolean;

	/**
	 * Users specifically mentioned in the message.
	 *
	 * @remarks
	 * The user objects in the mentions array will only have the partial
	 * `member` field present in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events
	 * from text-based guild channels.
	 */
	mentions: UserMention[];

	/**
	 * Roles specifically mentioned in this message.
	 */
	mention_roles: snowflake[];

	/**
	 * Channels specifically mentioned in this message.
	 *
	 * @remarks
	 * Not all channel mentions will appear in `mention_channels`. Only textual
	 * channels that are visible to everyone in a lurkable guild will ever be
	 * included. Only crossposted messages (via Channel Following) current
	 * include `mention_channels`. If no mentions in the message meet these
	 * requirements, this field will not be sent.
	 */
	mention_channels?: ChannelMention[];

	/**
	 * Any attached files.
	 */
	attachments: Attachment[];

	/**
	 * Any embedded content.
	 */
	embeds: Partial<Tuple<Embed, 10>>;

	/**
	 * Reactions to the message.
	 */
	reactions?: Partial<Tuple<Reaction, 20>>;

	/**
	 * Used for validating a message was sent.
	 */
	nonce?: number | string;

	/**
	 * Whether this message is pinned.
	 */
	pinned: boolean;

	/**
	 * If the message is generated by a webhook, this is the webhook's ID.
	 */
	webhook_id?: snowflake;

	/**
	 * Type of message.
	 */
	type: MessageType;

	/**
	 * Sent with Rich Presence-related chat embeds.
	 */
	activity?: MessageActivity;

	/**
	 * Sent with Rich Presence-related chat embeds.
	 */
	application?: Partial<Application>;

	/**
	 * If the message is a response to an Interaction, this is the ID of the
	 * interaction's application.
	 */
	application_id?: snowflake;

	/**
	 * Data showing the source of a crosspost, channel follow add, pin, or reply
	 * message.
	 */
	message_reference?: MessageReference;

	/**
	 * Message flags combined as a bitfield.
	 */
	flags?: MessageFlags;

	/**
	 * The message associated with the `message_reference`.
	 *
	 * @remarks
	 * This field is only returned for messages with a `type` of `19` (`REPLY`)
	 * or `21` (`THREAD_STARTER_MESSAGE`). If the message is a reply but the
	 * `referenced_message` field is not present, the backend did not attempt
	 * to fetch the message that was being replied to, so its state is unknown.
	 * If the field exists but is `null`, the referenced message was deleted.
	 */
	referenced_message?: Nullable<Message>;

	/**
	 * Sent if the message is a response to an Interaction.
	 */
	interaction?: MessageInteraction;

	/**
	 * The thread that was started from this message, includes thread member
	 * object.
	 */
	thread?: ThreadChannel & Required<Pick<ThreadChannel, 'member'>>;

	/**
	 * Sent if the message contains components.
	 */
	components?: Partial<Tuple<ActionRow, 5>>;

	/**
	 * Sent if the message contains stickers.
	 */
	sticker_items?: StickerItem[];
}

export interface UserMention extends User {
	member?: Omit<GuildMember, 'user'>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-types|Channel}
 */
export enum MessageType {
	Default,
	RecipientAdd,
	RecipientRemove,
	Call,
	ChannelNameChange,
	ChannelIconChange,
	ChannelPinnedMessage,
	GuildMemberJoin,
	UserPremiumGuildSubscription,
	UserPremiumGuildSubscriptionTier1,
	UserPremiumGuildSubscriptionTier2,
	UserPremiumGuildSubscriptionTier3,
	ChannelFollowAdd,
	GuildStream,
	GuildDiscoveryDisqualified,
	GuildDiscoveryRequalified,
	GuildDiscoveryGracePeriodInitialWarning,
	GuildDiscoveryGracePeriodFinalWarning,
	ThreadCreated,
	Reply,
	ChatInputCommand,
	ThreadStarterMessage,
	GuildInviteReminder,
	ContextMenuCommand
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure|Channel}
 */
export interface MessageActivity {
	/**
	 * Type of message activity.
	 */
	type: MessageActivityType;

	/**
	 * `party_id` from a Rich Presence event.
	 */
	party_id?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-types|Channel}
 */
export enum MessageActivityType {
	Join = 1,
	Spectate,
	Listen,
	JoinRequest = 5
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-flags|Channel}
 */
export enum MessageFlags {
	/**
	 * This message has been published to subscribed channels (via Channel
	 * Following).
	 */
	Crossposted = 1 << 0,

	/**
	 * This message originated from a message in another channel (via Channel
	 * Following).
	 */
	IsCrosspost = 1 << 1,

	/**
	 * Do not include any embeds when serializing this message.
	 */
	SuppressEmbeds = 1 << 2,

	/**
	 * The source message for this crosspost has been deleted (via Channel
	 * Following).
	 */
	SourceDeleted = 1 << 3,

	/**
	 * This message came from the urgent message system.
	 */
	Urgent = 1 << 4,

	/**
	 * This message has an associated thread, with the same ID as the message.
	 */
	HasThread = 1 << 5,

	/**
	 * This message is only visible to the user who invoked the Interaction.
	 */
	Ephemeral = 1 << 6,

	/**
	 * This message is an `InteractionResponse` and the bot is "thinking".
	 */
	Loading = 1 << 7
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure|Channel}
 */
export interface MessageReference {
	/**
	 * ID of the originating message.
	 */
	message_id?: snowflake;

	/**
	 * ID of the originating message's channel.
	 *
	 * @remarks
	 * `channel_id` is optional when creating a reply, but will always be
	 * present when receiving an event/response that includes this data model.
	 */
	channel_id?: snowflake;

	/**
	 * ID of the originating message's guild.
	 */
	guild_id?: snowflake;

	/**
	 * When sending, whether to error if the referenced message doesn't exist
	 * instead of sending as a normal (non-reply) message.
	 *
	 * @defaultValue `true`
	 */
	fail_if_not_exists?: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#followed-channel-object-followed-channel-structure|Channel}
 */
export interface FollowedChannel {
	/**
	 * Source channel ID.
	 */
	channel_id: snowflake;

	/**
	 * Created target webhook ID.
	 */
	webhook_id: snowflake;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure|Channel}
 */
export interface Reaction {
	/**
	 * Times this emoji has been used to react.
	 */
	count: number;

	/**
	 * Whether the current user reacted using this emoji.
	 */
	me: boolean;

	/**
	 * Emoji information.
	 */
	emoji: GatewayReactionEmoji;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure|Channel}
 */
export interface Overwrite {
	/**
	 * Role or user ID.
	 */
	id: snowflake;

	/**
	 * Either `0` (role) or `1` (member).
	 */
	type: OverwriteType;

	/**
	 * Permission bit set.
	 */
	allow: string;

	/**
	 * Permission bit set.
	 */
	deny: string;
}

export enum OverwriteType {
	Role,
	Member
}

/**
 * The thread metadata object contains a number of thread-specific channel
 * fields that are not needed by other channel types.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure|Channel}
 */
export interface ThreadMetadata {
	/**
	 * Whether the thread is archived.
	 */
	archived: boolean;

	/**
	 * Duration in minutes to automatically archive the thread after recent
	 * activity.
	 */
	auto_archive_duration: AutoArchiveDuration;

	/**
	 * Timestamp when the thread's archive status was last changed, used for
	 * calculating recent activity.
	 */
	archive_timestamp: string;

	/**
	 * When a thread is locked, only users with `MANAGE_THREADS` can unarchive
	 * it.
	 */
	locked: boolean;

	/**
	 * Whether non-moderators can add other non-moderators to a thread. Only
	 * available on private threads.
	 */
	invitable?: boolean;
}

export type AutoArchiveDuration = 60 | 1440 | 4320 | 10080;

/**
 * A thread member is used to indicate whether a user has joined a thread or
 * not.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#thread-member-object-thread-member-structure|Channel}
 */
export interface ThreadMember {
	/**
	 * The ID of the thread.
	 *
	 * @remarks
	 * This field is omitted on the member sent within each thread in the
	 * `GUILD_CREATE` event.
	 */
	id?: snowflake;

	/**
	 * The ID of the user.
	 *
	 * @remarks
	 * This field is omitted on the member sent within each thread in the
	 * `GUILD_CREATE` event.
	 */
	user_id?: snowflake;

	/**
	 * The time the current user last joined the thread.
	 */
	join_timestamp: string;

	/**
	 * Any user-thread settings, currently only used for notifications.
	 */
	flags: number;
}

export interface PartialEmbed {
	/**
	 * Title of embed.
	 */
	title?: string;

	/**
	 * Description of embed.
	 */
	description?: string;

	/**
	 * URL of embed.
	 */
	url?: string;

	/**
	 * Timestamp of the embed content.
	 */
	timestamp?: string;

	/**
	 * Color code of the embed.
	 */
	color?: number;

	/**
	 * Footer information.
	 */
	footer?: EmbedFooter;

	/**
	 * Image information.
	 */
	image?: Pick<EmbedImage, 'url'>;

	/**
	 * Thumbnail information.
	 */
	thumbnail?: Pick<EmbedThumbnail, 'url'>;

	/**
	 * Author information.
	 */
	author?: EmbedAuthor;

	/**
	 * Fields information.
	 */
	fields?: Partial<Tuple<EmbedField, 25>>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure|Channel}
 */
export interface Embed extends Omit<PartialEmbed, 'image' | 'thumbnail'> {
	/**
	 * Type of embed (always `'rich'` for webhook embeds).
	 */
	type?: EmbedType;

	/**
	 * Image information.
	 */
	image?: EmbedImage;

	/**
	 * Thumbnail information.
	 */
	thumbnail?: EmbedThumbnail;

	/**
	 * Video information.
	 */
	video?: EmbedVideo;

	/**
	 * Prodvider information.
	 */
	provider?: EmbedProvider;
}

/**
 * Embed types are "loosely defined" and, for the most part, are not used by
 * the clients for rendering. Embed attributes power what is rendered.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-types|Channel}
 */
export enum EmbedType {
	/**
	 * Generic embed rendered from embed attributes.
	 */
	Rich = 'rich',

	/**
	 * Image embed.
	 */
	Image = 'image',

	/**
	 * Video embed.
	 */
	Video = 'video',

	/**
	 * Animated GIF image embed rendered as a video embed.
	 */
	GIFV = 'gifv',

	/**
	 * Article embed.
	 */
	Article = 'article',

	/**
	 * Link embed.
	 */
	Link = 'link'
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure|Channel}
 */
export interface EmbedThumbnail {
	/**
	 * Source URL of thumbnail or image (only supports http[s] and attachments),
	 * or video.
	 */
	url: string;

	/**
	 * A proxied URL of the thumbnail, image, or video.
	 */
	proxy_url?: string;

	/**
	 * Height of thumbnail, image, or video.
	 */
	height?: number;

	/**
	 * Width of thumbnail, image, or video.
	 */
	width?: number;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure|Channel}
 */
export type EmbedVideo = EmbedThumbnail;

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure|Channel}
 */
export type EmbedImage = EmbedThumbnail;

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure|Channel}
 */
export interface EmbedProvider {
	/**
	 * Name of provider or author.
	 */
	name?: string;

	/**
	 * URL of provider or author.
	 */
	url?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure|Channel}
 */
export interface EmbedAuthor extends Omit<EmbedFooter, 'text'>, Pick<EmbedProvider, 'url'> {
	/**
	 * Name of provider or author.
	 */
	name: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure|Channel}
 */
export interface EmbedFooter {
	/**
	 * Footer text.
	 */
	text: string;

	/**
	 * URL of footer or author icon (only supports http[s] and attachments).
	 */
	icon_url?: string;

	/**
	 * A proxied URL of footer or author icon.
	 */
	proxy_icon_url?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure|Channel}
 */
export interface EmbedField {
	/**
	 * Name of the field.
	 */
	name: string;

	/**
	 * Value of the field.
	 */
	value: string;

	/**
	 * Whether or not this field should display inline.
	 */
	inline?: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure|Channel}
 */
export interface Attachment {
	/**
	 * Attachment ID.
	 */
	id: snowflake;

	/**
	 * Name of file attached.
	 */
	filename: string;

	/**
	 * The attachment's media type.
	 */
	content_type?: string;

	/**
	 * Size of file in bytes.
	 */
	size: number;

	/**
	 * Source URL of file.
	 */
	url: string;

	/**
	 * A proxied URL of file.
	 */
	proxy_url: string;

	/**
	 * Height of file (if image).
	 */
	height?: Nullable<number>;

	/**
	 * Width of file (if image).
	 */
	width?: Nullable<number>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-mention-object-channel-mention-structure|Channel}
 */
export interface ChannelMention {
	/**
	 * ID of the channel.
	 */
	id: snowflake;

	/**
	 * ID of the guild containing the channel.
	 */
	guild_id: snowflake;

	/**
	 * The type of channel.
	 */
	type: ChannelType;

	/**
	 * The name of the channel.
	 */
	name: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types|Channel}
 */
export enum AllowedMentionsType {
	/**
	 * Controls role mentions.
	 */
	RoleMentions = 'roles',

	/**
	 * Controls user mentions.
	 */
	UserMentions = 'users',

	/**
	 * Controls `@everyone` and `@here` mentions.
	 */
	EveryoneMentions = 'everyone'
}

/**
 * The allowed mention field allows for more granular control over mentions
 * without various hacks to the message content. This will always validate
 * against message content to avoid phantom pings and check against user/bot
 * permissions.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure|Channel}
 */
export interface AllowedMentions {
	/**
	 * An array of allowed mention types to parse from the content.
	 */
	parse?: AllowedMentionsType[];

	/**
	 * Array of `role_id`s to mention (max size of `100`).
	 */
	roles?: Partial<Tuple<snowflake, 100>>;

	/**
	 * Array of `user_id`s to mention (max size of `100`).
	 */
	users?: Partial<Tuple<snowflake, 100>>;

	/**
	 * For replies, whether to mention the author of the message being replied
	 * to.
	 *
	 * @defaultValue `false`
	 */
	replied_user?: boolean;
}

/**
 * To facilitate showing rich content, rich embeds do not follow the traditional
 * limits of message content. However, some limits are still in place to prevent
 * excessively large embeds.
 *
 * All of the limits are measured inclusively. Leading and trailing whitespace
 * characters are not included (they are trimmed automatically).
 *
 * Additionally, the characters in all `title`, `description`, `field.name`,
 * `field.value`, `footer.text`, and `author.name` fields must not exceed `6000`
 * characters in total. Violating any of these constraints will result in a
 * `Bad Request` response.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-limits-limits|Channel}
 */
export enum EmbedLimit {
	/**
	 * `256` characters.
	 */
	Title = 256,

	/**
	 * `4096` characters.
	 */
	Description = 4096,

	/**
	 * Up to `25` field objects.
	 */
	Fields = 25,

	/**
	 * `256` characters.
	 */
	FieldName = 256,

	/**
	 * `1024` characters
	 */
	FieldValue = 1024,

	/**
	 * `2048` characters.
	 */
	Footer = 2048,

	/**
	 * `256` characters.
	 */
	Author = 256
}
