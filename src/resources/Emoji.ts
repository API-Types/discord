import type { Nullable } from 'extended-utility-types';
import type { Snowflake, User } from '../';

/**
 * @source {@link https://discord.com/developers/docs/resources/emoji#emoji-object-gateway-reaction-standard-emoji-example|Emoji}
 */
export interface PartialEmoji {
	id: Nullable<Snowflake>;

	/**
	 * Emoji name (can be `null` only in reaction emoji objects).
	 */
	name: Nullable<string>;

	/**
	 * Whether this emoji is animated.
	 */
	animated?: boolean;
}

/**
 * @remarks
 * Routes for controlling emojis do not follow the normal rate limit conventions. These routes are
 * specifically limited on a per-guild basis to prevent abuse. This means that the quota returned
 * by the API may be inaccurate, and you may encounter `429`s.
 *
 * @source {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure|Emoji}
 */
export interface Emoji extends PartialEmoji {
	/**
	 * Roles this emoji is whitelisted to.
	 */
	roles?: Snowflake[];

	/**
	 * User that created this emoji.
	 */
	user?: User;

	/**
	 * Whether this emoji must be wrapped in colons.
	 */
	require_colons?: boolean;

	/**
	 * Whether this emoji is managed.
	 */
	managed?: boolean;

	/**
	 * Whether this emoji can be used, may be `false` due to loss of Server Boosts.
	 */
	available?: boolean;
}

export enum EmojiDisabledReason {
	DisallowExternal = 'DISALLOW_EXTERNAL',
	GuildSubscriptionUnavailable = 'GUILD_SUBSCRIPTION_UNAVAILABLE',
	PremiumLocked = 'PREMIUM_LOCKED'
}

export enum EmojiIntention {
	Reaction = 'REACTION',
	Status = 'STATUS',
	CommunityContent = 'COMMUNITY_CONTENT',
	GuildStickerRelatedEmoji = 'GUILD_STICKER_RELATED_EMOJI',
	GuildRoleBenefitEmoji = 'GUILD_ROLE_BENEFIT_EMOJI'
}
