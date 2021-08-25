import type { Nullable, Tuple } from 'extended-utility-types';
import type { snowflake } from '../';

/**
 * Used to represent a guild's Discovery settings.
 *
 * @source {@link https://discord.com/developers/docs/resources/discovery#discovery-metadata-object-discovery-metadata-structure|Discovery}
 */
export interface DiscoveryMetadata {
	/**
	 * The guild ID.
	 */
	guild_id: snowflake;

	/**
	 * The ID of the primary discovery category set for this guild..
	 */
	primary_category_id: number;

	/**
	 * Up to `10` discovery search keywords set for this guild.
	 */
	keywords: Nullable<Partial<Tuple<string, 10>>>;

	/**
	 * Whether guild info is shown when custom emojis from this guild are
	 * clicked.
	 */
	emoji_discoverability_enabled: boolean;

	/**
	 * When the server's partner application was accepted or denied, for
	 * applications via Server Settings.
	 */
	partner_actioned_timestamp: Nullable<string>;

	/**
	 * When the server applied for partnership, if it has a pending application.
	 */
	partner_application_timestamp: Nullable<string>;

	/**
	 * IDs of up to `5` discovery subcategories set for this guild.
	 */
	category_ids: Partial<Tuple<number, 5>>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/discovery#discovery-category-object-discovery-category-structure|Discovery}
 */
export interface DiscoveryCategory {
	/**
	 * Numeric ID of the category.
	 */
	id: number;

	/**
	 * The name of this category, in multiple languages.
	 */
	name: DiscoveryCategoryName;

	/**
	 * Whether this category can be set as a guild's primary category.
	 */
	is_primary: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/discovery#discovery-category-object-discovery-category-name-structure|Discovery}
 */
export interface DiscoveryCategoryName {
	/**
	 * The name in English.
	 */
	default: string;

	/**
	 * The name in other languages.
	 */
	localizations?: Record<string, string>;
}
