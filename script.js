const songs = [
  { title: "Booga", artist: "Central Cee", src: "audios/booga.mp3", img: "covers/booga.jpg", duration: "1:50" },
  { title: "La Mudanza", artist: "Bad Bunny", src: "audios/la-mudanza.mp3", img: "covers/la-mudanza.jpg", duration: "3:35" },
  { title: "See you again", artist: "Wiz Khalifa", src: "audios/see-you-again.mp3", img: "covers/see-you-again.jpg", duration: "3:00" },
];

const playlist = document.getElementById("playlist");
const player = document.getElementById("player");
const cover = document.getElementById("cover");
const title = document.getElementById("title");

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