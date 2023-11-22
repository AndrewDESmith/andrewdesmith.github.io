const modalbg = document.getElementById("modal-bg");
const imageSwitches = document.querySelectorAll(".image-switch");
const modalBox = document.getElementById("modal-box");
const modalClose = document.getElementById("modal-close");

closeModal();

imageSwitches.forEach((imageSwitch) => {
  openModalFrom(imageSwitch);
});

function openModalFrom(imageSwitch) {
  imageSwitch.addEventListener("click", function () {
    modalBox.classList.remove("hidden");
    modalbg.classList.remove("hidden");
    let currentModalImage = document.getElementById("current-modal-image");
    currentModalImage.src = imageSwitch.src;
    setCaptionTextFrom(imageSwitch);
  });
}

function closeModal() {
  modalbg.addEventListener("click", function () {
    modalBox.classList.add("hidden");
    modalbg.classList.add("hidden");
  });

  modalClose.addEventListener("click", function () {
    modalBox.classList.add("hidden");
    modalbg.classList.add("hidden");
  });
}

function setCaptionTextFrom(imageSwitch) {
  let captionText = document.getElementById("caption-text");
  captionText.textContent = "New value.";

  let imageFileName = imageSwitch.src.split("/screenshots/")[1];
  imageFileName = imageFileName.replaceAll("%20", " ");

  console.log("imageFileName", imageFileName);

  switch (imageFileName) {
    case "job-ad-builder/Job Ad Builder Search Snippets.png":
      captionText.textContent = "Job Ad Builder shown...";
      break;
    case "facebook-jobs-api/Facebook Job Posting Censored.png":
      captionText.textContent = "Facebook Job API...";
      break;
    case "better-file-review-status/Expanded Email Inbox File Review Statuses.png":
      captionText.textContent = "Better file review status...";
      break;
    case "sentiment-analysis/Sentiment Analysis Censored.png":
      captionText.textContent = "Sentiment analysis...";
      break;
    case "interactor-interface/Interactor Interface Code.png":
      captionText.textContent = "Custom loggin interface...";
      break;
    case "job-apps-psychometric-tests/Psychometric and Environmental Fit Scales.png":
      captionText.textContent = "Job applications psychometric revamp...";
      break;
    default:
      console.log(
        `The image file name of ${imageFileName} does not match the imageSwitch source value of ${imageSwitch.src}`
      );
  }
}
