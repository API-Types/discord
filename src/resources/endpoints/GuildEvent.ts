import type { GuildEvent, GuildScheduledEventEntityType, PrivacyLevel, snowflake } from '../../';

/**
 * Returns a list of Guild Events in the guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild-event#list-guild-events-for-guild) `/guilds/{guild.id}/events`
 */
export interface ListGuildEventsForGuild {
	query: {
		/**
		 * Users subscribed to the event.
		 */
		with_user_count?: boolean;
	};

	response: GuildEvent[];
}

/**
 * Create a Guild Event in the guild. Returns a Guild Event object on success.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild-event#create-guild-event) `/guilds/{guild.id}/events`
 */
export interface CreateGuildEvent {
	body: {
		/**
		 * The stage channel ID of the event.
		 */
		channel_id?: snowflake;

		/**
		 * The name of the event.
		 */
		name: string;

		/**
		 * The privacy level of the event.
		 */
		privacy_level: PrivacyLevel;

		/**
		 * The time to schedule the event.
		 */
		scheduled_start_time: string;

		/**
		 * The description of the event.
		 */
		description?: string;

		/**
		 * The scheduled entity type of the event.
		 */
		entity_type: GuildScheduledEventEntityType;
	};

	response: GuildEvent;
}

/**
 * Get a Guild Event. Returns a Guild Event object on success.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild-event#get-guild-event) `/guild-events/{event.id}/`
 */
export interface GetGuildEvent {
	response: GuildEvent;
}

/**
 * Delete a Guild Event.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild-event#delete-guild-event) `/guild-events/{event.id}/`
 */
export interface DeleteGuildEvent {
	response: never;
}

/**
 * Modify a Guild Event. Returns the modified Guild Event object on success.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild-event#modify-guild-event) `/guild-events/{event.id}/`
 */
export interface ModifyGuildEvent {
	body: Partial<CreateGuildEvent['body']>;
	response: GuildEvent;
}
