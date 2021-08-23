import type { Nullable } from 'extended-utility-types';
import type { PrivacyLevel, StageInstance } from '../../';

/**
 * Creates a new Stage instance associated to a Stage channel.
 *
 * Requires the user to be a moderator of the Stage channel.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/stage-instance#create-stage-instance) `/stage-instances`
 */
export interface CreateStageInstance {
	body: Pick<StageInstance, 'channel_id' | 'topic'> & {
		/**
		 * The privacy level of the Stage instance.
		 *
		 * @defaultValue `GUILD_ONLY`
		 */
		privacy_level?: PrivacyLevel;
	};

	response: StageInstance & {
		guild_scheduled_event_id: Nullable<string>;
		invite_code: Nullable<string>;
	};
}

/**
 * Gets the stage instance associated with the Stage channel, if it exists.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/stage-instance#get-stage-instance) `/stage-instances/{channel.id}`
 */
export interface GetStageInstance {
	response: StageInstance;
}

/**
 * Updates fields of an existing Stage instance.
 *
 * Requires the user to be a moderator of the Stage channel.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/stage-instance#update-stage-instance) `/stage-instances/{channel.id}`
 */
export interface ModifyStageInstance {
	body: Partial<Pick<StageInstance, 'topic' | 'privacy_level'>>;
	response: CreateStageInstance['response'];
}

/**
 * Deletes the Stage instance.
 *
 * Requires the user to be a moderator of the Stage channel.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance) `/stage-instances/{channel.id}`
 */
export interface DeleteStageInstance {
	response: never;
}
