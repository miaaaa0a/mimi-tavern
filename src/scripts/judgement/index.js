

function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

function connectLastfm() {
    //window.location.href = `https://www.last.fm/api/auth/?api_key=${API_KEY}&cb=http://127.0.0.1:4321/judgement`;
    const response = fetch("/judgement/lastfmauth", { method: "POST" });
    console.log(response);
}

function handleLastfmCallback() {
  const token = new URLSearchParams(window.location.search).get('token');
  if (token) {
    document.cookie = `lastfm_token=${token}; path=/judgement`;
    window.location.href = '/judgement';
  }
}

async function getJudgement(isRoast) {
  const username = document.getElementById("lastfmuser").value;
  const token = getCookie("lastfm_token");
  const topArtists = await fetch("/judgement/topartists.json", {
    body: {
      username: username,
      token: token
    },
    method: "GET"
  });
  if (!topArtists) return;
  console.log(topArtists);
  var artistInfo = [];
  for (var i = 0; i < 5; i++) {
    artistInfo.push(`${i+1}. Artist: "${topArtists[i][0]}"\nArtist summary: "${topArtists[i][1]}"\nArtist genres: ${topArtists[i][2].join(', ')}`);
  }

  const prompt = isRoast
    ? `\n### Instruction:\nRoast the following music taste based on the user's top 5 artists from the past week. Don't be afraid to be rude or to be vulgar. Write atleast 3 paragraphs..\n${artistInfo.join("\n")}\n### Response:\n`
    : `\n### Instruction:\nCompliment the following music taste based on the user's top 5 artists from the past week. Write atleast 3 paragraphs.\n${artistInfo.join("\n")}\n### Response:\n`;

  //const response = await sendPromptToLLM(prompt);
  const response = "we getted";

  document.getElementById('judgement').textContent = response;
}

async function sendPromptToLLM(prompt) {
  //console.log(prompt);
  //return "meowers";
  const params = {
    "params": {
      "n": 1,
      "max_context_length": 1864,
      "max_length": 500,
      "rep_pen": 1.1,
      "temperature": 0.7,
      "top_p": 0.92,
      "top_k": 100,
      "top_a": 0,
      "typical": 1,
      "tfs": 1,
      "rep_pen_range": 320,
      "rep_pen_slope": 0.7,
      "sampler_order": [
        6,
        0,
        1,
        3,
        4,
        2,
        5
      ],
      "use_default_badwordsids": false,
      "stop_sequence": [
        "### Instruction:",
        "### Response:"
      ],
      "min_p": 0,
      "dynatemp_range": 0,
      "dynatemp_exponent": 1,
      "smoothing_factor": 0
    },
    "prompt": prompt
  }
  const generation = await fetch("https://aihorde.net/api/v2/generate/text/async", {
    body: JSON.stringify(params),
    method: "POST",
    headers: {
      "apikey": "0000000000",
      "Content-Type": "application/json"
    }
  });
  var gen_response = await generation.json();
  console.log(gen_response.id);
  if (!gen_response.id) {
    alert("Generation request error! Try again.");
    return;
  }
  var check = await fetch(`https://aihorde.net/api/v2/generate/text/status/${gen_response.id}`, {
    method: "GET",
  });
  var check_data = await check.json();
  while (!check_data.done) {
    check = await fetch(`https://aihorde.net/api/v2/generate/text/status/${gen_response.id}`, {
      method: "GET",
    });
    check_data = await check.json();
    await sleep(2000);
  }
  console.log(check_data.generations[0].text);
  return check_data.generations[0].text;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

document.getElementById('roastbtn').addEventListener('click', () => getJudgement(true));
document.getElementById('complbtn').addEventListener('click', () => getJudgement(false));
document.getElementById('lastfmbtn').addEventListener('click', () => connectLastfm());

if (window.location.search.includes('token')) {
	handleLastfmCallback();
}