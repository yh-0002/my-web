let selectedService = localStorage.getItem("service") || "";
let selectedTime = "";

/* ========== Step 1 → Step 2 ========== */
function selectService(el) {
  document.querySelectorAll('.service').forEach(s => s.classList.remove('active'));
  el.classList.add('active');

  selectedService = el.innerText;
  localStorage.setItem("service", selectedService);
}

/* ========== 下一步（跳 Step 3 頁） ========== */
function goToStep3() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const people = document.getElementById("people").value;

  if (!selectedService) return alert("請選服務");
  if (!name || !phone || !date || !people) {
    alert("請完整填寫資料");
    return;
  }

  const bookingTemp = {
    name,
    phone,
    date,
    people,
    service: selectedService
  };

  localStorage.setItem("bookingTemp", JSON.stringify(bookingTemp));

  window.location.href = "step3.html";
}

/* ========== 選時段 ========== */
function selectTime(el) {
  document.querySelectorAll('.time').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  selectedTime = el.innerText;
}

/* ========== 提交 ========== */
function submitBooking() {
  const temp = JSON.parse(localStorage.getItem("bookingTemp"));

  if (!temp) return alert("資料遺失，請重新填寫");
  if (!selectedTime) return alert("請選時段");

  const bookingData = {
    ...temp,
    time: selectedTime,
    id: "SR" + Date.now()
  };

  localStorage.setItem("booking", JSON.stringify(bookingData));

  window.location.href = "success.html";
}
