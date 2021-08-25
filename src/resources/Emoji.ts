import type { Nullable } from 'extended-utility-types';
import type { snowflake, User } from '../';

/**
 * @source {@link https://discord.com/developers/docs/interactions/message-components#component-object-component-structure|Message Components}
 */
export interface PartialEmoji {
	/**
	 * Emoji ID.
	 */
	id: snowflake;

	/**
	 * Emoji name.
	 */
	name: string;

	/**
	 * Whether this emoji is animated.
	 */
	animated: boolean;
}

/**
 * @remarks
 * Routes for controlling emojis do not follow the normal rate limit
 * conventions. These routes are specifically limited on a per-guild basis to
 * prevent abuse. This means that the quota returned by the API may be
 * inaccurate, and you may encounter `429`s.
 *
 * @source {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure|Emoji}
 */
export interface Emoji extends PartialEmoji {
	/**
	 * Roles allowed to use this emoji.
	 */
	roles?: snowflake[];

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
	 * Whether this emoji can be used, may be `false` due to loss of Server
	 * Boosts.
	 */
	available?: boolean;
}

export type GatewayReactionEmoji = GatewayReactionStandardEmoji | GatewayReactionCustomEmoji;

/**
 * @source {@link https://discord.com/developers/docs/resources/emoji#emoji-object-gateway-reaction-standard-emoji-example|Emoji}
 */
export interface GatewayReactionStandardEmoji {
	id: null;
	name: string;
}

/**
 * @remarks
 * - In `MESSAGE_REACTION_ADD` gateway events, `animated` will be returned for
 * animated emojis.
 * - In `MESSAGE_REACTION_ADD` and `MESSAGE_REACTION_REMOVE` gateway events name
 * may be `null` when custom emoji data is not available (for example, if it was
 * deleted from the guild).
 *
 * @source {@link https://discord.com/developers/docs/resources/emoji#emoji-object-gateway-reaction-custom-emoji-examples|Emoji}
 */
export interface GatewayReactionCustomEmoji {
	id: snowflake;
	name: Nullable<string>;
	animated?: boolean;
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
