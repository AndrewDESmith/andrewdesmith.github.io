const modalBg = document.getElementById("modal-bg");
const imageSwitches = document.querySelectorAll(".image-switch");
const modalBox = document.getElementById("modal-box");
const modalClose = document.getElementById("modal-close");
const previousImageLabel = document.getElementById("previous-image-label");
const nextImageLabel = document.getElementById("next-image-label");
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
    case "interactor-interface/Interactor Interface Code.png":
      return "interactor-interface/Interactor Interface Code.png";
      break;
    case "sentiment-analysis/Sentiment Analysis Censored.png":
      return "sentiment-analysis/Sentiment Analysis Censored.png";
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
    case "job-apps-psychometric-tests/Purpose and Meaning Psych Questions.png":
      return "job-apps-psychometric-tests/Purpose and Meaning Psychometric Report.png";
      break;
    case "job-apps-psychometric-tests/Psychometric and Environmental Fit Scales.png":
      return "job-apps-psychometric-tests/Purpose and Meaning Psych Questions.png";
      break;
    case "job-apps-psychometric-tests/Purpose and Meaning Psychometric Report.png":
      return "job-apps-psychometric-tests/Psychometric and Environmental Fit Scales.png";
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
    case "interactor-interface/Interactor Interface Code.png":
      return "interactor-interface/Interactor Interface Code.png";
      break;
    case "sentiment-analysis/Sentiment Analysis Censored.png":
      return "sentiment-analysis/Sentiment Analysis Censored.png";
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
    case "job-apps-psychometric-tests/Purpose and Meaning Psych Questions.png":
      return "job-apps-psychometric-tests/Psychometric and Environmental Fit Scales.png";
      break;
    case "job-apps-psychometric-tests/Psychometric and Environmental Fit Scales.png":
      return "job-apps-psychometric-tests/Purpose and Meaning Psychometric Report.png";
      break;
    case "job-apps-psychometric-tests/Purpose and Meaning Psychometric Report.png":
      return "job-apps-psychometric-tests/Purpose and Meaning Psych Questions.png";
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
  currentModalImage.src = `images/screenshots/${nextImageFileName}`;
  fadeIn(currentModalImage);
  setCaptionTextFrom(nextImageFileName);
  currentImageFileName = nextImageFileName;
}

function reverseCarousel() {
  let previousImageFileName = previousImageFileFrom(currentImageFileName);
  currentModalImage.src = `images/screenshots/${previousImageFileName}`;
  fadeIn(currentModalImage);
  setCaptionTextFrom(previousImageFileName);
  currentImageFileName = previousImageFileName;
}

// Left arrow in carousel
previousImageLabel.addEventListener("click", function (event) {
  reverseCarousel();
});

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowLeft" && !modalBox.classList.contains("hidden")) {
    reverseCarousel();
  }
});

// Right arrow in carousel
nextImageLabel.addEventListener("click", function () {
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
    modalBg.classList.remove("hidden");
    currentModalImage.src = imageSwitch.src;
    currentImageFileName = imageFileNameFrom(imageSwitch);
    setCaptionTextFrom(currentImageFileName);
  });

  closeModal();
}

function closeModal() {
  modalBg.addEventListener("click", function () {
    modalBox.classList.add("animate-fade-out-modal");
    setTimeout(() => {
      modalBox.classList.add("hidden");
      modalBg.classList.add("hidden");
    }, 750);
  });

  modalClose.addEventListener("click", function () {
    modalBox.classList.add("animate-fade-out-modal");
    setTimeout(() => {
      modalBox.classList.add("hidden");
      modalBg.classList.add("hidden");
    }, 750);
  });
}

function setCaptionTextFrom(imageFileName) {
  let captionText = document.getElementById("caption-text");

  switch (imageFileName) {
    case "job-ad-builder/Job Ad Builder Search Snippets.png":
      captionText.innerHTML =
        '<span class=\'font-gelasioBold text-ember-400\'>[1 of 1]</span> &nbsp; The job ad builder interface, showing a search of the "snippet" shared library of job ad fragments that the Hiring Success team could edit, delete, or add to; the latter from a separate page. Pressing the "insert" button on the lower right of the entry places the snippet into an in-app rich text editor found under the right tab, allowing rapid assembly and editing of a job ad. Snippets collections are organized under selectable industry categories and sub-categories ("positions"): e.g., Category: Engineering, Position: Civil Engineering. Further, each snippet is a general section of a job ad (e.g., "Culture Profile"). Here, we see all "Culture Profile" snippets with "floral" inside them, belonging to Customer Support & Service, Retail Customer Service positions.';
      break;
    case "facebook-jobs-api/Facebook Job Posting Censored.png":
      captionText.innerHTML =
        "<span class='font-gelasioBold text-ember-400'>[1 of 2]</span> &nbsp; A posting on the Facebook Jobs, supplied by daily syncronization with the Fitzii hiring software application.";
      break;
    case "facebook-jobs-api/Facebook Jobs Application Modal.png":
      captionText.innerHTML =
        "<span class='font-gelasioBold text-ember-400'>[2 of 2]</span> &nbsp; A candidate hitting \"apply\" on Facebook Jobs sees this modal. Job application questions are supplied from the backend of the Fitzii hiring software application. Once the candidate submits their job application, a webhook in Fitzii receives and processes the submission.";
      break;
    case "better-file-review-status/Expanded Email Inbox File Review Statuses.png":
      captionText.innerHTML =
        "<span class='font-gelasioBold text-ember-400'>[1 of 2]</span> &nbsp; Uploaded file processing status view within a client's in-app e-mail inbox. Here, all files associated with a particular real estate deal are grouped by back-office processing status. Highlighted is a submitted file's dismissal reason.";
      break;
    case "better-file-review-status/Data Analyst Portal Ready for Dismissal.png":
      captionText.innerHTML =
        "<span class='font-gelasioBold text-ember-400'>[2 of 2]</span> &nbsp; &nbsp; Refined graphical interface for the back-office data team.  Highlighted is where a data team member could classify the type of user submitted file and any reasons for declining to process a file (dismissal).";
      break;
    case "sentiment-analysis/Sentiment Analysis Censored.png":
      captionText.innerHTML =
        "<span class='font-gelasioBold text-ember-400'>[1 of 1]</span> &nbsp; In-app view of automated sales campaign messages and prospect replies. Hightlighted in the center is the most recent reply, with auto-assigned sentiment. The right toolbar's highlight shows the current sentiment, which may be manually overridden by a user.";
      break;
    case "interactor-interface/Interactor Interface Code.png":
      captionText.innerHTML =
        '<span class=\'font-gelasioBold text-ember-400\'>[1 of 1]</span> &nbsp; Code for custom logging interface for large interactor objects, to assist in debugging. Developers that wish to log only important information such as a user\'s ID could pass the interactor object (the "context") and the desired ("whitelisted") attributes.';
      break;
    case "job-apps-psychometric-tests/Purpose and Meaning Psych Questions.png":
      captionText.innerHTML =
        "<span class='font-gelasioBold text-ember-400'>[1 of 3]</span> &nbsp; The psychometric section of a job application. This section was enhanced from a previous version, designed to focus the applicant's attention more fully on a single question at a time, while showing them their progress through the variable length assessments.";
      break;
    case "job-apps-psychometric-tests/Psychometric and Environmental Fit Scales.png":
      captionText.innerHTML =
        "<span class='font-gelasioBold text-ember-400'>[2 of 3]</span> &nbsp; The psychometric and environmental fit scales, following the job applicant's completion of the psychometric assessment. Employer-determined ranges for various areas are shown as gray horizontal shaded areas of each scale, with the applicant's score in each area shown as a black or red vertical bar. Overall applicant fit is shown in the mini-scale at the top left.";
      break;
    case "job-apps-psychometric-tests/Purpose and Meaning Psychometric Report.png":
      captionText.innerHTML =
        "<span class='font-gelasioBold text-ember-400'>[3 of 3]</span> &nbsp; Generated report summarizing six areas of traits, based on the job applicant's results in the posting's psychometric assessment.";
      break;
    default:
      console.log(
        `The image file name of ${imageFileName} does not match the imageSwitch source value.`
      );
  }

  fadeIn(captionText);
}
