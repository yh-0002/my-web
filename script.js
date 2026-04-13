
let selectedService = "";
let selectedTime = "";

/* ========== 日期限制 ========== */
const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateInput.min = today;

/* ========== Step 控制 ========== */
function showStep(id) {
  const el = document.getElementById(id);
  el.classList.remove("hidden");
  el.scrollIntoView({ behavior: "smooth" });
}

/* ========== Step 2 → Step 3（安全版） ========== */
function goToStep3() {
  const date = document.getElementById("date").value;

  if (!date) {
    alert("請先選擇預約日期");
    return;
  }

  showStep("step3");
}

/* ========== 選服務 ========== */
function selectService(el) {
  document.querySelectorAll('.service').forEach(s => s.classList.remove('active'));
  el.classList.add('active');

  selectedService = el.innerText;

  showStep("step2");
}

/* ========== 選時間 ========== */
function selectTime(el) {
  document.querySelectorAll('.time').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  selectedTime = el.innerText;
}

/* ========== 電話工具 ========== */
function cleanPhone(phone) {
  return phone.replace(/[^0-9]/g, '').trim();
}

function validatePhone(phone) {
  return /^09\d{8}$/.test(phone);
}

/* ========== 驗證 ========== */
function validateForm(name, phone, date, people) {
  if (!selectedService) {
    alert("請選擇服務");
    return false;
  }

  if (name.length < 2) {
    alert("姓名至少2字");
    return false;
  }

  if (!validatePhone(phone)) {
    alert("電話格式錯誤（09xxxxxxxx）");
    return false;
  }

  if (!date) {
    alert("請選擇日期");
    return false;
  }

  if (!people) {
    alert("請選擇人數");
    return false;
  }

  return true;
}

/* ========== 提交 ========== */
function submitBooking() {
  let name = document.getElementById('name').value.trim();
  let rawPhone = document.getElementById('phone').value;
  let phone = cleanPhone(rawPhone);
  let date = document.getElementById('date').value;
  let people = document.getElementById('people').value;

  if (!selectedTime) {
    alert("請選擇時段");
    return;
  }

  if (!validateForm(name, phone, date, people)) {
    return;
  }

  const btn = document.querySelector("button");
  btn.innerText = "預約中...";
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('result').innerHTML = `
      姓名：${name}<br>
      電話：${phone}<br>
      服務：${selectedService}<br>
      人數：${people}<br>
      日期：${date}<br>
      時間：${selectedTime}
    `;

    document.getElementById('success').classList.remove("hidden");
    btn.innerText = "完成";
  }, 800);
}
