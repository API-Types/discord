import type { Nullable } from 'extended-utility-types';
import type { PartialGuild, snowflake, User } from '../';

/**
 * Represents a code that when used, creates a guild based on a snapshot of an
 * existing guild.
 *
 * @source {@link https://discord.com/developers/docs/resources/template#template-object-template-structure|Guild Template}
 */
export interface GuildTemplate {
	/**
	 * The template code (unique ID).
	 */
	readonly code: string;

	/**
	 * Template name.
	 */
	name: string;

	/**
	 * The description for the template.
	 */
	description: Nullable<string>;

	/**
	 * Number of times this template has been used.
	 */
	readonly usage_count: number;

	/**
	 * The ID of the user who created the template.
	 */
	readonly creator_id: snowflake;

	/**
	 * The user who created the template.
	 */
	readonly creator: User;

	/**
	 * When this template was created.
	 */
	readonly created_at: string;

	/**
	 * When this template was last synced to the source guild.
	 */
	readonly updated_at: string;

	/**
	 * The ID of the guild this template is based on.
	 */
	readonly source_guild_id: snowflake;

	/**
	 * The guild snapshot this template contains.
	 */
	readonly serialized_source_guild: PartialGuild;

	/**
	 * Whether the template has unsynced changes.
	 */
	readonly is_dirty: Nullable<boolean>;
}
