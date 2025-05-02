function showGiftPopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("hidden");
  popup.classList.add("popup-show");

  // Скрыть подарок через 3 секунды
  setTimeout(() => {
    popup.classList.remove("popup-show");
    popup.classList.add("hidden");
  }, 3000);
}
