import type { VoiceRegion } from '../../';

/**
 * Returns an array of voice region objects that can be used when creating
 * servers.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/voice#list-voice-regions) `/voice/regions`
 */
export interface ListVoiceRegions {
	response: VoiceRegion[];
}
