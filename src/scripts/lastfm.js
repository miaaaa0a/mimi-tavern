async function lastfmmain() {
    let spinnyCd = document.getElementsByClassName("spinnycd")[0];
    let songTitle = document.getElementsByClassName("songtitle")[0];
    let songArtist = document.getElementsByClassName("songartist")[0];
    let scrobbleDate = document.getElementsByClassName("nowplayingdate")[0];
    let latestScrobbles = document.getElementsByClassName("latestscrobbles")[0];

    let apiReq = await fetch("/api/lastfm");
    let lastfmStuff = await apiReq.json();

    songTitle.innerText = lastfmStuff.now_playing.name;
    songArtist.innerText = lastfmStuff.now_playing.artist.name;
    if (lastfmStuff.now_playing.dateAdded) {
        let timestamp = new Date(lastfmStuff.now_playing.dateAdded);
        scrobbleDate.innerText = timestamp.toLocaleString();
    } else {
        scrobbleDate.innerText = "...";
    }
    spinnyCd.src = lastfmStuff.now_playing.image.at(-1).url;

    latestScrobbles.innerHTML = "";
    lastfmStuff.scrobbles.forEach(t => {
        let scrobble = document.createElement("div");
        scrobble.setAttribute("class", "scrobble");


        let scrobbleLeft = document.createElement("div");
        scrobbleLeft.setAttribute("class", "scrobbleleft");

        let cover = document.createElement("img"); 
        cover.setAttribute("src", t.image.at(-1).url);
        cover.setAttribute("class", "scrobblecover");

        let artist = document.createElement("p");
        artist.setAttribute("class", "scrobbleartist");
        artist.innerText = t.artist.name;

        let track = document.createElement("p");
        track.setAttribute("class", "scrobbletitle");
        if (t.name.length < 25) {
            track.innerText = t.name;
        } else {
            track.innerText = t.name.substring(0, 25) + '...'
        }


        let scrobbleRight = document.createElement("div");
        scrobbleRight.setAttribute("class", "scrobbleRight");

        let date = document.createElement("p");
        let scrobbleTimestamp = new Date(t.dateAdded);
        date.setAttribute("class", "scrobbledate");
        date.innerText = scrobbleTimestamp.toLocaleString();

        scrobbleLeft.append(cover, artist, track);
        scrobbleRight.appendChild(date);
        scrobble.append(scrobbleLeft, scrobbleRight);
        latestScrobbles.appendChild(scrobble);
    });
}

export { lastfmmain };