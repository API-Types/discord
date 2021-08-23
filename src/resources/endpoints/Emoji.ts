import type { Nullable } from 'extended-utility-types';
import type { Emoji, snowflake } from '../../';

/**
 * Returns a list of emoji objects for the given guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/emoji#list-guild-emojis) `/guilds/{guild.id}/emojis`
 */
export interface ListGuildEmojis {
	response: Emoji[];
}

/**
 * Returns an emoji object for the given guild and emoji IDs.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/emoji#get-guild-emojis) `/guilds/{guild.id}/emojis/{emoji.id}`
 */
export interface GetGuildEmoji {
	response: Emoji;
}

/**
 * Create a new emoji for the guild. Requires the `MANAGE_EMOJIS_AND_STICKERS`
 * permission. Returns the new emoji object on success. Fires a Guild Emojis
 * Update Gateway event.
 *
 * @remarks
 * - Emojis and animated emojis have a maximum file size of 256kb. Attempting to
 * upload an emoji larger than this limit will fail and return `400 Bad Request`
 * and an error message, but not a JSON status code.
 * - This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/emoji#create-guild-emoji) `/guilds/{guild.id}/emojis`
 */
export interface CreateGuildEmoji {
	body: {
		/**
		 * Name of the emoji.
		 */
		name: string;

		/**
		 * The `128x128` emoji image.
		 */
		image: string;

		/**
		 * Roles allowed to use this emoji.
		 */
		roles: snowflake[];
	};

	response: Emoji;
}

/**
 * Modify the given emoji. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 * Returns the updated emoji object on success. Fires a Guild Emojis Update
 * Gateway event.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/emoji#modify-guild-emoji) `/guilds/{guild.id}/emojis/{emoji.id}`
 */
export interface ModifyGuildEmoji {
	body: {
		/**
		 * Name of the emoji.
		 */
		name?: string;

		/**
		 * Roles for which this emoji will be whitelisted.
		 */
		roles?: Nullable<snowflake[]>;
	};

	response: Emoji;
}

/**
 * Delete the given emoji. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 * Returns `204 No Content` on success. Fires a Guild Emojis Update Gateway
 * event.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/emoji#delete-guild-emoji) `/guilds/{guild.id}/emojis/{emoji.id}`
 */
export interface DeleteGuildEmoji {
	response: never;
}
