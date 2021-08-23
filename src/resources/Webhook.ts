import type { Nullable } from 'extended-utility-types';
import type { Guild, PartialChannel, snowflake, User } from '../';

/**
 * Represents a low-effort way to post messages to channels. They do not require
 * a bot user or authentication to use.
 *
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure|Webhook}
 */
export type Webhook = IncomingWebhook | ChannelFollowerWebhook | ApplicationWebhook;

export interface BaseWebhook {
	/**
	 * The ID of the webhook.
	 */
	id: snowflake;

	/**
	 * The type of the webhook.
	 */
	type: WebhookType;

	/**
	 * The guild ID this webhook is for, if any.
	 */
	guild_id?: Nullable<snowflake>;

	/**
	 * The channel ID this webhook is for, if any.
	 */
	channel_id: Nullable<snowflake>;

	/**
	 * The user this webhook was created by (not returned when getting a
	 * webhook with its token).
	 */
	user?: User;

	/**
	 * The default name of the webhook.
	 */
	name: Nullable<string>;

	/**
	 * The default user avatar hash of the webhook.
	 */
	avatar: Nullable<string>;

	/**
	 * The secure token of the webhook (returned for {@link IncomingWebhook}s).
	 */
	readonly token?: string;

	/**
	 * The bot/OAuth2 application that created this webhook.
	 */
	application_id: Nullable<snowflake>;

	/**
	 * The guild of the channel that this webhook is following (returned for
	 * {@link ChannelFollowerWebhook}s).
	 */
	source_guild?: SourceGuild;

	/**
	 * The channel that this webhook is following (returned for
	 * {@link ChannelFollowerWebhook}s).
	 */
	source_channel?: SourceChannel;

	/**
	 * The URL used for executing the webhook (returned by the webhooks OAuth2
	 * flow).
	 */
	url?: WebhookURL;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-example-incoming-webhook|Webhook}
 */
export interface IncomingWebhook extends Pick<BaseWebhook, 'id' | 'name' | 'avatar' | 'application_id' | 'url'> {
	/**
	 * `1` for Incoming Webhooks.
	 */
	readonly type: WebhookType.Incoming;

	/**
	 * The guild ID this webhook is for.
	 */
	guild_id: snowflake;

	/**
	 * The channel ID this webhook is for.
	 */
	channel_id: snowflake;

	/**
	 * The user this webhook was created by (not returned when getting a
	 * webhook with its token).
	 */
	user: User;

	/**
	 * The secure token of the webhook.
	 */
	readonly token: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-example-channel-follower-webhook|Webhook}
 */
export interface ChannelFollowerWebhook extends Omit<IncomingWebhook, 'type' | 'token'> {
	/**
	 * `2` for Channel Follower Webhooks.
	 */
	readonly type: WebhookType.ChannelFollower;

	/**
	 * The guild of the channel that this webhook is following.
	 */
	source_guild: SourceGuild;

	/**
	 * The channel that this webhook is following.
	 */
	source_channel: SourceChannel;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-example-application-webhook|Webhook}
 */
export interface ApplicationWebhook
	extends Pick<BaseWebhook, 'id' | 'guild_id' | 'channel_id' | 'name' | 'avatar' | 'application_id'> {
	/**
	 * `3` for Application Webhooks.
	 */
	readonly type: WebhookType.Application;
	readonly user: never;
}

export type SourceGuild = Pick<Guild, 'id' | 'name' | 'icon'>;

export type SourceChannel = Omit<PartialChannel, 'type'>;

export type WebhookURL = `https://discord.com/api/webhooks/${snowflake}/${string}`;

/**
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types|Webhook}
 */
export enum WebhookType {
	/**
	 * Incoming Webhooks can post messages to channels with a generated token.
	 */
	Incoming = 1,

	/**
	 * Channel Follower Webhooks are internal webhooks used with Channel
	 * Following to post new messages into channels.
	 */
	ChannelFollower,

	/**
	 * Application webhooks are webhooks used with Interactions.
	 */
	Application
}
