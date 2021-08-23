import type { Range } from 'extended-utility-types';
import type { AuditLog, AuditLogEvent, snowflake } from '../../';

/**
 * Returns an audit log object for the guild. Requires the `VIEW_AUDIT_LOG`
 * permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log) `/guilds/{guild.id}/audit-logs`
 */
export interface GetGuildAuditLog {
	query: {
		/**
		 * Filter the log for actions made by a user.
		 */
		user_id?: snowflake;

		/**
		 * The type of audit log event.
		 */
		action_type?: AuditLogEvent;

		/**
		 * Filter the log before a certain entry ID.
		 */
		before?: snowflake;

		/**
		 * How many entries are returned.
		 *
		 * @defaultValue `50`
		 */
		limit?: Range<1, 100>;
	};

	response: AuditLog;
}
