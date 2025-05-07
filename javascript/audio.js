const speaker = document.querySelector(".speaker");

let speakerStatus = true; // default is on

class SoundEffect extends Audio {
  constructor(fileName, volum = 0.5) {
    super();

    this.src = fileName;
    this.volume = speakerStatus ? volum : 0;
  }
}

const handleSpeaker = () => {
  speaker.src = `./images/speaker-${speakerStatus ? "off" : "on"}.svg`;
  storage.setItem("speaker-status", "true");
  speakerStatus = !speakerStatus;
};

const initSpeaker = () => {
  speakerStatus = storage.getItem("speaker-status", "boolean") ?? true;
  speaker.src = `./images/speaker-${speakerStatus ? "on" : "off"}.svg`;
  speaker.addEventListener("click", handleSpeaker);
};

document.addEventListener("DOMContentLoaded", initSpeaker);
