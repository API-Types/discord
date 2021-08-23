import type { Nullable } from 'extended-utility-types';
import type { Application, PartialChannel, PartialGuild, PartialGuildMember, User } from '../';

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#get-guild-vanity-url-example-partial-invite-object|Guild}
 */
export interface PartialInvite extends Pick<InviteMetadata, 'uses'> {
	/**
	 * The invite code (unique ID).
	 */
	code: Nullable<string>;
}

/**
 * Represents a code that when used, adds a user to a guild or group DM channel.
 *
 * @source {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-structure|Invite}
 */
export interface Invite {
	/**
	 * The invite code (unique ID).
	 */
	code: string;

	/**
	 * The guild this invite is for.
	 */
	guild?: PartialGuild;

	/**
	 * The channel this invite is for.
	 */
	channel: PartialChannel;

	/**
	 * The user who created the invite.
	 */
	inviter?: User;

	/**
	 * The type of target for this voice channel invite.
	 */
	target_type?: InviteTargetType;

	/**
	 * The user whose stream to display for this voice channel stream invite.
	 */
	target_user?: User;

	/**
	 * The embedded application to open for this voice channel embedded
	 * application invite.
	 */
	target_application?: Partial<Application>;

	/**
	 * Approximate count of online members, returned from the
	 * `GET /invites/<code>` endpoint when `with_counts` is `true`.
	 */
	approximate_presence_count?: number;

	/**
	 * Approximate count of total members, returned from the
	 * `GET /invites/<code>` endpoint when `with_counts` is `true`.
	 */
	approximate_member_count?: number;

	/**
	 * The expiration date of this invite, returned from the
	 * `GET /invites/<code>` endpoint when `with_expiration` is `true`.
	 */
	expires_at?: Nullable<string>;

	/**
	 * Stage instance data if there is a public Stage instance in the Stage
	 * channel this invite is for.
	 */
	stage_instance?: InviteStageInstance;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-target-typs|Invite}
 */
export enum InviteTargetType {
	Stream = 1,
	EmbeddedApplication
}

/**
 * Extra information about an invite.
 *
 * @source {@link https://discord.com/developers/docs/resources/invite#invite-metadata-object-invite-metadata-structure|Invite}
 */
export interface InviteMetadata extends Invite {
	/**
	 * Number of times this invite has been used.
	 */
	uses: number;

	/**
	 * Max number of times this invite can be used.
	 */
	max_uses: number;

	/**
	 * Duration (in seconds) after which the invite expires.
	 */
	max_age: number;

	/**
	 * Whether this invite only grants temporary membership.
	 */
	temporary: boolean;

	/**
	 * When this invite was created.
	 */
	created_at: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/invite#invite-stage-instance-object-invite-stage-instance-structure|Invite}
 */
export interface InviteStageInstance {
	/**
	 * The members speaking in the Stage.
	 */
	members: PartialGuildMember[];

	/**
	 * The number of users in the Stage.
	 */
	participant_count: number;

	/**
	 * The number of users speaking in the Stage.
	 */
	speaker_count: number;

	/**
	 * The topic of the Stage instance (`1-120` characters).
	 */
	topic: string;
}
