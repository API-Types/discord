import type { Nullable, Range, Tuple } from 'extended-utility-types';
import type {
	Ban,
	Channel,
	ChannelType,
	DefaultMessageNotificationLevel,
	DiscoveryMetadata,
	ExplicitContentFilterLevel,
	Guild,
	GuildFeature,
	GuildMember,
	GuildPreview,
	GuildWidget,
	GuildWidgetSettings,
	Integration,
	InviteMetadata,
	MembershipScreening,
	Message,
	Overwrite,
	PartialChannel,
	PartialInvite,
	Role,
	Snowflake,
	SystemChannelFlags,
	ThreadChannel,
	VerificationLevel,
	VoiceRegion,
	WelcomeScreen,
	WelcomeScreenChannel
} from '../../';
import type { GuildIdentifiable, Identifiable, PartialTuple } from '../../__internal__';

/**
 * Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event.
 *
 * @remarks
 * This endpoint can be used only by bots in less than `10` guilds.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#create-guild) `/guilds`
 */
export interface CreateGuild {
	body: {
		/**
		 * Name of the guild (`2-100` characters).
		 */
		name: string;

		/**
		 * Base64 `128x128` image for the guild icon.
		 */
		icon?: string;
		verification_level?: VerificationLevel;
		default_message_notifications?: DefaultMessageNotificationLevel;
		explicit_content_filter?: ExplicitContentFilterLevel;

		/**
		 * New guild roles.
		 *
		 * @remarks
		 * When using the `roles` parameter:
		 * - The first member of the array is used to change properties of the guild's `@everyone`
		 * role. If you are trying to bootstrap a guild with additional roles, keep this in mind.
		 * - The required `id` field within each role object is an integer placeholder, and will be
		 * replaced by the API upon consumption. Its purpose is to allow you to overwrite a role's
		 * permissions in a channel when also passing in channels with the channels array.
		 */
		roles?: Role[];

		/**
		 * New guild's channels.
		 *
		 * @remarks
		 * When using the `channels` parameter:
		 * - The `position` field is ignored, and none of the default channels are created.
		 * - The `id` field within each channel object may be set to an integer placeholder, and
		 * will be replaced by the API upon consumption. Its purpose is to allow you to create
		 * `GUILD_CATEGORY` channels by setting the `parent_id` field on any children to the
		 * category's `id` field. Category channels must be listed before any children.
		 */
		channels?: PartialChannel;
		afk_channel_id?: Snowflake;

		/**
		 * AFK timeout in seconds.
		 */
		afk_timeout?: number;

		/**
		 * The ID of the channel where guild notices such as welcome messages and boost events are
		 * posted.
		 */
		system_channel_id?: Snowflake;
		system_channel_flags?: SystemChannelFlags;
	};

	response: Guild;
}

/**
 * Returns the guild object for the given ID.
 *
 * If `with_counts` is set to `true`, this endpoint will also return `approximate_member_count` and
 * `approximate_presence_count` for the guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild) `/guilds/{guild.id}`
 */
export interface GetGuild {
	query: {
		/**
		 * When `true`, will return approximate member and presence counts for the guild.
		 *
		 * @defaultValue `false`
		 */
		with_counts?: boolean;
	};

	response: Guild;
}

/**
 * Returns the guild preview object for the given ID.
 *
 * If the user is not in the guild, then the guild must be lurkable (it must be Discoverable or
 * have a live public stage).
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-preview) `/guilds/{guild.id}/preview`
 */
export interface GetGuildPreview {
	response: GuildPreview;
}

/**
 * Modify a guild's settings. Returns the updated guild object on success. Fires a Guild Update
 * Gateway event.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild) `/guilds/{guild.id}`
 */
export interface ModifyGuild {
	body: {
		name?: string;
		verification_level?: Nullable<VerificationLevel>;
		default_message_notifications?: Nullable<DefaultMessageNotificationLevel>;
		explicit_content_filter?: Nullable<ExplicitContentFilterLevel>;
		afk_channel_id?: Nullable<Snowflake>;

		/**
		 * AFK timeout in seconds.
		 */
		afk_timeout?: Nullable<number>;

		/**
		 * Base64 `1024x1024` PNG/JPEG/GIF image for the guild icon (can be animated GIF when the
		 * server has `ANIMATED_ICON` feature).
		 */
		icon?: Nullable<string>;

		/**
		 * User ID to transfer guild ownership to (must be owner).
		 */
		owner_id?: Snowflake;

		/**
		 * Base64 `16:9` PNG/JPEG image for the guild splash (when the server has `INVITE_SPLASH`
		 * feature).
		 */
		splash?: Nullable<string>;

		/**
		 * Base64 `16:9` PNG/JPEG image for the guild banner (when the server has `BANNER` feature).
		 */
		banner?: Nullable<string>;

		/**
		 * The ID of the channel where guild notices such as welcome messages and boost events are
		 * posted.
		 */
		system_channel_id?: Nullable<Snowflake>;
		system_channel_flags?: SystemChannelFlags;

		/**
		 * The ID of the channel where Community guilds display rules and/or guidelines.
		 */
		rules_channel_id?: Nullable<Snowflake>;

		/**
		 * The ID of the channel where admins and moderators of Community guilds receive notices
		 * from Discord.
		 */
		public_updates_channel_id?: Nullable<Snowflake>;

		/**
		 * The preferred locale of a Community guild used in server discovery and notices from
		 * Discord.
		 *
		 * @defaultValue `en-US`
		 */
		preferred_locale?: Nullable<string>;

		/**
		 * Enabled guild features.
		 */
		features?: `${GuildFeature}`[];

		/**
		 * The description for the guild, if the guild is discoverable.
		 */
		description: Nullable<string>;
	};

	response: Guild;
}

/**
 * Delete a guild permanently. Returns `204 No Content` on success. Fires a Guild Delete Gateway
 * event.
 *
 * User must be owner.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild#delete-guild) `/guilds/{guild.id}`
 */
export interface DeleteGuild {
	response: never;
}

/**
 * Returns a list of guild channel objects. Does not include threads.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-channels) `/guilds/{guild.id}/channels`
 */
export interface GetGuildChannels {
	response: Exclude<Channel, ThreadChannel>[];
}

/**
 * Create a new channel object for the guild. Returns the new channel object on success. Fires a
 * Channel Create Gateway event.
 *
 * Requires the `MANAGE_CHANNELS` permission.
 *
 * If setting permission overwrites, only permissions a bot has in the guild can be allowed/denied.
 * Setting `MANAGE_ROLES` permission in channels is only possible for guild administrators.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#create-guild-channel) `/guilds/{guild.id}/channels`
 */
export interface CreateGuildChannel {
	body: {
		/**
		 * Channel name (`1-100` characters).
		 */
		name: string;
		type?: ChannelType;

		/**
		 * Channel topic (`0-1024` characters).
		 */
		topic?: string;

		/**
		 * The bitrate (in bits) of the voice channel (voice only).
		 */
		bitrate?: number;

		/**
		 * The user limit of the voice channel (voice only).
		 */
		user_limit?: number;

		/**
		 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as
		 * well as users with the permission `MANAGE_MESSAGES` or `MANAGE_CHANNEL`, are unaffected.
		 */
		rate_limit_per_user?: number;

		/**
		 * Sorting position of the channel.
		 */
		position?: number;

		/**
		 * The channel's permission overwrites.
		 */
		permission_overwrites?: Overwrite[];

		/**
		 * ID of the parent category for a channel.
		 */
		parent_id?: Snowflake;
		nsfw?: boolean;
	};

	response: Channel;
}

/**
 * Modify the positions of a set of channel objects for the guild. Returns a `204` empty response
 * on success. Fires multiple Channel Update Gateway events.
 *
 * Requires `MANAGE_CHANNELS` permission.
 *
 * @remarks
 * - Only channels to be modified are required, with the minimum being a swap between at least two
 * channels.
 * - This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions) `/guilds/{guild.id}/channels`
 */
export interface ModifyGuildChannelPositions {
	body: {
		id: Snowflake;

		/**
		 * Sorting position of the channel.
		 */
		position: Nullable<number>;

		/**
		 * Syncs the permission overwrites with the new parent, if moving to a new category.
		 */
		lock_permissions: Nullable<boolean>;

		/**
		 * The new parent ID for the channel that is moved.
		 */
		parent_id: Nullable<Snowflake>;
	}[];

	response: never;
}

/**
 * Returns a guild member object for the specified user.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-member) `/guilds/{guild.id}/members/{user.id}`
 */
export interface GetGuildMember {
	response: GuildMember;
}

/**
 * Returns a list of guild member objects that are members of the guild.
 *
 * @remarks
 * - This endpoint is restricted according to whether the `GUILD_MEMBERS` Privileged Intent is
 * enabled for your appliation.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#list-guild-members) `/guilds/{guild.id}/members`
 */
export interface ListGuildMembers {
	query: {
		/**
		 * Max number of members to return.
		 *
		 * @defaultValue `1`
		 */
		limit?: Range<1, 1000>;

		/**
		 * The highest user ID in the previous page.
		 *
		 * @defaultValue `0`
		 */
		after?: Snowflake;
	};

	response: GuildMember[];
}

/**
 * Returns a list of guild member objects whose username or nickname starts with a provided string.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#search-guild-members) `/guilds/{guild.id}/members/search`
 */
export interface SearchGuildMembers {
	query: {
		/**
		 * Query string to match username(s) and nickname(s) against.
		 */
		query: string;

		/**
		 * Max numbers of members to return.
		 *
		 * @defaultValue `1`
		 */
		limit?: Range<1, 1000>;
	};

	response: GuildMember[];
}

/**
 * Adds a user to the guild, provided you have a valid OAuth2 access token for the user with the
 * `guilds.join` scope. Returns a `201 Created` with the guild member as the body, or
 * `204 No Content` if the user is already a member of the guild. Fires a Guild Member Add Gateway
 * event.
 *
 * For guilds with Membership Screening enabled, this endpoint will default to adding new members
 * as `pending` in the guild member object. Members that are `pending` will have to complete
 * membership screening before they become full members that can talk.
 *
 * @remarks
 * The Authorization header must be a Bot token (belonging to the same application used for
 * authorization), and the bot must be a member of the guild with `CREATE_INSTANT_INVITE`
 * permission.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/guild#add-guild-member) `/guilds/{guild.id}/members/{user.id}`
 */
export interface AddGuildMember {
	body: {
		/**
		 * An OAuth2 access token granted with the `guilds.join` to the bot's application for the
		 * user to add to the guild.
		 */
		access_token: string;

		/**
		 * Value to set users nickname to. Requires the `MANAGE_NICKNAMES` permission.
		 */
		nick?: string;

		/**
		 * Array of role ids the member is assigned. Requires the `MANAGE_ROLES` permission.
		 */
		roles?: Snowflake[];

		/**
		 * Whether the user is muted in voice channels. Requires the `MUTE_MEMBERS` permission.
		 */
		mute?: boolean;

		/**
		 * Whether the user is deafened in voice channels. Requires the `DEAFEN_MEMBERS` permission.
		 */
		deaf?: boolean;
	};

	response: GuildMember;
}

/**
 * Modify attributes of a guild member. Returns a `200 OK` with the guild member as the body. Fires
 * a Guild Member Update Gateway event.
 *
 * If the `channel_id` is set to `null`, this will force the target user to be disconnected from
 * voice.
 *
 * @remarks
 * - When moving members to channels, the API user *must* have permissions to both connect to the
 * channel and have the `MOVE_MEMBERS` permission.
 * - This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-member) `/guilds/{guild.id}/members/{user.id}`
 */
export interface ModifyGuildMember {
	body: {
		/**
		 * Value to set users nickname to. Requires the `MANAGE_NICKNAMES` permission.
		 */
		nick?: Nullable<string>;

		/**
		 * Array of role IDs the member is assigned. Requires the `MANAGE_ROLES` permission.
		 */
		roles?: Nullable<Snowflake[]>;

		/**
		 * Whether the user is muted in voice channels. Requires the `MUTE_MEMBERS` permission.
		 */
		mute?: Nullable<boolean>;

		/**
		 * Whether the user is deafened in voice channels. Requires the `DEAFEN_MEMBERS` permission.
		 */
		deaf?: Nullable<boolean>;

		/**
		 * ID of channel to move user to (if they are connected to voice). Requires the
		 * `MOVE_MEMBERS` permission.
		 */
		channel_id?: Nullable<Snowflake>;
	};

	response: GuildMember;
}

/**
 * Modifies the current member in a guild.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-current-member) `/guilds/{guild.id}/members/@me`
 */
export interface ModifyCurrentMember {
	body: {
		/**
		 * Value to set user's nickname to. Requires the `CHANGE_NICKNAME` permission.
		 */
		nick?: Nullable<string>;
	};

	response: string;
}

/**
 * Adds a role to a guild member. Returns a `204` empty response on success. Fires a Guild Member
 * Update Gateway event.
 *
 * Requires the `MANAGE_ROLES` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/guild#add-guild-member-role) `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
 */
export interface AddGuildMemberRole {
	response: never;
}

/**
 * Removes a role from a guild member. Returns a `204` empty response on success. Fires a Guild
 * Member Update Gateway event.
 *
 * Requires the `MANAGE_ROLES` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild#remove-guild-member-role) `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
 */
export interface RemoveGuildMemberRole {
	response: never;
}

/**
 * Remove a member from a guild. Returns a `204` empty response on success. Fires a Guild Member
 * Remove Gateway event.
 *
 * Requires the `KICK_MEMBERS` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild#remove-guild-member) `/guilds/{guild.id}/members/{user.id}`
 */
export interface RemoveGuildMember {
	response: never;
}

/**
 * Returns a list of ban objects for the users banned from this guild.
 *
 * Requires the `BAN_MEMBERS` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-bans) `/guilds/{guild.id}/bans`
 */
export interface GetGuildBans {
	response: Ban[];
}

/**
 * Returns a ban object for the given user or a `404 NOT FOUND` if the ban cannot be found.
 *
 * Requires the `BAN_MEMBERS` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-ban) `/guilds/{guild.id}/bans/{user.id}`
 */
export interface GetGuildBan {
	response: Ban;
}

/**
 * Create a guild ban, and optionally delete previous messages sent by the banned user. Returns a
 * `204` empty response on success. Fires a Guild Ban Add Gateway event.
 *
 * Requires the `BAN_MEMBERS` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/guild#create-guild-ban) `/guilds/{guild.id}/bans/{user.id}`
 */
export interface CreateGuildBan {
	body: {
		/**
		 * Number of days to delete messages for.
		 */
		delete_messages_days?: Range<0, 7>;
	};

	response: never;
}

/**
 * Remove the ban for a user. Returns a `204` empty response on success. Fires a Guild Ban Remove
 * Gateway event.
 *
 * Requires the `BAN_MEMBERS` permissions.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild#remove-guild-ban) `/guilds/{guild.id}/bans/{user.id}`
 */
export interface RemoveGuildBan {
	response: never;
}

/**
 * Returns a list of role objects for the guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-roles) `/guilds/{guild.id}/roles`
 */
export interface GetGuildRoles {
	response: Role[];
}

/**
 * Create a new role for the guild. Returns the new role object on success. Fires a Guild Role
 * Create Gateway event.
 *
 * Requires the `MANAGE_ROLES` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#create-guild-role) `/guilds/{guild.id}/roles`
 */
export interface CreateGuildRole {
	body: {
		/**
		 * @defaultValue `new role`
		 */
		name?: string;

		/**
		 * Bitwise value of the enabled/disabled permissions.
		 *
		 * @defaultValue `@everyone` permissions in guild
		 */
		permissions?: string;

		/**
		 * RGB color value.
		 *
		 * @defaultValue `0`
		 */
		color?: number;

		/**
		 * Whether the role should be displayed separately in the sidebar.
		 *
		 * @defaultValue `false`
		 */
		hoist?: boolean;

		/**
		 * Whether the role should be mentionable.
		 *
		 * @defaultValue `false`
		 */
		mentionable?: boolean;
	};

	response: Role;
}

/**
 * Modify the positions of a set of role objects for the guild. Returns a list of all of the guild's
 * role objects on success. Fires multiple Guild Role Update Gateway events.
 *
 * Requires the `MANAGE_ROLES` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-role-positions) `/guilds/{guild.id}/roles`
 */
export interface ModifyGuildRolePositions {
	body: (Identifiable & {
		/**
		 * Sorting position of the role.
		 */
		position?: Nullable<number>;
	})[];

	response: Role[];
}

/**
 * Modify a guild role. Returns the updated role on success. Fires a Guild Role Update Gateway
 * event.
 *
 * Requires the `MANAGE_ROLES` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-role) `/guilds/{guild.id}/roles/{role.id}`
 */
export interface ModifyGuildRole {
	body: {
		name?: Nullable<string>;

		/**
		 * Bitwise value of the enabled/disabled permissions.
		 */
		permissions?: Nullable<string>;

		/**
		 * RGB color value.
		 */
		color?: Nullable<number>;

		/**
		 * Whether the role should be displayed separately in the sidebar.
		 */
		hoist?: Nullable<boolean>;

		/**
		 * Whether the role should be mentionable.
		 */
		mentionable?: Nullable<boolean>;
	};

	response: Role;
}

/**
 * Delete a guild role. Returns a `204` empty response on success. Fires a Guild Role Delete
 * Gateway event.
 *
 * Requires the `MANAGE_ROLES` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild#delete-guild-role) `/guilds/{guild.id}/roles/{role.id}`
 */
export interface DeleteGuildRole {
	response: never;
}

/**
 * Returns an object with one `pruned` key indicating the number of members that would be removed in
 * a prune operation.
 *
 * Requires the `KICK_MEMBERS` permission.
 *
 * By default, prune will not remove users with roles. Specific roles can optionally be included in
 * the prune by providing the `include_roles` parameter. Any inactive user that has a subset of the
 * provided role(s) will be counted in the prune and users with additional roles will not.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-prune-count) `/guilds/{guild.id}/prune`
 */
export interface GetGuildPruneCount {
	query: {
		/**
		 * Number of days to count prune for.
		 *
		 * @defaultValue `7`
		 */
		days?: Range<1, 30>;
		include_roles?: string;
	};

	response: {
		pruned: number;
	};
}

/**
 * Begin a prune operation. Returns an object with one `pruned` key indicating the number of
 * members that were removed in the prune operation. Fires multiple Guild Member Remove Gateway
 * events.
 *
 * Requires the `KICK_MEMBERS` permission.
 *
 * For large guilds it's recommended to set the `compute_prune_count` option to `false`, forcing
 * `pruned` to `null`.
 *
 * By default, prune will not remove users with roles. Specific roles can optionally be included in
 * the prune by providing the `include_roles` parameter. Any inactive user that has a subset of
 * the provided role(s) will be counted in the prune and users with additional roles will not.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#begin-guild-prune)`/guilds/{guild.id}/prune`
 */
export interface BeginGuildPrune {
	body: GetGuildPruneCount['query'] & {
		/**
		 * Whether `pruned` is returned, discouraged for large guilds.
		 *
		 * @defaultValue `true`
		 */
		compute_prune_count?: boolean;
	};

	response: {
		pruned: Nullable<number>;
	};
}

/**
 * Returns a list of voice region objects for the guild.
 *
 * Unlike the similar `/voice` route, this returns VIP servers when the guild is VIP-enabled.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-voice-regions) `/guilds/{guild.id}/regions`
 */
export interface GetGuildVoiceRegions {
	response: VoiceRegion[];
}

/**
 * Returns a list of invite objects (with invite metadata) for the guild.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-invites) `/guilds/{guild.id}/invites`
 */
export interface GetGuildInvites {
	response: InviteMetadata[];
}

/**
 * Returns a list of integration objects for the guild.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-integrations) `/guilds/{guild.id}/integrations`
 */
export interface GetGuildIntegrations {
	response: Integration[];
}

/**
 * Delete the attached integration object for the guild. Deletes any associated webhooks and kicks
 * the associated bot if there is one. Returns a `204` empty response on success. Fires a Guild
 * Integrations Update Gateway event.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 */
export interface DeleteGuildIntegration {
	response: never;
}

/**
 * Returns a guild widget object.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-widget-settings) `/guilds/{guild.id}/widget`
 */
export type GetGuildWidgetSettings = GuildWidgetSettings;

/**
 * Modify a guild widget object for the guild. Returns the updated guild widget object.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-widget) `/guilds/{guild.id}/widget`
 */
export interface ModifyGuildWidget {
	body: Partial<GuildWidget>;
	response: GuildWidget;
}

/**
 * Returns the widget for the guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-widget) `/guilds/{guild.id}/widget.json`
 */
export interface GetGuildWidget {
	response: GuildWidget;
}

/**
 * Returns a partial invite object for guilds with that feature enabled.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * `code` will be `null` if a vanity URL for the guild is not set.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-vanity-url) `/guilds/{guild.id}/vanity-url`
 */
export interface GetGuildVanityURL {
	response: PartialInvite;
}

/**
 * Returns a PNG image widget for the guild.
 *
 * Requires no permissions or authentication.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-widget-image) `/guilds/{guild.id}/widget.png`
 */
export interface GetWidgetImage {
	query: {
		/**
		 * Style of the widget image returned.
		 *
		 * @defaultValue `shield`
		 */
		style?: WidgetStyle;
	};

	response: unknown;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options|Guild}
 */
export enum WidgetStyle {
	/**
	 * Shield style widget with Discord icon and guild members online count.
	 */
	Shield = 'shield',

	/**
	 * Large image with guild icon, name, and online count. `"POWERED BY DISCORD"` as the footer of
	 * the widget.
	 */
	Banner1 = 'banner1',

	/**
	 * Smaller widget style with guild icon, name and online count. Split on the right with Discord
	 * logo.
	 */
	Banner2 = 'banner2',

	/**
	 * Large image with guild icon, name and online count. In the footer, Discord logo on the left
	 * and `"Chat Now"` on the right.
	 */
	Banner3 = 'banner3',

	/**
	 * Large Discord logo at the top of the widget. Guild icon, name and online count in the middle
	 * portion of the widget and a `"JOIN MY SERVER"` button at the bottom.
	 */
	Banner4 = 'banner4'
}

/**
 * Returns the Welcome Screen object for the guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen) `/guilds/{guild.id}/welcome-screen`
 */
export interface GetGuildWelcomeScreen {
	response: WelcomeScreen;
}

/**
 * Modify the guild's Welcome Screen. Returns the updated Welcome Screen object.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen) `/guilds/{guild.id}/welcome-screen`
 */
export interface ModifyGuildWelcomeScreen {
	body: {
		/**
		 * Whether the welcome screen is enabled.
		 */
		enabled?: Nullable<boolean>;

		/**
		 * Channels linked in the welcome screen and their display options.
		 */
		welcome_channels?: Nullable<WelcomeScreenChannel[]>;

		/**
		 * The server description to show in the welcome screen.
		 */
		description?: Nullable<string>;
	};

	response: WelcomeScreen;
}

/**
 * Updates the current user's voice state.
 *
 * @remarks
 * - `channel_id` must currently point to a stage channel.
 * - The current user must already have joined `channel_id`.
 * - You must have the `MUTE_MEMBERS` permission to unsuppress yourself. You can always suppress
 * yourself.
 * - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your
 * own request to speak.
 * - You are able to set `request_to_speak_timestamp` to any present or future time.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#update-current-user-voice-state) `/guilds/{guild.id}/voice-states/@me`
 */
export interface ModifyCurrentUserVoiceState {
	body: {
		/**
		 * The ID of the channel the user is currently in.
		 */
		channel_id: Snowflake;

		/**
		 * Toggles the user's suppress state.
		 */
		suppress?: boolean;

		/**
		 * Sets the user's request to speak.
		 */
		request_to_speak_timestamp?: Nullable<string>;
	};
}

/**
 * Updates another user's voice state.
 *
 * @remarks
 * - `channel_id` must currently point to a stage channel.
 * - User must already have joined `channel_id`.
 * - You must have the `MUTE_MEMBERS` permission (since suppression is the only thing that is
 * available currently).
 * - When unsuppressed, non-bot users will have their `request_to_speak_timestamp` set to the
 * current time. Bot users will not.
 * - When suppressed, the user will have their `request_to_speak_timestamp` removed.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#update-user-voice-state) `/guilds/{guild.id}/voice-states/{user.id}`
 */
export interface ModifyUserVoiceState {
	body: Omit<ModifyCurrentUserVoiceState['body'], 'request_to_speak_timestamp'>;
}

/**
 * Returns the discovery metadata object for the guild.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint GET `/guilds/{guild.id}/discovery-metadata`
 */
export interface GetGuildDiscoveryMetadata {
	response: DiscoveryMetadata;
}

/**
 * Modify the discovery metadata for the guild.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint PATCH `/guilds/{guild.id}/discovery-metadata`
 */
export interface ModifyGuildDiscoveryMetadata {
	body: {
		/**
		 * The ID of the primary discovery category.
		 *
		 * @defaultValue `0`
		 */
		primary_category_id?: Nullable<number>;

		/**
		 * Discovery search keywords.
		 *
		 * @defaultValue `null`
		 */
		keywords?: Nullable<Partial<Tuple<string, 10>>>;

		/**
		 * Whether guild info is shown when custom emojis are clicked.
		 *
		 * @defaultValue `true`
		 */
		emoji_discoverability_enabled?: Nullable<boolean>;
	};

	response: DiscoveryMetadata;
}

/**
 * Add a discovery subcategory to the guild.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint POST `/guilds/{guild.id}/discovery-categories/{category.id}`
 */
export interface AddGuildDiscoverySubcategory {
	response: GuildIdentifiable & {
		/**
		 * The ID of the subcategory added.
		 */
		category_id: number;
	};
}

/**
 * Removes a discovery subcategory from the guild.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint DELETE `/guilds/{guild.id}/discovery-categories/{category.id}`
 */
export interface RemoveGuildDiscoverySubcategory {
	response: never;
}

/**
 * Modify the guild's Membership Screening form.
 *
 * Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint PATCH `/guilds/{guild.id}/member-verification`
 */
export interface ModifyMembershipScreening {
	body: {
		enabled?: boolean;

		/**
		 * Array of field objects serialized in a string.
		 */
		form_fields?: string;

		/**
		 * The server description to show in the screening form.
		 */
		description?: string;
	};

	response: MembershipScreening;
}

/**
 * @endpoint GET `/guilds/{guild.id}/messages`
 */
export interface SearchGuildMessages {
	query: {
		content?: string;
		author_id?: Snowflake;
		mentions?: Snowflake;
		has?: 'link' | 'embed' | 'video' | 'image' | 'file' | 'sound';
		max_id?: Snowflake;
		min_id?: Snowflake;
		channel_id?: Snowflake;
		sort_by?: 'timestamp' | 'relevance';
		sort_order?: 'asc' | 'desc';
	};

	response: {
		messages: PartialTuple<Message & { hit: boolean }, 25>;
		total_results: number;
	};
}
