//hii ni ya the original for all songs in one folder, wanted to add it for different folders(playlists)

// const songs = [
//   { title: "Booga", artist: "Central Cee", src: "audios/tests/booga.mp3", img: "covers/booga.jpg", duration: "1:50" },
//   { title: "La Mudanza", artist: "Bad Bunny", src: "audios/tests/la-mudanza.mp3", img: "covers/la-mudanza.jpg", duration: "3:35" },
//   { title: "See you again", artist: "Wiz Khalifa", src: "audios/tests/see-you-again.mp3", img: "covers/see-you-again.jpg", duration: "3:00" },
// ];

//change ndio I can see the different folders
const playlistsData = {
    "tests": [
        { title: "Booga", artist: "Central Cee", src: "audios/songs/booga.mp3", img: "covers/booga.jpg", duration: "1:50" },
        { title: "La Mudanza", artist: "Bad Bunny", src: "audios/songs/la-mudanza.mp3", img: "covers/la-mudanza.jpg", duration: "3:35" },
        { title: "See you again", artist: "Wiz Khalifa", src: "audios/songs/see-you-again.mp3", img: "covers/see-you-again.jpg", duration: "3:00" },
    ],
    "mixes": [
        { title: "Apartment Life", artist: "Love Leya", src: "audios/mixes/afro-house.mp3", img: "covers/booga.jpg", duration: "1:50" },
        { title: "Balcony Mix", artist: "Major Leagues Djs", src: "audios/mixes/amapipi.mp3", img: "covers/la-mudanza.jpg", duration: "3:35" },
        { title: "Tiny Desk", artist: "Odeal", src: "audios/mixes/Odeal.mp3", img: "covers/see-you-again.jpg", duration: "3:00" },
        { title: "Late Night R&B", artist: "Rando DJ", src: "audios/mixes/R&B.mp3", img: "covers/see-you-again.jpg", duration: "3:00" },
        { title: "Tems Mix", artist: "Tems", src: "audios/mixes/tems.mp3", img: "covers/see-you-again.jpg", duration: "3:00" },
    ]
};

const playlist = document.getElementById("playlist");
const player = document.getElementById("player");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

// let currentSongs = songs;   // your songs array
// let currentIndex = 0;

const playlistsContainer = document.getElementById("playlists");

Object.keys(playlistsData).forEach((playlistName) => {
  const li = document.createElement("li");
  li.textContent = playlistName;

  li.addEventListener("click", () => loadPlaylist(playlistName));

  playlistsContainer.appendChild(li);
});

function loadPlaylist(name) {
  const songs = playlistsData[name];

  playlist.innerHTML = ""; // clear old songs
  songItems.length = 0;    // reset tracking array

  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} — ${song.artist}`;

    li.addEventListener("click", () => loadSong(index, songs));

    playlist.appendChild(li);
    songItems.push(li);
  });
}

let songItems = [];

function loadSong(index, songs = currentSongs) {
  currentSongs = songs;
  const song = songs[index];

  player.src = song.src;
  player.play();

  cover.src = song.img;
  title.textContent = `${song.title} — ${song.artist}`;

  songItems.forEach(item => item.classList.remove("active-song"));
  songItems[index].classList.add("active-song");
}

//also the old code

//dynamic loop
// songs.forEach((song, index) => {
//   const li = document.createElement("li");
//   li.textContent = `${song.title} — ${song.artist} (${song.duration})`;
//   li.addEventListener("click", () => loadSong(index));
//   playlist.appendChild(li);
// });

// function loadSong(index) {
//   const song = songs[index];
//   player.src = song.src;
//   player.play();

//   cover.src = song.img;
//   title.textContent = `${song.title} — ${song.artist}`;
// }

playBtn.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    playBtn.textContent = "⏸";
  } else {
    player.pause();
    playBtn.textContent = "▶";
  }
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentSongs.length;
  loadSong(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentSongs.length) % currentSongs.length;
  loadSong(currentIndex);
});

player.addEventListener("ended", () => {
  nextBtn.click();
});

player.addEventListener("timeupdate", () => {
  const percent = (player.currentTime / player.duration) * 100;
  progress.value = percent;

  currentTimeEl.textContent = formatTime(player.currentTime);
  durationEl.textContent = formatTime(player.duration);
});

progress.addEventListener("input", () => {
  player.currentTime = (progress.value / 100) * player.duration;
});

volume.addEventListener("input", () => {
  player.volume = volume.value;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

document.addEventListener("keydown", (e) => {
  // prevent space from scrolling page
  if (e.target.tagName === "INPUT") return;

  switch (e.code) {

    case "Space":
      e.preventDefault();
      playBtn.click();
      break;

    case "ArrowRight":
      // skip forward 5 seconds
      player.currentTime += 5;
      break;

    case "ArrowLeft":
      // rewind 5 seconds
      player.currentTime -= 5;
      break;

    case "ArrowUp":
      // increase volume
      player.volume = Math.min(player.volume + 0.2, 1);
      volume.value = player.volume;
      break;

    case "ArrowDown":
      // decrease volume
      player.volume = Math.max(player.volume - 0.2, 0);
      volume.value = player.volume;
      break;

    case "KeyM":
      // mute toggle
      volumeIcon.click();
      break;

    case "KeyN":
      nextBtn.click();
      break;

    case "KeyP":
      prevBtn.click();
      break;
  }
});