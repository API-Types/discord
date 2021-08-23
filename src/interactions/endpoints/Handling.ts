import type { InteractionResponse } from '../';
import type { EditWebhookMessage, ExecuteWebhook, GetWebhookMessage, InteractionCallbackDataFlags } from '../../';

/**
 * Create a response to an Interaction from the gateway. Takes an interaction
 * response.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response) `/interactions/{interaction.id}/{interaction.token}/callback`
 */
export interface CreateInteractionResponse {
	body: InteractionResponse;
}

/**
 * Returns the initial Interaction response. Functions the same as Get Webhook
 * Message.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response) `/webhooks/{application.id}/{interaction.token}/messages/@original`
 */
export type GetOriginalInteractionResponse = GetWebhookMessage;

/**
 * Edits the initial Interaction response. Functions the same as Edit Webhook
 * Message.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response) `/webhooks/{application.id}/{interaction.token}/messages/@original`
 */
export type EditOriginalInteractionResponse = EditWebhookMessage;

/**
 * Deletes the initial Interaction response. Returns `204` on success.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response) `/webhooks/{application.id}/{interaction.token}/messages/@original`
 */
export interface DeleteOriginalInteractionResponse {
	response: never;
}

/**
 * Create a followup message for an Interaction. Functions the same as Execute
 * Webhook, but `wait` is always `true`, and `flags` can be set to `64` in the
 * body to send an ephemeral message. The `thread_id` query parameter is not
 * required (and is furthermore ignored) when using this endpoint for
 * interaction followups.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message) `/webhooks/{application.id}/{interaction.token}`
 */
export interface CreateFollowupMessage {
	body: ExecuteWebhook['body'] & {
		flags: InteractionCallbackDataFlags;
	};
}

/**
 * Returns a followup message for an Interaction. Functions the same as Get
 * Webhook Message. Does not support ephemeral followups.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message) `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
 */
export type GetFollowupMessage = GetWebhookMessage;

/**
 * Edits a followup message for an Interaction. Functions the same as Edit
 * Webhook Message. Does not support ephemeral followups.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message) `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
 */
export type EditFollowupMessage = EditWebhookMessage;

/**
 * Deletes a followup message for an Interaction. Returns 204 on success. Does
 * not support ephemeral followups.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message) `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
 */
export interface DeleteFollowupMessage {
	response: never;
}
