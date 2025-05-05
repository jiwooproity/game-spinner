const $confetti = document.getElementById("confetti");
const jsConfetti = new JSConfetti({ $confetti });

const OPTIONS = {
  confettiColors: ["#F1E7E7", "#E69DB8", "#FFD0C7", "#FFFECE", "#E9A5F1", "#C68EFD"],
};

const congratulations = () => {
  jsConfetti.addConfetti(OPTIONS);
  new SoundEffect("audio/congratulations.mp3", 0.1).play();
};
