const songs = [
  { title: "Booga", artist: "Central Cee", src: "audios/booga.mp3", img: "covers/booga.jpg", duration: "1:50" },
  { title: "La Mudanza", artist: "Bad Bunny", src: "audios/la-mudanza.mp3", img: "covers/la-mudanza.jpg", duration: "3:35" },
  { title: "See you again", artist: "Wiz Khalifa", src: "audios/see-you-again.mp3", img: "covers/see-you-again.jpg", duration: "3:00" },
];

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

let currentSongs = songs;   // your songs array
let currentIndex = 0;

//dynamic loop
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} — ${song.artist} (${song.duration})`;
  li.addEventListener("click", () => loadSong(index));
  playlist.appendChild(li);
});

function loadSong(index) {
  const song = songs[index];
  player.src = song.src;
  player.play();

  cover.src = song.img;
  title.textContent = `${song.title} — ${song.artist}`;
}

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