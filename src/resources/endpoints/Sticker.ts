import type { Nullable } from 'extended-utility-types';
import type { GuildSticker, StandardSticker, Sticker, StickerPack } from '../';

/**
 * Returns a sticker object for the given sticker ID.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/sticker#get-sticker) `/stickers/{sticker.id}`
 */
export interface GetSticker {
	response: StandardSticker;
}

/**
 * Returns the list of sticker packs available to Nitro subscribers.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs) `/sticker-packs`
 */
export interface ListNitroStickerPacks {
	response: {
		sticker_packs: StickerPack[];
	};
}

/**
 * Returns an array of sticker objects for the givne guild. Includes `user`
 * fields if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/sticker#list-guild-stickers) `/guilds/{guild.id}/stickers`
 */
export interface ListGuildStickers {
	response: GuildSticker[];
}

/**
 * Returns a sticker object for the given guild and sticker IDs. Includes the
 * `user` field if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/sticker#get-guild-sticker) `/guilds/{guild.id}/stickers/{sticker.id}`
 */
export interface GetGuildSticker {
	response: GuildSticker;
}

/**
 * Create a new sticker for the guild. Send a `multipart/form-data` body.
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission. Returns the new sticker
 * object on success.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/sticker#create-guild-sticker) `/guilds/{guild.id}/stickers`
 */
export interface CreateGuildSticker {
	body: {
		/**
		 * Name of the sticker (`2-30` characters).
		 */
		name: string;

		/**
		 * Description of the sticker (`2-100` characters).
		 */
		description: string;

		/**
		 * The discord name of a unicode emoji representing the sticker's
		 * expression (`2-200` characters).
		 */
		tags: string;

		/**
		 * The sticker file to upload. Must be a `PNG`, `APNG`, or Lottie `JSON`
		 * file (max `500 KB`).
		 */
		file: unknown;
	};

	response: Sticker;
}

/**
 * Modify the given sticker. Requires the `MANAGE_EMOJIS_AND_STICKERS`
 * permission. Returnes the updated sticker object on success.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/sticker#modify-guild-sticker) `/guilds/{guild.id}/stickers/{sticker.id}`
 */
export interface ModifyGuildSticker {
	body: Partial<Pick<CreateGuildSticker['body'], 'name' | 'tags'>> & {
		/**
		 * Description of the sticker (`2-100` characters).
		 */
		description?: Nullable<string>;
	};

	response: Sticker;
}

/**
 * Delete the given sticker. Requires the `MANAGE_EMOJIS_AND_STICKERS`
 * permission. Returns `204 No Content` on success.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/sticker#delete-guild-sticker) `/guilds/{guild.id}/stickers/{sticker.id}`
 */
export interface DeleteGuildSticker {
	response: never;
}
