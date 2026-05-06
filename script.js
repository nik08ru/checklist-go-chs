// ---------- 1. АДРЕСА ЗДАНИЙ (из вашего скриншота, 11 штук) ----------
const buildingAddresses = [
    "город Москва, район Краснопахорский, поселок Шишкин Лес, дом 33",
    "город Москва, район Краснопахорский, поселок Щапово, дом 21, строение 2",
    "город Москва, район Краснопахорский, село Красная Пахра, дом 24А",
    "город Москва, район Краснопахорский, село Красная Пахра, дом 23, строение 1",
    "город Москва, район Краснопахорский, село Былово, дом 1А",
    "город Москва, район Краснопахорский, село Красная Пахра, дом 23",
    "город Москва, район Краснопахорский, поселок Шишкин Лес, дом 28",
    "город Москва, район Краснопахорский, поселок Курилово, улица Школьная, дом 3",
    "город Москва, район Краснопахорский, поселок Курилово, улица Центральная, дом 8",
    "город Москва, район Краснопахорский, поселок Щапово, дом 21",
    "город Москва, район Краснопахорский, поселок Щапово, дом 20, строение 1"
];

// ---------- 2. ПУНКТЫ ПРОВЕРКИ И НОРМАТИВЫ (из вашего Excel) ----------
const checklistItems = [
    { name: "Отсутствие приказа «Об организации и ведении гражданской обороны в образовательных организациях»", normative: "постановление Правительства РФ от 26.11.2007 № 804" },
    { name: "Отсутствие приказа о назначении уполномоченного на решение задач в области ГО в ОО", normative: "Постановление Правительства РФ от 10.07.1999 № 782" },
    { name: "Отсутствие Положения об объектовом звене Московской городской территориальной подсистемы РСЧС ОО", normative: "п. 5 Положения о РСЧС, утв. постановлением Правительства РФ от 30.12.2003 № 794" },
    { name: "Отсутствие приказа об организации подготовки работников ОО по гражданской обороне и защите от ЧС", normative: "постановления № 841 от 02.11.2000; № 1485 от 18.09.2020" },
    { name: "Отсутствие плана действий по предупреждению и ликвидации ЧС природного и техногенного характера", normative: "постановление Правительства Москвы от 24.02.2009 № 124-ПП" },
    { name: "Отсутствие плана основных мероприятий по ГО и ЧС на текущий год", normative: "п. 4 Положения, утв. приказом МЧС России от 14.11.2008 № 687" },
    { name: "Отсутствие плана проведения тренировок по ГО и ЧС, отчетных документов о проведенных тренировках", normative: "Методические рекомендации МЧС России от 27.08.2021" },
    { name: "Отсутствие плана развития и совершенствования учебно-материальной базы по курсу «Основы безопасности и защиты Родины»", normative: "письмо МЧС России от 27.02.2020 № 11-7-604" },
    { name: "Не проведены вводный инструктаж по ГО и периодические инструктажи по ЧС, не ведутся журналы учета проведения инструктажей", normative: "постановления № 841 и № 1485" },
    { name: "Отсутствие приказа об итогах подготовки по ГО и защиты от ЧС в 20__ и задачах на 20__ год", normative: "ст.14 ФЗ №68-ФЗ; постановление № 1485" },
    { name: "Отсутствие приказа «О Комиссии ОО по предупреждению и ликвидации чрезвычайных ситуаций и обеспечению пожарной безопасности», утверждающего Положение о КЧС и ПБ", normative: "п. 6,7 Положения о РСЧС, утв. постановлением № 794" },
    { name: "Отсутствие документации защитных сооружений гражданской обороны (ЗС ГО) (для ОО, имеющих на балансе ЗС ГО)", normative: "Приказ МЧС России от 15.12.2002 № 583" },
    { name: "Отсутствие Актов подключения и рабочей документации по сопряжению объектовой системы оповещения о ЧС с региональной системой оповещения населения г. Москвы", normative: "постановление Правительства Москвы от 01.12.2015 № 795-ПП" }
];

// ---------- 3. ГЕНЕРАЦИЯ ТАБЛИЦЫ ----------
function buildTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    checklistItems.forEach((item, idx) => {
        const row = tbody.insertRow();
        // Пункт проверки
        const cellName = row.insertCell(0);
        cellName.textContent = item.name;
        // Нормативное обоснование
        const cellNorm = row.insertCell(1);
        cellNorm.textContent = item.normative;
        cellNorm.style.fontSize = '0.8rem';
        cellNorm.style.color = '#4A5568';
        // Выполнение (Да/Нет)
        const cellStatus = row.insertCell(2);
        const select = document.createElement('select');
        select.setAttribute('data-idx', idx);
        select.setAttribute('required', 'required');
        select.innerHTML = `<option value="" disabled selected>– Выберите –</option>
                            <option value="Да">✅ Да</option>
                            <option value="Нет">❌ Нет</option>`;
        select.className = 'status-select';
        cellStatus.appendChild(select);
        // Срок устранения
        const cellDeadline = row.insertCell(3);
        const inputDeadline = document.createElement('input');
        inputDeadline.type = 'text';
        inputDeadline.placeholder = 'укажите срок (при "Нет")';
        inputDeadline.className = 'deadline-input';
        cellDeadline.appendChild(inputDeadline);
    });
}

// ---------- 4. ЗАПОЛНЕНИЕ СПИСКА АДРЕСОВ ----------
function populateAddresses() {
    const select = document.getElementById('buildingAddress');
    buildingAddresses.forEach(addr => {
        const option = new Option(addr, addr);
        select.appendChild(option);
    });
}

// ---------- 5. ВАЛИДАЦИЯ: все ли "Выполнение" выбраны? ----------
function isFormValid() {
    const selects = document.querySelectorAll('.status-select');
    for (let sel of selects) {
        if (!sel.value) return false;
    }
    return true;
}

// ---------- 6. СБОР ДАННЫХ ДЛЯ ОТПРАВКИ ----------
function collectFormData() {
    const address = document.getElementById('buildingAddress').value;
    const inspector = document.getElementById('inspectorName').value.trim();
    const generalComment = document.getElementById('generalComment').value.trim();
    const dateTime = new Date().toLocaleString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
    
    const rows = [];
    const selects = document.querySelectorAll('.status-select');
    const deadlines = document.querySelectorAll('.deadline-input');
    for (let i = 0; i < checklistItems.length; i++) {
        rows.push({
            question: checklistItems[i].name,
            status: selects[i].value,
            deadline: deadlines[i].value.trim()
        });
    }
    return { dateTime, address, inspector, generalComment, rows };
}

// ---------- 7. ОТПРАВКА В GOOGLE APPS SCRIPT ----------
const GOOGLE_SCRIPT_URL = 'ВАШ_URL_GOOGLE_APPS_SCRIPT';  // ЗАМЕНИТЕ ПОСЛЕ РАЗВЁРТЫВАНИЯ

async function sendData(payload) {
    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function showNotification(msg, type) {
    const n = document.getElementById('notification');
    n.textContent = msg;
    n.className = `toast-notification ${type}`;
    n.classList.remove('hidden');
    setTimeout(() => n.classList.add('hidden'), 5000);
}

// ---------- 8. ОБРАБОТЧИК ОТПРАВКИ ----------
document.getElementById('checklistForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!document.getElementById('buildingAddress').value) {
        showNotification('Выберите адрес здания!', 'error');
        return;
    }
    if (!isFormValid()) {
        showNotification('Пожалуйста, выберите "Да" или "Нет" для каждого пункта проверки!', 'error');
        return;
    }
    
    const data = collectFormData();
    
    const btn = document.getElementById('submitBtn');
    const front = btn.querySelector('.btn-front');
    const loader = btn.querySelector('.btn-loader');
    front.classList.add('hidden');
    loader.classList.remove('hidden');
    btn.disabled = true;
    
    const ok = await sendData(data);
    if (ok) {
        showNotification('✅ Чек-лист успешно отправлен! Данные добавлены в Google Таблицу.', 'success');
        // Очистка формы (не сбрасываем адрес и таблицу? Сбросим только необязательные поля и таблицу)
        document.getElementById('inspectorName').value = '';
        document.getElementById('generalComment').value = '';
        // Сбросить все селекты и поля сроков
        const selects = document.querySelectorAll('.status-select');
        const deadlines = document.querySelectorAll('.deadline-input');
        selects.forEach(sel => sel.value = '');
        deadlines.forEach(inp => inp.value = '');
    } else {
        showNotification('❌ Ошибка отправки. Проверьте интернет и URL скрипта.', 'error');
    }
    
    front.classList.remove('hidden');
    loader.classList.add('hidden');
    btn.disabled = false;
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    populateAddresses();
    buildTable();
});
