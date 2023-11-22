const modalbg = document.getElementById("modal-bg");
const imageSwitches = document.querySelectorAll(".image-switch");
const modalBox = document.getElementById("modal-box");
const modalClose = document.getElementById("modal-close");

closeModal();

imageSwitches.forEach((element) => {
  openModal(element);
});

function openModal(element) {
  element.addEventListener("click", function () {
    console.log("element", element);
    modalBox.classList.remove("hidden");
    modalbg.classList.remove("hidden");
    let currentModalImage = document.getElementById("current-modal-image");
    currentModalImage.src = element.src;
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
