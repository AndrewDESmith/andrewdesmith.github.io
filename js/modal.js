const modalbg = document.getElementById("modal-bg");
const imageSwitches = document.querySelectorAll(".image-switch");
const modalBox = document.getElementById("modal-box");
const modalClose = document.getElementById("modal-close");

modalbg.addEventListener("click", function () {
  console.log("modalbg clicked!");
  modalBox.classList.add("hidden");
  modalbg.classList.add("hidden");
});

modalClose.addEventListener("click", function () {
  modalBox.classList.add("hidden");
  modalbg.classList.add("hidden");
});

imageSwitches.forEach((element) => {
  element.addEventListener("click", function () {
    modalBox.classList.remove("hidden");
    modalbg.classList.remove("hidden");
  });
});
