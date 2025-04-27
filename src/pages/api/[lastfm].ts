export const prerender = false;
import SimpleFM from '@solely/simple-fm';
import { LASTFM_API_KEY, LASTFM_SECRET, LASTFM_USERNAME } from 'astro:env/server';

export async function GET({}) {
    const client = new SimpleFM(LASTFM_API_KEY);

    var tracks = await client.user.getRecentTracks({ username: LASTFM_USERNAME, limit: 26 });
    var now_playing = {};
    var last_scrobbles = [];

    for (var i = 0; i < 26; i++) {
        if (i == 0) {
            now_playing = tracks.tracks[i];
        } else {
            last_scrobbles.push(tracks.tracks[i]);
        }
    }

    return new Response(
        JSON.stringify({
            now_playing: now_playing,
            scrobbles: last_scrobbles
        })
    )
}