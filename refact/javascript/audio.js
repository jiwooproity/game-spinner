class Audio {
  constructor(fileName) {
    this.audio = document.createElement("audio");
    this.audio.src = fileName;
    this.audio.volume = 1;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }
}
