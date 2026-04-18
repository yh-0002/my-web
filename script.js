
let selectedService = "";
let selectedTime = "";

/* ========== 日期限制 ========== */
const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateInput.min = today;

/* ========== Step 控制 ========== */
function showStep(id) {
  document.getElementById(id).classList.remove("hidden");
}

/* ========== Step2 → Step3（安全控制） ========== */
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

/* ========== 選服務 ========== */
function selectService(el) {
  document.querySelectorAll('.service').forEach(s => s.classList.remove('active'));
  el.classList.add('active');

  selectedService = el.innerText;

  showStep("step2");
}

/* ========== 選時段 ========== */
function selectTime(el) {
  document.querySelectorAll('.time').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  selectedTime = el.innerText;
}

/* ========== 電話清理 ========== */
function cleanPhone(phone) {
  return phone.replace(/[^0-9]/g, '').trim();
}

function validatePhone(phone) {
  return /^09\d{8}$/.test(phone);
}

/* ========== 提交（導向成功頁） ========== */
function submitBooking() {
  let name = document.getElementById('name').value.trim();
  let rawPhone = document.getElementById('phone').value;
  let phone = cleanPhone(rawPhone);
  let date = document.getElementById('date').value;
  let people = document.getElementById('people').value;

  if (!selectedService) return alert("請選服務");
  if (!selectedTime) return alert("請選時段");
  if (name.length < 2) return alert("姓名至少2字");
  if (!validatePhone(phone)) return alert("電話格式錯誤");
  if (!date || !people) return alert("請完整填寫資料");

  const bookingData = {
    name,
    phone,
    service: selectedService,
    people,
    date,
    time: selectedTime
  };

  localStorage.setItem("booking", JSON.stringify(bookingData));

  window.location.href = "success.html";
}
