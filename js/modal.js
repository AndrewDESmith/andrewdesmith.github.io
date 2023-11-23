const modalbg = document.getElementById("modal-bg");
const imageSwitches = document.querySelectorAll(".image-switch");
const modalBox = document.getElementById("modal-box");
const modalClose = document.getElementById("modal-close");
const carousel3Label = document.getElementById("carousel-3-label");
const carousel2Label = document.getElementById("carousel-2-label");
let currentModalImage = document.getElementById("current-modal-image");
let currentImageFileName;

imageSwitches.forEach((imageSwitch) => {
  openModalFrom(imageSwitch);
});

function imageFileNameFrom(imageSwitch) {
  let imageFileName = imageSwitch.src.split("/screenshots/")[1];
  imageFileName = imageFileName.replaceAll("%20", " ");
  return imageFileName;
}

function previousImageFileFrom(imageFileName) {
  switch (imageFileName) {
    case "better-file-review-status/Data Analyst Portal Ready for Dismissal.png":
      return "better-file-review-status/Expanded Email Inbox File Review Statuses.png";
      break;
    case "better-file-review-status/Expanded Email Inbox File Review Statuses.png":
      return "better-file-review-status/Data Analyst Portal Ready for Dismissal.png";
      break;
    case "job-ad-builder/Job Ad Builder Search Snippets.png":
      return "job-ad-builder/Job Ad Builder Search Snippets.png";
      break;
    case "facebook-jobs-api/Facebook Job Posting Censored.png":
      return "facebook-jobs-api/Facebook Jobs Application Modal.png";
      break;
    case "facebook-jobs-api/Facebook Jobs Application Modal.png":
      return "facebook-jobs-api/Facebook Job Posting Censored.png";
      break;
    default:
      console.log(
        `Check your case statements for the imageFileName of ${imageFileName}.`
      );
  }
}

function nextImageFileFrom(imageFileName) {
  switch (imageFileName) {
    case "better-file-review-status/Data Analyst Portal Ready for Dismissal.png":
      return "better-file-review-status/Expanded Email Inbox File Review Statuses.png";
      break;
    case "better-file-review-status/Expanded Email Inbox File Review Statuses.png":
      return "better-file-review-status/Data Analyst Portal Ready for Dismissal.png";
      break;
    case "job-ad-builder/Job Ad Builder Search Snippets.png":
      return "job-ad-builder/Job Ad Builder Search Snippets.png";
      break;
    case "facebook-jobs-api/Facebook Job Posting Censored.png":
      return "facebook-jobs-api/Facebook Jobs Application Modal.png";
      break;
    case "facebook-jobs-api/Facebook Jobs Application Modal.png":
      return "facebook-jobs-api/Facebook Job Posting Censored.png";
      break;
    default:
      console.log(
        `Check your case statements for the imageFileName of ${imageFileName}.`
      );
  }
}

// Incrementally increase an element's opacity.
function fadeIn(element, duration = 750) {
  element.style.display = "";
  element.style.opacity = 0;
  let last = +new Date();
  let tick = function () {
    element.style.opacity =
      +element.style.opacity + (new Date() - last) / duration;
    last = +new Date();
    if (element.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };
  tick();
}

function advanceCarousel() {
  let nextImageFileName = nextImageFileFrom(currentImageFileName);
  console.log("nextImageFileName", nextImageFileName);
  currentModalImage.src = `images/screenshots/${nextImageFileName}`;
  fadeIn(currentModalImage);
  setCaptionTextFrom(nextImageFileName);
  currentImageFileName = nextImageFileName;
}

function reverseCarousel() {
  let previousImageFileName = previousImageFileFrom(currentImageFileName);
  console.log("previousImageFileName", previousImageFileName);
  currentModalImage.src = `images/screenshots/${previousImageFileName}`;
  fadeIn(currentModalImage);
  setCaptionTextFrom(previousImageFileName);
  currentImageFileName = previousImageFileName;
}

// Left arrow in carousel
carousel3Label.addEventListener("click", function (event) {
  reverseCarousel();
});

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowLeft" && !modalBox.classList.contains("hidden")) {
    reverseCarousel();
  }
});

// Right arrow in carousel
carousel2Label.addEventListener("click", function () {
  advanceCarousel();
});

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight" && !modalBox.classList.contains("hidden")) {
    advanceCarousel();
  }
});

function openModalFrom(imageSwitch) {
  imageSwitch.addEventListener("click", function () {
    modalBox.classList.remove("hidden");
    modalBox.classList.remove("animate-fade-out-modal");
    modalbg.classList.remove("hidden");
    currentModalImage.src = imageSwitch.src;
    currentImageFileName = imageFileNameFrom(imageSwitch);
    setCaptionTextFrom(currentImageFileName);
  });

  closeModal();
}

function closeModal() {
  modalbg.addEventListener("click", function () {
    modalBox.classList.add("animate-fade-out-modal");
    setTimeout(() => {
      modalBox.classList.add("hidden");
      modalbg.classList.add("hidden");
    }, 750);
  });

  modalClose.addEventListener("click", function () {
    modalBox.classList.add("animate-fade-out-modal");
    setTimeout(() => {
      modalBox.classList.add("hidden");
      modalbg.classList.add("hidden");
    }, 750);
  });
}

function setCaptionTextFrom(imageFileName) {
  let captionText = document.getElementById("caption-text");

  switch (imageFileName) {
    case "job-ad-builder/Job Ad Builder Search Snippets.png":
      captionText.textContent = "(1 of 1) Job Ad Builder shown...";
      break;
    case "facebook-jobs-api/Facebook Job Posting Censored.png":
      captionText.textContent = "(1 of 2) Facebook Jobs API example posting.";
      break;
    case "facebook-jobs-api/Facebook Jobs Application Modal.png":
      captionText.textContent = "(2 of 2) Facebook Jobs API modal...";
      break;
    case "better-file-review-status/Expanded Email Inbox File Review Statuses.png":
      captionText.textContent = "(1 of 2) Better file review status...";
      break;
    case "better-file-review-status/Data Analyst Portal Ready for Dismissal.png":
      captionText.textContent = "(2 of 2) Better file review status...";
      break;
    case "sentiment-analysis/Sentiment Analysis Censored.png":
      captionText.textContent = "(1 of 1) Sentiment analysis...";
      break;
    case "interactor-interface/Interactor Interface Code.png":
      captionText.textContent = "(1 of 1) Custom loggin interface...";
      break;
    case "job-apps-psychometric-tests/Psychometric and Environmental Fit Scales.png":
      captionText.textContent =
        "1 of 3 Job applications psychometric revamp...";
      break;
    default:
      console.log(
        `The image file name of ${imageFileName} does not match the imageSwitch source value.`
      );
  }

  fadeIn(captionText);
}
