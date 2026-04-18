let selectedService = "";

/* 日期限制 */
window.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;
});

/* 顯示 step */
function showStep(id) {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

/* 選服務 */
function selectService(el) {
  document.querySelectorAll('.service').forEach(s => s.classList.remove('active'));
  el.classList.add('active');

  selectedService = el.innerText;

  showStep("step2");
}

/* 前往 Step3（跳頁） */
function goToStep3() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const people = document.getElementById("people").value;

  if (!name || !phone || !date || !people) {
    alert("請完整填寫資料");
    return;
  }

  const bookingData = {
    name,
    phone,
    date,
    people,
    service: selectedService
  };

  localStorage.setItem("tempBooking", JSON.stringify(bookingData));

  window.location.href = "time.html";
}
