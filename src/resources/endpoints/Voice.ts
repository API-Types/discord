import type { VoiceRegion } from '../../';

/**
 * Returns an array of voice region objects that can be used when setting a
 * voice or stage channel's `rtc_region`.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/voice#list-voice-regions) `/voice/regions`
 */
export interface ListVoiceRegions {
	response: VoiceRegion[];
}
