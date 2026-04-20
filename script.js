const songs = [
  { title: "Booga", artist: "Central Cee", src: "audios/booga.mp3", img: "covers/booga.jpg" },
  { title: "La Mudanza", artist: "Bad Bunny", src: "audios/la-mudanza.mp3" },
  { title: "See you again", artist: "Wiz Khalifa", src: "audios/see-you-again.mp3" },
];

const playlist = document.getElementById("playlist");
const player = document.getElementById("player");

//dynamic loop
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} — ${song.artist}`;
  li.addEventListener("click", () => loadSong(index));
  playlist.appendChild(li);
});

function loadSong(index) {
  const song = songs[index];
  player.src = song.src;
  player.play();
}