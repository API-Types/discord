import type { Nullable } from 'extended-utility-types';
import type { Guild, GuildTemplate } from '../../';

/**
 * Returns a guild template object for the given code.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild-template#get-guild-template) `/guilds/template/{template.code}`
 */
export interface GetGuildTemplate {
	response: GuildTemplate;
}

/**
 * Create a new guild based on a template. Returns a guild object on success.
 * Fires a Guild Create Gateway event.
 *
 * @remarks
 * This endpoint can be used only by bots in less than `10` guilds.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template) `/guilds/templates/{template.code}`
 */
export interface CreateGuildFromGuildTemplate {
	body: {
		/**
		 * Name of the guild (`2-100` characters).
		 */
		name: string;

		/**
		 * Base64 `128x128` image for the guild icon.
		 */
		icon?: string;
	};

	response: Guild;
}

/**
 * Returns an array of guild template objects. Requires the `MANAGE_GUILD`
 * permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild-template#get-guild-templates) `/guilds/{guild.id}/templates`
 */
export interface GetGuildTemplates {
	response: GuildTemplate[];
}

/**
 * Creates a template for the guild. Requires the `MANAGE_GUILD` permission.
 * Returns the created guild template object on success.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild-template#create-guild-template) `/guilds/{guild.id}/templates`
 */
export interface CreateGuildTemplate {
	body: {
		/**
		 * Name of the template (`1-100` characters).
		 */
		name: string;

		/**
		 * Description for the template (`0-120` characters).
		 */
		description?: Nullable<string>;
	};

	response: GuildTemplate;
}

/**
 * Syncs the template to the guild's current state. Requires the `MANAGE_GUILD`
 * permission. Returns the guild template object on success.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/guild-template#get-guild-templates) `/guilds/{guild.id}/templates/{template.code}`
 */
export interface SyncGuildTemplate {
	response: GuildTemplate;
}

/**
 * Modifies the template's metadata. Requires the `MANAGE_GUILD` permission.
 * Returns the guild template object on success.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild-template#modify-guild-template) `/guilds/{guild.id}/templates/{template.code}`
 */
export interface ModifyGuildTemplate {
	body: Partial<CreateGuildTemplate['body']>;
	response: GuildTemplate;
}

/**
 * Deletes the template. Requires the `MANAGE_GUILD` permission. Returns the
 * deleted guild template object on success.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild-template#delete-guild-template) `/guilds/{guild.id}/templates/{template.code}`
 */
export interface DeleteGuildTemplate {
	response: GuildTemplate;
}
