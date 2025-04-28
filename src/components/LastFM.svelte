<script>
    import { onMount } from 'svelte'

    let response = $state({
        now_playing: {
            name: "Exampler",
            artist: {
                name: "The Examples"
            }
        },
        scrobbles: [
            {
                image: [
                    {
                        url: "https://files.catbox.moe/tv7080.gif"
                    }
                ],
                artist: {
                    name: "The Examples"
                },
                name: "Exampler",
                dateAdded: "apr 20th, 2025"
            }
        ]
    });
    let songTitle = $state('The Examples');
    let songArtist = $state('Exampler');
    let scrobbleDate = $state('...');
    let spinnyCD = $state('https://files.catbox.moe/tv7080.gif');
    let isLoaded = $state(false);

    function main() {
        fetch("/api/lastfm")
        .then(async function (request) {
            response = await request.json();

            songTitle = response.now_playing.name;
            songArtist = response.now_playing.artist.name;
            if (response.now_playing.dateAdded) {
                scrobbleDate = convertDate(response.now_playing.dateAdded);
            }
            spinnyCD = response.now_playing.image.at(-1).url;

            isLoaded = true;
            document.dispatchEvent(new CustomEvent('componentLoaded'));
        })
        .catch(function (error) {
            console.error('error during api request: ', error);
            isLoaded = true;
            document.dispatchEvent(new CustomEvent('componentLoaded'));
        });
    }

    function truncateName(name) {
        if (name.length < 25) {
            return name
        } else {
            return name.substring(0, 25) + '...'
        }
    }

    function convertDate(date) {
        let timestamp = new Date(date);
        return timestamp.toLocaleString();
    }

    onMount(() => {
        main();
        console.log("meow");
    });
</script>

<div class="lastfm" data-waits-for-load="true" data-is-loaded={isLoaded}>
    <div class="player">
        <img src={spinnyCD} class="spinnycd" alt="Album cover for now playing">
        <p class="songtitle">{songTitle}</p>
        <p class="songartist">{songArtist}</p>
        <a class="lastfmprofile" href="https://www.last.fm/user/redoverflow">my <span style="color: rgb(213, 16, 7);">last.fm</span> profile</a>
        <p class="nowplayingdate">scrobbled on {scrobbleDate}</p>
    </div>
    <div class="latestscrobbles">
        {#each response.scrobbles as s}
        <div class="scrobble">
            <div class="scrobbleleft">
                <img src={s.image.at(-1).url} class="scrobblecover" alt="Album cover for a scrobble">
                <p class="scrobbleartist">{s.artist.name}</p>
                <p class="scrobbletitle">{truncateName(s.name)}</p>
            </div>
            <div class="scrobbleright">
                <p class="scrobbledate">{convertDate(s.dateAdded)}</p>
            </div>
        </div>
        {/each}
    </div>
</div>