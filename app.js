JavaScript

let operations = JSON.parse(localStorage.getItem("snm_operations") || "[]");
let language = "ar";

const translations = {
  ar: {
    title: "مدير الإشعارات الذكي",
    welcome: "مرحباً بك 👋",
    welcomeText: "لوحة التحكم الذكية لإدارة وفرز إشعاراتك المالية",
    income: "إجمالي الوارد",
    expense: "إجمالي الصادر",
    balance: "صافي العمليات",
    count: "عدد العمليات",
    addTitle: "إضافة عملية مالية",
    type: "نوع العملية",
    receive: "استلام أموال",
    pay: "تحويل / دفع",
    amount: "المبلغ",
    sender: "اسم المرسل أو المستلم",
    note: "تفاصيل العملية",
    add: "إضافة العملية",
    history: "سجل العمليات",
    clear: "مسح السجل",
    empty: "لا توجد عمليات حتى الآن",
    settings: "الإعدادات",
    settingsText: "إدارة الإشعارات والحساب الشخصي والتجاري.",
    mode: "نوع الحساب",
    personal: "شخصي",
    business: "تجاري",
    notify: "استقبال الإشعارات",
    status: "يحتاج تفعيل Android",
    name: "الاسم",
    date: "التاريخ",
    currency: "جنيه",
    confirm: "هل تريد مسح جميع العمليات؟",
    error: "الرجاء إدخال مبلغ صحيح أكبر من صفر.",
    success: "تمت إضافة العملية بنجاح",
    direction: "rtl"
  },
  en: {
    title: "Smart Notification Manager",
    welcome: "Welcome 👋",
    welcomeText: "Smart dashboard for managing your financial notifications",
    income: "Total Income",
    expense: "Total Expenses",
    balance: "Net Balance",
    count: "Operations",
    addTitle: "Add Financial Operation",
    type: "Operation Type",
    receive: "Money Received",
    pay: "Transfer / Payment",
    amount: "Amount",
    sender: "Sender or Receiver",
    note: "Operation Details",
    add: "Add Operation",
    history: "Transaction History",
    clear: "Clear History",
    empty: "No operations yet",
    settings: "Settings",
    settingsText: "Manage notifications and account type.",
    mode: "Account Type",
    personal: "Personal",
    business: "Business",
    notify: "Notification Access",
    status: "Requires Android activation",
    name: "Name",
    date: "Date",
    currency: "SDG",
    confirm: "Delete all operations?",
    error: "Enter a valid amount greater than zero.",
    success: "Operation added successfully",
    direction: "ltr"
  }
};

function saveOperations() {
  localStorage.setItem("snm_operations", JSON.stringify(operations));
}

function addOperation() {
  const type = document.getElementById("type").value;
  const amount = Number(document.getElementById("amount").value);
  const person = document.getElementById("person").value.trim();
  const note = document.getElementById("note").value.trim();

  const t = translations[language];

  if (!Number.isFinite(amount) || amount <= 0) {
    alert(t.error);
    return;
  }

  const operation = {
    id: Date.now(),
    type: type,
    amount: amount,
    person: person || "-",
    note: note || "-",
    date: new Date().toLocaleString(
      language === "ar" ? "ar" : "en"
    )
  };

  operations.unshift(operation);
  saveOperations();

  document.getElementById("amount").value = "";
  document.getElementById("person").value = "";
  document.getElementById("note").value = "";

  render();
  alert(t.success);
}

function render() {
  let income = 0;
  let expense = 0;

  operations.forEach(op => {
    if (op.type === "income") {
      income += op.amount;
    } else {
      expense += op.amount;
    }
  });

  document.getElementById("income").textContent =
    income.toLocaleString() + " " + translations[language].currency;

  document.getElementById("expense").textContent =
    expense.toLocaleString() + " " + translations[language].currency;

  document.getElementById("balance").textContent =
    (income - expense).toLocaleString() + " " + translations[language].currency;

  document.getElementById("count").textContent = operations.length;

  const container = document.getElementById("operations");
  container.innerHTML = "";

  if (operations.length === 0) {
    container.textContent = translations[language].empty;
    container.className = "empty";
    return;
  }

  container.className = "";

  operations.forEach(op => {
    const card = document.createElement("div");
    card.className = "operation " +
      (op.type === "expense" ? "expense" : "");

    const title = document.createElement("h3");
    title.textContent =
      (op.type === "income"
        ? translations[language].receive
        : translations[language].pay) +
      " - " + op.person;

    const money = document.createElement("p");
    money.className = "money " +
      (op.type === "income" ? "income-text" : "expense-text");

    money.textContent =
      (op.type === "income" ? "+" : "-") +
      op.amount.toLocaleString() + " " +
      translations[language].currency;

    const details = document.createElement("p");
    details.textContent = op.note;

    const date = document.createElement("p");
    date.textContent = op.date;

    card.append(title, money, details, date);
    container.appendChild(card);
  });
}

function clearOperations() {
  if (confirm(translations[language].confirm)) {
    operations = [];
    saveOperations();
    render();
  }
}

function saveMode() {
  const mode = document.getElementById("accountMode").value;
  localStorage.setItem("snm_mode", mode);
}

function changeLanguage() {
  language = language === "ar" ? "en" : "ar";
  updateLanguage();
  render();
}

function updateLanguage() {
  const t = translations[language];

  document.documentElement.lang = language;
  document.documentElement.dir = t.direction;

  document.getElementById("appTitle").textContent = t.title;
  document.getElementById("welcomeTitle").textContent = t.welcome;
  document.getElementById("welcomeText").textContent = t.welcomeText;
  document.getElementById("incomeLabel").textContent = t.income;
  document.getElementById("expenseLabel").textContent = t.expense;
  document.getElementById("balanceLabel").textContent = t.balance;
  document.getElementById("countLabel").textContent = t.count;
  document.getElementById("addTitle").textContent = t.addTitle;
  document.getElementById("typeLabel").textContent = t.type;
  document.getElementById("amountLabel").textContent = t.amount;
  document.getElementById("senderLabel").textContent = t.sender;
  document.getElementById("noteLabel").textContent = t.note;
  document.getElementById("addButton").textContent = t.add;
  document.getElementById("historyTitle").textContent = t.history;
  document.getElementById("clearButton").textContent = t.clear;
  document.getElementById("settingsTitle").textContent = t.settings;
  document.getElementById("settingsText").textContent = t.settingsText;
  document.getElementById("modeLabel").textContent = t.mode;
  document.getElementById("notifyLabel").textContent = t.notify;
  document.querySelector(".status").textContent = t.status;

  document.getElementById("type").options[0].text = t.receive;
  document.getElementById("type").options[1].text = t.pay;
  document.getElementById("accountMode").options[0].text = t.personal;
  document.getElementById("accountMode").options[1].text = t.business;

  document.getElementById("langBtn").textContent =
    language === "ar" ? "English" : "العربية";
}

document.getElementById("accountMode").value =
  localStorage.getItem("snm_mode") || "personal";

updateLanguage();
render();
    
