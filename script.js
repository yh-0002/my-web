let selectedService = "";
let selectedTime = "";

/* ===== 初始化 ===== */
document.addEventListener("DOMContentLoaded", () => {

  // 日期限制
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }

  // time.html 防呆
  if (location.pathname.includes("time.html")) {
    const raw = localStorage.getItem("booking_temp");

    if (!raw) {
      alert("請先填寫資料");
      location.href = "index.html";
      return;
    }

    const data = JSON.parse(raw);
    const title = document.getElementById("title");

    if (title) {
      title.innerText += `（${data.date}）`;
    }
  }

  // success.html 顯示
  if (location.pathname.includes("success.html")) {
    const raw = localStorage.getItem("booking");
    const box = document.getElementById("result");

    if (!raw) {
      box.innerHTML = "查無訂位資料";
      return;
    }

    const data = JSON.parse(raw);

    const fields = [
      ["姓名", data.name],
      ["電話", data.phone],
      ["服務", data.service],
      ["人數", data.people],
      ["日期", data.date],
      ["時間", data.time]
    ];

    fields.forEach(([k, v]) => {
      const p = document.createElement("p");
      p.textContent = `${k}：${v}`;
      box.appendChild(p);
    });

    // 清掉單筆資料（避免刷新重複）
    localStorage.removeItem("booking");
  }
});

/* ===== Step1 ===== */
function selectService(el) {
  document.querySelectorAll(".service").forEach(s => s.classList.remove("active"));
  el.classList.add("active");
  selectedService = el.innerText;

  document.getElementById("step2").classList.remove("hidden");
}

/* ===== Step2 → Step3 ===== */
function goToStep3() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const people = document.getElementById("people").value;

  if (!selectedService) return alert("請選擇服務");
  if (!name || !phone || !date || !people) return alert("請填寫完整資料");

  const data = {
    name,
    phone,
    date,
    people,
    service: selectedService
  };

  localStorage.setItem("booking_temp", JSON.stringify(data));

  location.href = "time.html";
}

/* ===== Step3 ===== */
function selectTime(el) {
  document.querySelectorAll(".time").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
  selectedTime = el.innerText;
}

function submitBooking() {
  const raw = localStorage.getItem("booking_temp");
  if (!raw) {
    alert("資料遺失");
    location.href = "index.html";
    return;
  }

  if (!selectedTime) {
    alert("請選擇時段");
    return;
  }

  const data = JSON.parse(raw);
  data.time = selectedTime;

  localStorage.setItem("booking", JSON.stringify(data));
  localStorage.removeItem("booking_temp");

  location.href = "success.html";
}

/* ===== 返回首頁 ===== */
function goHome() {
  location.href = "index.html";
}
