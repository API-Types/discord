import type { Nullable } from 'extended-utility-types';
import type { GuildSticker, StandardSticker, Sticker, StickerPack } from '../';

/**
 * Returns a sticker object for the given sticker ID.
 *
 * @endpoint GET `/stickers/{sticker.id}`
 */
export interface GetSticker {
	response: StandardSticker;
}

/**
 * Returns the list of sticker packs available to Nitro subscribers.
 *
 * @endpoint GET `/sticker-packs`
 */
export interface ListNitroStickerPacks {
	response: {
		sticker_packs: StickerPack[];
	};
}

/**
 * Returns an array of sticker objects for the givne guild. Includes the user `fields` if the bot
 * has the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @endpoint GET `/guilds/{guild.id}/stickers`
 */
export interface ListGuildStickers {
	response: GuildSticker[];
}

/**
 * Returns a sticker object for the given guild and sticker IDs. Includes the `user` field if the
 * bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @endpoint GET `/guilds/{guild.id}/stickers/{sticker.id}`
 */
export interface GetGuildSticker {
	response: GuildSticker;
}

/**
 * Create a new sticker for the guild. Returns the new sticker object on success.
 *
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * Send a `multipart/form-data` body.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint POST `/guilds/{guild.id}/stickers`
 */
export interface CreateGuildSticker {
	body: {
		/**
		 * Name of the sticker (`2-30` characters).
		 */
		name: string;

		/**
		 * Description of the sticker (empty or `2-100` characters).
		 */
		description: string;

		/**
		 * The discord name of a unicode emoji representing the sticker's expression (`2-100`
		 * characters).
		 */
		tags: string;

		/**
		 * The sticker file to upload; must be a `PNG`, `APNG`, or Lottie `JSON` file (max
		 * `500 kb`).
		 */
		file: unknown;
	};

	response: Sticker;
}

/**
 * Modify the given sticker. Returnes the updated sticker object on success.
 *
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint PATCH `/guilds/{guild.id}/stickers/{sticker.id}`
 */
export interface ModifyGuildSticker {
	body: Partial<
		Pick<CreateGuildSticker['body'], 'name' | 'tags'> & Nullable<Pick<CreateGuildSticker['body'], 'description'>>
	>;

	response: Sticker;
}

/**
 * Delete the given sticker. Returns `204 No Content` on success.
 *
 * Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint DELETE `/guilds/{guild.id}/stickers/{sticker.id}`
 */
export interface DeleteGuildSticker {
	response: never;
}
