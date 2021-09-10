import type { Nullable, Tuple } from 'extended-utility-types';
import type {
	ActionRow,
	AllowedMentions,
	Attachment,
	IncomingWebhook,
	Message,
	PartialEmbed,
	snowflake,
	Webhook
} from '../../';

/**
 * Create a new webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns a
 * webhook object on success.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/webhook#create-webhook) `/channels/{channel.id}/webhooks`
 */
export interface CreateWebhook {
	body: {
		/**
		 * Name of the webhook (`1-80` characters). Cannot be `clyde`.
		 */
		name: string;

		/**
		 * Image for the default webhook avatar.
		 */
		avatar?: Nullable<string>;
	};

	response: IncomingWebhook;
}

/**
 * Returns a list of channel webhook objects. Requires the `MANAGE_WEBHOOKS`
 * permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-channel-webhooks) `/channels/{channel.id}/webhooks`
 */
export interface GetChannelWebhooks {
	response: Webhook[];
}

/**
 * Returns a list of guild webhook objects. Requires the `MANAGE_WEBHOOKS`
 * permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-guild-webhooks) `/guilds/{guild.id}/webhooks`
 */
export interface GetGuildWebhooks {
	response: Webhook[];
}

/**
 * Returns the new webhook object for the given ID.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-webhook) `/webhooks/{webhook.id}`
 */
export interface GetWebhook {
	response: Webhook;
}

/**
 * Same as {@link GetWebhook}, except this call does not require authentication
 * and returns no user in the webhook object.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-webhook-with-token) `/webhooks/{webhook.id}/{webhook.token}`
 */
export interface GetWebookWithToken {
	response: Omit<Webhook, 'user'>;
}

/**
 * Modify a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the
 * updated webhook object on success.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/webhook#modify-webhook) `/webhooks/{webhook.id}`
 */
export interface ModifyWebhook {
	body: {
		/**
		 * The default name of the webhook.
		 */
		name?: string;

		/**
		 * Image for the default webhook avatar.
		 */
		avatar?: Nullable<string>;

		/**
		 * The new channel ID this webhook should be moved to.
		 */
		channel_id?: Nullable<snowflake>;
	};

	response: Webhook;
}

/**
 * Same as {@link ModifyWebhook}, except this call does not require
 * authentication, does not accept a `channel_id` parameter in the body, and
 * does not return a user in the webhook object.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token) `/webhooks/{webhook.id}/{webhook.token}`
 */
export interface ModifyWebhookWithToken {
	body: Omit<ModifyWebhook['body'], 'channel_id'>;
	response: GetWebookWithToken['response'];
}

/**
 * Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission.
 * Returns a `204 No Content` response on success.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/webhook#delete-webhook) `/webhooks/{webhook.id}`
 */
export interface DeleteWebhook {
	response: never;
}

/**
 * Same as {@link DeleteWebhook}, except this call does not require
 * authentication.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token) `/webhooks/{webhook.id}/{webhook.token}`
 */
export interface DeleteWebhookWithToken {
	response: never;
}

/**
 * @remarks
 * - Note that when executing a webhook, a value for **at least one** of
 * `content`, `embeds`, or `file` must be provided.
 * - For a `file` attachment, the `Content-Disposition` subpart header MUST
 * contain a `filename` parameter.
 * - This endpoint supports both `application/json` and `multipart/form-data`
 * bodies. When uploading files, the `multipart/form-data` content type must be
 * used. Note that in multipart form data, the `embeds` and `allowed_mentions`
 * fields cannot be used. A stringified JSON body as a form value as
 * `payload_json` can be passed instead. **If a form value for `payload_json` is
 * supplied, all fields except for `file` fields will be ignored in the form
 * data**.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/webhook#execute-webhook) `/webhooks/{webhook.id}/{webhook.token}`
 */
export interface ExecuteWebhook {
	query: {
		/**
		 * Waits for server confirmation of message send before response and
		 * returns the created message body (when `false`, a message that is not
		 * saved does not return an error).
		 *
		 * @defaultValue `false`
		 */
		wait?: boolean;

		/**
		 * Send a message to the specified thread within a webhook's channel.
		 * The thread will automatically be unarchived.
		 */
		thread_id?: snowflake;
	};

	body: {
		/**
		 * The message contents (up to `2000` characters).
		 */
		content?: string;

		/**
		 * Override the default username of the webhook.
		 */
		username?: string;

		/**
		 * Override the default avatar of the webhook.
		 */
		avatar_url?: string;

		/**
		 * `true` if this is a TTS message.
		 *
		 * @defaultValue `false`
		 */
		tts?: boolean;

		/**
		 * The contents of the file being sent.
		 */
		file?: unknown;

		/**
		 * Embedded `rich` content.
		 */
		embeds?: Partial<Tuple<PartialEmbed, 10>>;

		/**
		 * JSON encoded body of non-file params (`multipart/form-data` only).
		 */
		payload_json?: Nullable<string>;

		/**
		 * Allowed mentions for the message.
		 */
		allowed_mentions?: AllowedMentions;

		/**
		 * The components to include with the message.
		 *
		 * @remarks
		 * Requires an application-owned webhook.
		 */
		components?: Partial<Tuple<ActionRow, 5>>;
	};

	response: Message;
}

/**
 * Returns a previously-sent webhook message from the same token. Returns a
 * message object on success.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-webhook-message) `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
 */
export interface GetWebhookMessage {
	response: Message;
}

/**
 * Edits a previously-sent webhook message from the same token. Returns a
 * message object on success.
 *
 * When the `content` field is edited, the `mentions` array in the message
 * object will be reconstructed from scratch based on the new content. The
 * `allowed_mentions` field of the edit request controls how this happens. If
 * there is no explicit `allowed_mentions` in the edit request, the content will
 * be parsed with *default* allowances, that is, without regard to whether or
 * not an `allowed_mentions` was present in the request that originally created
 * the message.
 *
 * @remarks
 * - For a `file` attachment, the `Content-Disposition` subpart header MUST
 * contain a `filename` parameter.
 * - This endpoint supports both `application/json` and `multipart/form-data`
 * bodies. When uploading files, the `multipart/form-data` content type must be
 * used. Note that in multipart form data, the `embeds` and `allowed_mentions`
 * fields cannot be used. A stringified JSON body as a form value as
 * `payload_json` can be passed instead. **If a form value for `payload_json` is
 * supplied, all fields except for `file` fields will be ignored in the form
 * data**.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/webhook#edit-webhook-message) `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
 */
export interface EditWebhookMessage {
	body: {
		/**
		 * The message contents (up to `2000` characters).
		 */
		content?: Nullable<string>;

		/**
		 * Embedded `rich` content.
		 */
		embeds?: Nullable<ExecuteWebhook['body']['embeds']>;

		/**
		 * The contents of the file being sent/edited.
		 */
		file?: Nullable<unknown>;

		/**
		 * JSON encoded body of non-file params (`multipart/form-data` only).
		 */
		payload_json?: Nullable<string>;

		/**
		 * Allowed mentions for the message.
		 */
		allowed_mentions?: Nullable<AllowedMentions>;

		/**
		 * Attached files to keep.
		 */
		attachments?: Nullable<Attachment[]>;

		/**
		 * The components to include with the message.
		 *
		 * @remarks
		 * Requires an application-owned webhook.
		 */
		components?: Nullable<ExecuteWebhook['body']['components']>;
	};

	response: Message;
}

/**
 * Deletes a message that was created by the webhook. Returns a `204 No Content`
 * response on success.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/webhook#delete-webhook-message) `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
 */
export interface DeleteWebhookMessage {
	response: never;
}
