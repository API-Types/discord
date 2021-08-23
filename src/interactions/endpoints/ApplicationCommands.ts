import type { Tuple } from 'extended-utility-types';
import type {
	ApplicationCommand,
	ApplicationCommandOption,
	ApplicationCommandPermissions,
	ApplicationCommandType,
	GuildApplicationCommandPermissions,
	PartialGuildApplicationCommandPermissions
} from '../../';

/**
 * Fetch all of the global commands for your application. Returns an array of
 * application command objects.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands) `/applications/{application.id}/commands`
 */
export interface GetGlobalApplicationCommands {
	response: ApplicationCommand[];
}

/**
 * Creates a new global command. New global commands will be available in all
 * guilds after 1 hour. Returns `201` and an application command object.
 *
 * @remarks
 * Creating a command with the same name as an existing command for your
 * application will overwrite the old command.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/application-commands#create-global-application-command) `/applications/{application.id}/commands`
 */
export interface CreateGlobalApplicationCommand {
	body: {
		/**
		 * `1-32` lowercase character name matching `^[\w-]{1,32}$`.
		 */
		name: string;

		/**
		 * `1-100` character description.
		 */
		description: string;

		/**
		 * The parameters for the command.
		 */
		options?: Partial<Tuple<ApplicationCommandOption, 25>>;

		/**
		 * Whether the command is enabled by default when the app is added to a
		 * guild.
		 *
		 * @defaultValue `true`
		 */
		default_permission?: boolean;

		/**
		 * The type of command.
		 *
		 * @defaultValue `1`
		 */
		type?: ApplicationCommandType;
	};

	response: ApplicationCommand;
}

/**
 * Fetch a global command for your application. Returns an application command
 * object.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/application-commands#get-global-application-command) `/applications/{application.id}/commands/{command.id}`
 */
export interface GetGlobalApplicationCommand {
	response: ApplicationCommand;
}

/**
 * Edit a global command. Updates will be available in all guilds after `1`
 * hour. Returns `200` and an application command object.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command) `/applications/{application.id}/commands/{command.id}`
 */
export interface EditGlobalApplicationCommand {
	body: {
		/**
		 * `1-32` lowercase character name matching `^[\w-]{1,32}$`.
		 */
		name?: string;

		/**
		 * `1-100` character description.
		 */
		description?: string;

		/**
		 * The parameters for the command.
		 */
		options?: Partial<Tuple<ApplicationCommandOption, 25>>;

		/**
		 * Whether the command is enabled by default when the app is added to a
		 * guild.
		 *
		 * @defaultValue `true`
		 */
		default_permission?: boolean;
	};

	response: ApplicationCommand;
}

/**
 * Deletes a global command. Returns `204`.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command) `/applications/{application.id}/commands/{command.id}`
 */
export interface DeleteGlobalApplicationCommand {
	response: never;
}

/**
 * Takes a list of application commands, overwriting existing commands that are
 * registered globally for this application. Updates will be available in all
 * guilds after 1 hour. Returns `200` and a list of application command objects.
 * Commands that do not already exist will count toward the daily application
 * command create limit.
 *
 * @remarks
 * This will overwrite **all** types of application commands: slash commands,
 * user commands, and message commands.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands) `/applications/{application.id}/commands`
 */
export interface BulkOverwriteGlobalApplicationCommands {
	body: ApplicationCommand[];
	response: ApplicationCommand[];
}

/**
 * Fetch all of the guild commands for your application for a specific guild.
 * Returns an array of application command objects.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands) `/applications/{application.id}/guilds/{guild.id}/commands`
 */
export interface GetGuildApplicationCommands {
	response: ApplicationCommand[];
}

/**
 * Create a new guild command. New guild commands will be available in the guild
 * immediately. Returns `201` and an application command object. If the command
 * did not already exist, it will count toward the daily application command
 * create limit.
 *
 * @remarks
 * Creating a command with the same name as an existing command for your
 * application will overwrite the old command.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command) `/applications/{application.id}/guilds/{guild.id}/commands`
 */
export interface CreateGuildApplicationCommand {
	body: CreateGlobalApplicationCommand['body'];
	response: ApplicationCommand;
}

/**
 * Fetch a guild command for your application. Returns an application command
 * object.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
 */
export interface GetGuildApplicationCommand {
	response: ApplicationCommand;
}

/**
 * Edit a guild command. Updates for guild commands will be available
 * immediately. Returns `200` and an application command object.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
 */
export interface EditGuildApplicationCommand {
	body: EditGlobalApplicationCommand['body'];
	response: ApplicationCommand;
}

/**
 * Delete a guild command. Returns `204` on success.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
 */
export interface DeleteGuildApplicationCommand {
	response: never;
}

/**
 * Takes a list of application commands, overwriting existing commands for the
 * guild. Returns `200` and a list of application command objects.
 *
 * @remarks
 * This will overwrite all types of application commands: slash commands, user
 * commands, and message commands.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands) `/applications/{application.id}/guilds/{guild.id}/commands`
 */
export type BulkOverwriteGuildApplicationCommands = BulkOverwriteGlobalApplicationCommands;

/**
 * Fetches command permissions for all commands for your application in a guild.
 * Returns an array of guild application command permissions objects.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions) `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
 */
export interface GetGuildApplicationCommandPermissions {
	response: GuildApplicationCommandPermissions[];
}

/* eslint-disable max-len */
/**
 * Fetches command permissions for a specific command for your application in a
 * guild. Returns a guild application command permissions object.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
 */
export interface GetApplicationCommandPermissions {
	response: GuildApplicationCommandPermissions;
}

/**
 * Edits command permissions for a specific command for your application in a
 * guild. Only up to `10` permission overwrites can be added to a command.
 * Returns a guild application command permissions object.
 *
 * @remarks
 * - This endpoint will overwrite existing permissions for the command in that
 * guild.
 * - Deleting or renaming a command will permanently delete all permissions for
 * that command.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
 */
/* eslint-enable max-len */
export interface EditApplicationCommandPermissions {
	body: {
		/**
		 * The permissions for the command in the guild.
		 */
		permissions: Partial<Tuple<ApplicationCommandPermissions, 10>>;
	};

	response: GuildApplicationCommandPermissions;
}

/**
 * Batch edits permissions for all commands in a guild. Takes an array of
 * partial guild application permissions objects including `id` and
 * `permissions`.
 *
 * Only up to `10` permission overwrites can be added to a command.
 *
 * Returns an array of guild application command permissions objects.
 *
 * @remarks
 * This endpoint will overwrite existing permissions for the command in a guild,
 * including slash commands, user commands, and message commands.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/interactions/application-commands#batch-edit-application-command-permissions) `/applications/{application.id}/guilds/{guild.id}/permissions`
 */
export interface BatchEditApplicationCommandPermissions {
	body: Partial<Tuple<PartialGuildApplicationCommandPermissions, 10>>;
	response: GuildApplicationCommandPermissions[];
}
