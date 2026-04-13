let selectedService = "";
let selectedTime = "";

const today = new Date().toISOString().split("T")[0];
document.getElementById("date").min = today;

// 選服務
function selectService(el) {
  document.querySelectorAll('.service').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  selectedService = el.innerText;

  showStep("step2");
}

// 顯示步驟
function showStep(id) {
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  el.scrollIntoView({ behavior: "smooth" });

  if (id === "step2") {
    document.getElementById("date").addEventListener("change", () => {
      showStep("step3");
    });
  }
}

// 選時間
function selectTime(el) {
  document.querySelectorAll('.time').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  selectedTime = el.innerText;
}

// ✅ 電話工具（要放外面）
function cleanPhone(phone) {
  return phone.replace(/[^0-9]/g, '').trim();
}

function validatePhone(phone) {
  return /^09\d{8}$/.test(phone);
}

// 驗證
function validateForm(name, phone, date, people) {
  if (name.length < 2) {
    alert("姓名至少2字");
    return false;
  }

  if (!validatePhone(phone)) {
    alert("電話格式錯誤");
    return false;
  }

  if (!date || !people) {
    alert("請填完整資料");
    return false;
  }

  return true;
}

// 提交
function submitBooking() {
  let name = document.getElementById('name').value.trim();
  let rawPhone = document.getElementById('phone').value;
  let phone = cleanPhone(rawPhone);
  let date = document.getElementById('date').value;
  let people = document.getElementById('people').value;

  console.log("原始電話:", rawPhone);
  console.log("清洗後:", phone);

  if (!selectedService || !selectedTime || !validateForm(name, phone, date, people)) {
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

    document.getElementById('success').classList.remove('hidden');
    btn.innerText = "完成";
  }, 800);
}
