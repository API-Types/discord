import type { Nullable, Range, Tuple } from 'extended-utility-types';
import type {
	ActionRow,
	GuildMember,
	MessageInteraction,
	PartialApplication,
	PartialEmoji,
	Snowflake,
	StickerItem,
	User
} from '../';
import type { BaseChannel, GuildIdentifiable, Identifiable, PartialTuple, WithType } from '../__internal__';

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-application-command-interaction-data-resolved-structure|Slash Commands}
 */
export interface PartialChannel extends Identifiable, WithType<ChannelType> {
	/**
	 * The name of the channel (`1-100` characters).
	 */
	name: string;
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
	| ChannelCategory
	| NewsChannel
	| StoreChannel
	| ThreadChannel
	| StageChannel;

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
	 * A temporary sub-channel within a `GUILD_TEXT` channel that is only viewable by those invited
	 * and those with the `MANAGE_MESSAGES` permission.
	 */
	GuildPrivateThread,

	/**
	 * A voice channel for hosting events with an audience.
	 */
	GuildStageVoice
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
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-|Channel}
 */
export interface TextChannel extends BaseChannel, WithType<ChannelType.GuildText> {
	/**
	 * The channel topic (`0-1024` characters).
	 */
	topic: string;

	/**
	 * The ID of the last message sent in this channel (may not point to an existing or valid
	 * message).
	 */
	last_message_id: Snowflake;

	/**
	 * Amount of seconds a user has to wait before sending another message (`0-21600`); bots, as
	 * well as users with the permission `manage_messages` or `manage_channel`, are unaffected.
	 *
	 * This also applies to thread creation. Users can send one message and create one thread
	 * during each `rate_limit_per_user` interval.
	 */
	rate_limit_per_user: number;

	/**
	 * Default duration for newly created threads, in minutes, to automatically archive the thread
	 * after recent activity.
	 */
	default_auto_archive_duration: AutoArchiveDuration;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-dm-channel|Channel}
 */
export interface DMChannel
	extends Identifiable,
		WithType<ChannelType.DM>,
		Pick<TextChannel, 'last_message_id' | 'last_pin_timestamp'> {
	/**
	 * The recipient of the DM.
	 */
	recipients: [User];
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-voice-channel|Channel}
 */
export interface VoiceChannel extends WithType<ChannelType.GuildVoice>, Omit<BaseChannel, 'last_pin_timestamp'> {
	bitrate: number;
	user_limit: number;

	/**
	 * Voice region ID for the voice channel, automatic when set to `null`.
	 */
	rtc_region: Nullable<string>;

	/**
	 * The camera video quality mode of the voice channel, `1` when not present.
	 */
	video_quality_mode?: VideoQualityMode;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-group-dm-channel|Channel}
 */
export interface GroupDMChannel extends Omit<DMChannel, 'recipients'>, Pick<BaseChannel, 'name'> {
	/**
	 * The recipients of the DM.
	 */
	recipients: PartialTuple<User, 8, 2>;

	/**
	 * Icon hash.
	 */
	icon: Nullable<string>;

	/**
	 * ID of the creator of the group DM.
	 */
	owner_id: Snowflake;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-channel-category|Channel}
 */
export type ChannelCategory = WithType<ChannelType.GuildCategory> &
	Omit<BaseChannel, 'last_pin_timestamp'> &
	Nullable<Pick<BaseChannel, 'parent_id'>>;

/**
 * Bots can post or publish messages in this type of channel if they have the proper permissions.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-news-channel|Channel}
 */
export type NewsChannel = WithType<ChannelType.GuildNews> & Omit<Text, 'type' | 'rate_limit_per_user'>;

/**
 * Bots can neither send or read messages from this channel type (as it is a store page).
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-store-channel|Channel}
 */
export type StoreChannel = WithType<ChannelType.GuildStore> & Omit<NewsChannel, 'type'>;

/**
 * Threads can be either `archived` or `active`. Archived threads are generally immutable. To send a
 * message or add a reaction, a thread must first be unarchived. The API will helpfully
 * automatically unarchive a thread when sending a message in that thread.
 *
 * Unlike with channels, the API will only sync updates to users about threads the current user can
 * view. When receiving a guild create payload, the API will only include active threads the current
 * user can view. Threads inside of private channels are completely private to the members of that
 * private channel. As such, when *gaining* access to a channel the API sends a thread list sync,
 * which includes all active threads in that channel.
 *
 * Threads also track membership. Users must be added to a thread before sending messages in them.
 * The API will helpfully automatically add users to a thread when sending a message in that thread.
 *
 * Guilds have limits on the number of active threads and members per thread. Once these are
 * reached additional threads cannot be created or unarchived, and users cannot be added.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel|Channel}
 */
export interface ThreadChannel
	extends WithType<ChannelType.GuildNewsThread | ChannelType.GuildPublicThread | ChannelType.GuildPrivateThread>,
		Pick<
			TextChannel,
			'id' | 'guild_id' | 'name' | 'last_message_id' | 'rate_limit_per_user' | 'last_pin_timestamp'
		> {
	/**
	 * ID of the creator of the thread.
	 */
	owner_id: Snowflake;

	/**
	 * ID of the text channel this thread was created in.
	 */
	parent_id: Snowflake;

	/**
	 * An approximate count of messages in a thread.
	 */
	message_count: Range<0, 50>;

	/**
	 * An approximate count of users in a thread.
	 */
	member_count: Range<0, 50>;

	/**
	 * Thread-specific fields not needed by other channels.
	 */
	thread_metadata: ThreadMetadata;

	/**
	 * Thread member object for the current user, if they have joined the thread, only included
	 * on certain API endpoints.
	 */
	member?: ThreadMember;
}

export type StageChannel = WithType<ChannelType.GuildStageVoice> & Omit<VoiceChannel, 'type' | 'video_quality_mode'>;

/**
 * Represents a message sent in a channel within Discord.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-structure|Channel}
 */
export interface Message extends Identifiable, WithType<MessageType>, Partial<GuildIdentifiable> {
	/**
	 * ID of the channel the message was sent in.
	 */
	channel_id: Snowflake;

	/**
	 * The author of this message (not guaranteed to be a valid user).
	 *
	 * @remarks
	 * The author object follows the structure of the user object, but is only a valid user in the
	 * case where the message is generated by a user or bot user. If the message is generated by a
	 * webhook, the author object corresponds to the webhook's ID, username, and avatar. You can
	 * tell if a message is generated by a webhook by checking for the `webhook_id` on the message
	 * object.
	 */
	author: User;

	/**
	 * Member properties for this message's author.
	 *
	 * @remarks
	 * The member object exists in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from
	 * text-based guild channels, provided that the author off the message is not a webhook.
	 * This allows bots to obtain real-time member data without requiring bots to store member
	 * state in memory.
	 */
	member?: GuildMember;
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
	 * The user objects in the mentions array will only have the partial `member` field present in
	 * `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from text-based guild channels.
	 */
	mentions: UserMention[];

	/**
	 * Roles specifically mentioned in this message.
	 */
	mention_roles: Snowflake[];

	/**
	 * Channels specifically mentioned in this message.
	 *
	 * @remarks
	 * Not all channel mentions will appear in `mention_channels`. Only textual channels that are
	 * visible to everyone in a lurkable guild will ever be included. Only crossposted messages
	 * (via Channel Following) current include `mention_channels`. If no mentions in the message
	 * meet these requirements, this field will not be sent.
	 */
	mention_channels?: ChannelMention[];
	attachments: Attachment[];
	embeds: Partial<Tuple<Embed, 10>>;
	reactions?: Partial<Tuple<Reaction, 20>>;

	/**
	 * Used for validating a message was sent.
	 */
	nonce?: number | string;
	pinned: boolean;

	/**
	 * If the message is generated by a webhook, this is the webhook's ID.
	 */
	webhook_id?: Snowflake;

	/**
	 * Sent with Rich Presence-related chat embeds.
	 */
	activity?: MessageActivity;

	/**
	 * Sent with Rich Presence-related chat embeds.
	 */
	application?: PartialApplication;

	/**
	 * If the message is a response to an Interaction, this is the ID of the interaction's
	 * application.
	 */
	application_id?: Snowflake;

	/**
	 * Data showing the source of a crosspost, channel follow add, pin, or reply message.
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
	 * This field is only returned for messages with a `type` of `19` (`REPLY`) or `21`
	 * (`THREAD_STARTER_MESSAGE`). If the message is a reply but the `referenced_message` field is
	 * not present, the backend did not attempt to fetch the message that was being replied to, so
	 * its state is unknown. If the field exists but is `null`, the referenced message was deleted.
	 */
	referenced_message?: Nullable<Message>;

	/**
	 * Sent if the message is a response to an Interaction.
	 */
	interaction?: MessageInteraction;

	/**
	 * The thread that was started from this message, includes thread member object.
	 */
	thread?: ThreadChannel & Required<Pick<ThreadChannel, 'member'>>;

	/**
	 * Sent if the message contains components.
	 */
	components?: PartialTuple<ActionRow, 4>;

	/**
	 * Sent if the message contains stickers.
	 */
	sticker_items?: StickerItem[];
}

export interface UserMention extends User {
	member?: Partial<Omit<GuildMember, 'user'>>;
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
	ApplicationCommand,
	ThreadStarterMessage,
	GuildInviteReminder
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure|Channel}
 */
export interface MessageActivity extends WithType<MessageActivityType> {
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
	 * This message has been published to subscribed channels (via Channel Following).
	 */
	Crossposted = 1 << 0,

	/**
	 * This message originated from a message in another channel (via Channel Following).
	 */
	IsCrosspost = 1 << 1,

	/**
	 * Do not include any embeds when serializing this message.
	 */
	SuppressEmbeds = 1 << 2,

	/**
	 * The source message for this crosspost has been deleted (via Channel Following).
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
export interface MessageReference extends Partial<GuildIdentifiable> {
	/**
	 * ID of the originating message.
	 */
	message_id?: Snowflake;

	/**
	 * ID of the originating message's channel.
	 *
	 * @remarks
	 * `channel_id` is optional when creating a reply, but will always be present when receiving an
	 * event/response that includes this data model.
	 */
	channel_id?: Snowflake;

	/**
	 * When sending, whether to error if the referenced message doesn't exist instead of sending as
	 * a normal (non-reply) message.
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
	channel_id: Snowflake;

	/**
	 * Created target webhook ID.
	 */
	webhook_id: Snowflake;
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
	emoji: PartialEmoji;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure|Channel}
 */
export interface Overwrite {
	/**
	 * Role or user ID.
	 */
	id: Snowflake;

	/**
	 * Either `0` (role) or `1` (member).
	 */
	type: 0 | 1;

	/**
	 * Permission bit set.
	 */
	allow: string;

	/**
	 * Permission bit set.
	 */
	deny: string;
}

/**
 * The thread metadata object contains a number of thread-specific channel fields that are not
 * needed by other channel types.
 */
export interface ThreadMetadata {
	/**
	 * Whether the thread is archived.
	 */
	archived: boolean;

	/**
	 * Duration in minutes to automatically archive the thread after recent activity.
	 */
	auto_archive_duration: AutoArchiveDuration;

	/**
	 * Timestamp when the thread's archive status was last changed, used for calculating recent
	 * activity.
	 */
	archive_timestamp: string;

	/**
	 * When a thread is locked, only users with `MANAGE_THREADS` can unarchive it.
	 */
	locked?: boolean;
}

export type AutoArchiveDuration = 60 | 1440 | 4320 | 10080;

/**
 * A thread member is used to indicate whether a user has joined a thread or not.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#thread-member-object-thread-member-structure|Channel}
 */
export interface ThreadMember {
	/**
	 * @remarks
	 * This field is omitted on the member sent within each thread in the `GUILD_CREATE` event.
	 */
	readonly id: Snowflake;

	/**
	 * @remarks
	 * This field is omitted on the member sent within each thread in the `GUILD_CREATE` event.
	 */
	user_id: Snowflake;

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
	title?: string;
	description?: string;
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
	fields?: PartialTuple<EmbedField, 24>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure|Channel}
 */
export interface Embed extends Omit<PartialEmbed, 'image' | 'thumbnail'> {
	/**
	 * Type of embed (always `rich` for webhook embeds).
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
 * Embed types are "loosely defined" and, for the most part, are not used by the clients for
 * rendering. Embed attributes power what is rendered.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-types|Channel}
 */
export enum EmbedType {
	/**
	 * Generic embed rendered from embed attributes.
	 */
	Rich = 'rich',
	Image = 'image',
	Video = 'video',

	/**
	 * Animated GIF image embed rendered as a video embed.
	 */
	GIFV = 'gifv',
	Article = 'article',
	Link = 'link'
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure|Channel}
 */
export interface EmbedThumbnail {
	/**
	 * Source URL of thumbnail or image (only supports http[s] and attachments), or video.
	 */
	url?: string;

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
export type EmbedAuthor = Omit<EmbedFooter, 'text'> & EmbedProvider;

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
export interface Attachment extends Identifiable {
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
export type ChannelMention = Identifiable & GuildIdentifiable & WithType<ChannelType> & Pick<PartialChannel, 'name'>;

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types|Channel}
 */
export type AllowedMentionsType = 'roles' | 'users' | 'everyone';

/**
 * The allowed mention field allows for more granular control over mentions without various hacks
 * to the message content. This will always validate against message content to avoid phantom pings,
 * and check against user/bot permissions.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure|Channel}
 */
export interface AllowedMentions {
	/**
	 * An array of allowed mention types to parse from the content.
	 */
	parse: AllowedMentionsType[];

	/**
	 * Array of `role_id`s to mention.
	 */
	roles?: PartialTuple<Snowflake, 99>;

	/**
	 * Array of `user_id`s to mention.
	 */
	users?: PartialTuple<Snowflake, 99>;

	/**
	 * For replies, whether to mention the author of the message being replied to.
	 *
	 * @defaultValue `false`
	 */
	replied_user?: boolean;
}

/**
 * To facilitate showing rich content, rich embeds do not follow the traditional limits of message
 * content. However, some limits are still in place to prevent excessively large embeds.
 *
 * All of the limits are measured inclusively. Leading and trailing whitespace characters are not
 * included (they are trimmed automatically).
 *
 * Additionally, the characters in all `title`, `description`, `field.name`, `field.value`,
 * `footer.text`, and `author.name` fields must not exceed `6000` characters in total. Violating
 * any of these constraints will result in a `Bad Request` response.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-limits-limits|Channel}
 */
export enum EmbedLimit {
	Title = 256,
	Description = 4096,
	Fields = 25,
	FieldName = 256,
	FieldValue = 1024,
	Footer = 2048,
	Author = 256
}
