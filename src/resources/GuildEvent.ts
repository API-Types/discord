import type { Nullable } from 'extended-utility-types';
import type { PrivacyLevel, snowflake } from '../';

/**
 * A representation of an event in a Guild.
 *
 * @source {@link https://discord.com/developers/docs/resources/guild-event#guild-event-object-guild-event-structure|Guild Event}
 */
export interface GuildEvent {
	/**
	 * The ID of the event.
	 */
	id: snowflake;

	/**
	 * The guild ID of the event.
	 */
	guild_id: snowflake;

	/**
	 * The stage channel ID of the event.
	 */
	channel_id: Nullable<snowflake>;

	/**
	 * The name of the event.
	 */
	name: string;

	/**
	 * The description of the event.
	 */
	description?: string;

	/**
	 * The image of the event.
	 */
	image: Nullable<string>;

	/**
	 * The time the event will start.
	 */
	scheduled_start_time: string;

	/**
	 * The time the event will end, or `null` if the event does not have a
	 * scheduled time to end.
	 */
	scheduled_end_time: Nullable<string>;

	/**
	 * Event privacy level.
	 */
	privacy_level: PrivacyLevel;

	/**
	 * The scheduled status of the event.
	 */
	stauts: GuildScheduledEventStatus;

	/**
	 * The scheduled entity type of the event.
	 */
	entity_type: GuildScheduledEventEntityType;

	/**
	 * Entity ID.
	 */
	entity_id: Nullable<snowflake>;

	/**
	 * Metadata for the event.
	 */
	entity_metadata: GuildEventEntityMetadata;

	/**
	 * SKU IDs.
	 */
	sku_ids: snowflake[];

	/**
	 * SKUs.
	 */
	skus: unknown[];

	/**
	 * Users subscribed to the event.
	 */
	user_count?: number;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild-event#guild-event-object-guild-scheduled-event-entity-types|Guild Event}
 */
export enum GuildScheduledEventEntityType {
	None,
	StageInstace,
	Voice,
	External
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild-event#guild-event-object-guild-scheduled-event-status|Guild Event}
 */
export enum GuildScheduledEventStatus {
	Scheduled = 1,
	Active,
	Completed,
	Canceled
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild-event#guild-event-object-guild-event-entity-metadata|Guild Event}
 */
export interface GuildEventEntityMetadata {
	/**
	 * The speakers of the stage channel.
	 */
	speaker_ids?: snowflake[];

	/**
	 * Location of the event.
	 */
	location?: string;
}
