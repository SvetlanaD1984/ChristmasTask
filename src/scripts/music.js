const song = document.querySelector(".button-sound");
song.addEventListener("click", toggleAudio);

let isPlaying = true;
let audio = new Audio();
audio.src = "./assets/audio/audio.mp3";

function toggleAudio() {
  if (isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
  isPlaying = !isPlaying;
}
