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
	code: string;

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
	usage_count: number;

	/**
	 * The ID of the user who created the template.
	 */
	creator_id: snowflake;

	/**
	 * The user who created the template.
	 */
	creator: User;

	/**
	 * When this template was created.
	 */
	created_at: string;

	/**
	 * When this template was last synced to the source guild.
	 */
	updated_at: string;

	/**
	 * The ID of the guild this template is based on.
	 */
	source_guild_id: snowflake;

	/**
	 * The guild snapshot this template contains.
	 */
	serialized_source_guild: PartialGuild;

	/**
	 * Whether the template has unsynced changes.
	 */
	is_dirty: Nullable<boolean>;
}
