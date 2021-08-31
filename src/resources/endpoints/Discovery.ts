import type { DiscoveryCategory } from '../../';

/**
 * Returns an array of discovery category objects that can be used when editing
 * guilds.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/discovery#list-discovery-categories) `/discovery/categories`
 */
export interface ListDiscoveryCategories {
	response: DiscoveryCategory[];
}

/**
 * Checks if a discovery search term is valid.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/discovery#validate-discovery-search-term) `/discovery/valid-term`
 */
export interface ValidateDiscoverySearchTerm {
	query: {
		/**
		 * The search term to check.
		 */
		term: string;
	};

	response: {
		/**
		 * Whether the provided term is valid.
		 */
		valid: boolean;
	};
}
