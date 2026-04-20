const songs = [
  { title: "Booga", artist: "Central Cee", src: "audios/booga.mp3", img: "covers/booga.jpg" },
  { title: "La Mudanza", artist: "Bad Bunny", src: "audios/la-mudanza.mp3", img: "covers/la-mudanza.jpg" },
  { title: "See you again", artist: "Wiz Khalifa", src: "audios/see-you-again.mp3", img: "covers/see-you-again.jpg" },
];

const playlist = document.getElementById("playlist");
const player = document.getElementById("player");
const cover = document.getElementById("cover");
const title = document.getElementById("title");

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

  cover.src = song.img;
    title.textContent = `${song.title} — ${song.artist}`;
}