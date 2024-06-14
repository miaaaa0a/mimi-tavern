const API_KEY = import.meta.env.PRIVATE_API_KEY;

async function fetchTopArtists(username, token) {
    if (!username) {
      alert("Put in your username!");
      return;
    }
    if (!token) {
      alert('Connect to last.fm first!');
      return;
    }
    
    try {
      const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&period=7day&api_key=${API_KEY}&format=json&user=${username}&token=${token}`);
      const data = await response.json();
      var topartists = data.topartists.artist.map(artist => artist.name);
      var artistinfo = [];
      topartists.length = 5;
      for (var i = 0; i < 5; i++) {
        var artistresponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${topartists[i]}&api_key=${API_KEY}&format=json`);
        const artistdata = await artistresponse.json();
        const artistsummary = artistdata.artist.bio.summary.replace(/<[^>]*>/g, '').replace("Read more on Last.fm", '');
  
        artistinfo.push([topartists[i], artistsummary, artistdata.artist.tags.tag.map(tag => tag.name)]);
      }
      return artistinfo;
    } catch (error) {
      console.error('Error fetching top artists:', error);
    }
}


export async function GET({params}) {
    const response = fetchTopArtists(params.username, params.token);
    return new Response(JSON.stringify(response));
}