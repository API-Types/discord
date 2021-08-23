import type { snowflake } from '../';

/**
 * A Stage Instance holds information about a live stage.
 *
 * @source {@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-stage-instance-structure|Stage Instance}
 */
export interface StageInstance {
	/**
	 * The ID of this Stage instance.
	 */
	id: snowflake;

	/**
	 * The guild ID of the associated Stage channel.
	 */
	guild_id: snowflake;

	/**
	 * The ID of the associated Stage channel.
	 */
	channel_id: snowflake;

	/**
	 * The topic of the Stage instance (`1-120` characters).
	 */
	topic: string;

	/**
	 * The privacy level of the Stage instance.
	 */
	privacy_level: PrivacyLevel;

	/**
	 * Whether or not Stage discovery is disabled.
	 */
	discoverable_disabled: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level|Stage Instance}
 */
export enum PrivacyLevel {
	/**
	 * The Stage instance is visible publicly.
	 */
	Public,

	/**
	 * The Stage instance is visible to only guild members.
	 */
	GuildOnly
}
