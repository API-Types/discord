import type { DiscoveryCategory } from '../../';

/**
 * Returns an array of discovery category objects that can be used when editing
 * guilds.
 *
 * @endpoint GET `/discovery/categories`
 */
export interface ListDiscoveryCategories {
	response: DiscoveryCategory[];
}

/**
 * Checks if a discovery search term is valid.
 *
 * @endpoint GET `/discovery/valid-term`
 */
export interface ValidateDiscoverySearchTerm {
	body: {
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
