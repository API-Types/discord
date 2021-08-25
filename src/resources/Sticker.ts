import type { Nullable } from 'extended-utility-types';
import type { snowflake, User } from '../';

/**
 * Represents a sticker that can be sent in messages.
 *
 * @source {@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure|Sticker}
 */
export type Sticker = GuildSticker | StandardSticker;

export interface BaseSticker {
	/**
	 * ID of the sticker.
	 */
	id: snowflake;

	/**
	 * For standard stickers, ID of the pack the sticker is from.
	 */
	pack_id?: snowflake;

	/**
	 * Name of the sticker.
	 */
	name: string;

	/**
	 * Description of the sticker.
	 */
	description: Nullable<string>;

	/**
	 * For guild stickers, the Discord name of a unicode emoji representing the
	 * sticker's expression. For standard stickers, a comma-separated list of
	 * related expressions.
	 */
	tags: string;
	readonly asset: '';

	/**
	 * Type of sticker.
	 */
	type: StickerType;

	/**
	 * Type of sticker format.
	 */
	format_type: StickerFormatType;

	/**
	 * Whether this guild sticker can be used. May be `false` due to loss of
	 * Server Boosts.
	 */
	available?: boolean;

	/**
	 * ID of the guild that owns this sticker.
	 */
	guild_id?: snowflake;

	/**
	 * The user that uploaded the guild sticker.
	 */
	user?: User;

	/**
	 * The standard sticker's sort order within its pack.
	 */
	sort_value?: number;
}

export interface StandardSticker extends Pick<BaseSticker, 'id' | 'name' | 'description' | 'asset' | 'format_type'> {
	/**
	 * `1` for Standard Stickers.
	 */
	readonly type: StickerType.Standard;

	/**
	 * ID of the pack the sticker is from.
	 */
	pack_id: snowflake;

	/**
	 * A comma-separated list of related expressions.
	 */
	tags: string;

	/**
	 * The standard sticker's sort order within its pack.
	 */
	sort_value: number;
}

export interface GuildSticker extends Pick<BaseSticker, 'id' | 'name' | 'description' | 'asset' | 'format_type'> {
	/**
	 * `2` for Guild Stickers.
	 */
	readonly type: StickerType.Guild;

	/**
	 * The Discord name of a unicode emoji representing the sticker's
	 * expression.
	 */
	tags: string;

	/**
	 * Whether this guild sticker can be used. May be `false` due to loss of
	 * Server boosts.
	 */
	available: boolean;

	/**
	 * ID of the guild that owns this sticker.
	 */
	guild_id: snowflake;

	/**
	 * The user that uploaded the guild sticker.
	 */
	user?: User;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types|Sticker}
 */
export enum StickerType {
	/**
	 * An official sticker in a pack, part of Nitro, or in a removed
	 * purchaseable pack.
	 */
	Standard = 1,

	/**
	 * A sticker uploaded to a Boosted guild for the guild's members.
	 */
	Guild
}

/**
 * @source {@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types|Sticker}
 */
export enum StickerFormatType {
	PNG = 1,
	APNG,
	Lottie
}

/**
 * The smallest amount of data required to render a sticker. A partial sticker
 * object.
 *
 * @source {@link https://discord.com/developers/docs/resources/sticker#sticker-item-object-sticker-item-structure|Sticker}
 */
export type StickerItem = Pick<Sticker, 'id' | 'name' | 'format_type'>;

/**
 * Represents a pack of standard stickers.
 *
 * @source {@link https://discord.com/developers/docs/resources/sticker#sticker-pack-object-sticker-pack-structure|Sticker}
 */
export interface StickerPack {
	/**
	 * ID of the sticker pack.
	 */
	id: snowflake;

	/**
	 * The stickers in the pack.
	 */
	stickers: StandardSticker[];

	/**
	 * Name of the sticker pack.
	 */
	name: string;

	/**
	 * ID of the pack's SKU.
	 */
	sku_id: snowflake;

	/**
	 * ID of a sticker in the pack which is shown as the pack's icon.
	 */
	cover_sticker_id?: snowflake;

	/**
	 * Description of the sticker pack.
	 */
	description: string;

	/**
	 * ID of the sticker's pack banner image.
	 */
	banner_asset_id: snowflake;
}
