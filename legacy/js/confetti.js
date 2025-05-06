const canvas = document.getElementById("confetti");

const jsConfetti = new JSConfetti({ canvas });

const congratulations = () => {
  jsConfetti.addConfetti({
    confettiColors: ["#F1E7E7", "#E69DB8", "#FFD0C7", "#FFFECE", "#E9A5F1", "#C68EFD"],
  });
};
