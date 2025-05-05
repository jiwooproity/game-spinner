class SoundEffect extends Audio {
  constructor(fileName, volum = 0.5) {
    super();

    this.src = fileName;
    this.volume = volum;
  }
}
