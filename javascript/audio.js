const speaker = document.querySelector(".speaker");

let speakerStatus = "on"; // default is on

class SoundEffect extends Audio {
  constructor(fileName, volum = 0.5) {
    super();

    this.src = fileName;
    this.volume = speakerStatus === "on" ? volum : 0;
  }
}

const handleSpeaker = () => {
  speakerStatus = speakerStatus === "on" ? "off" : "on";
  speaker.src = `./images/speaker-${speakerStatus}.svg`;
  storage.setItem("speaker-status", speakerStatus);
};

const initSpeaker = () => {
  const statusInStorage = storage.getItem("speaker-status");
  speakerStatus = statusInStorage ?? "on";

  speaker.src = `./images/speaker-${speakerStatus}.svg`;
  speaker.addEventListener("click", handleSpeaker);
};

document.addEventListener("DOMContentLoaded", initSpeaker);
