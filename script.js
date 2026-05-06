// --- Адреса зданий (строго из вашего промта) ---
const buildingAddresses = [
    "г. Москва, р-н Краснопахорский, с. Красная Пахра, д. 23",
    "г. Москва, р-н Краснопахорский, п. Шишкин Лес, д. 28",
    "г. Москва, р-н Краснопахорский, п. Курилово, ул. Школьная, д. 3",
    "г. Москва, р-н Краснопахорский, п. Курилово, ул. Центральная, д. 8",
    "г. Москва, р-н Краснопахорский, п. Щапово, д. 21, стр. 1",
    "г. Москва, р-н Краснопахорский, с. Красная Пахра, д. 24А",
    "г. Москва, р-н Краснопахорский, п. Шишкин Лес, д. 33",
    "г. Москва, р-н Краснопахорский, с. Былово, д. 1А",
    "г. Москва, р-н Краснопахорский, п. Щапово, д. 20, стр. 1"
];

// --- Пункты проверки и нормативные обоснования (из вашего Excel-файла, столбцы B и C) ---
const checklistItems = [
    { name: "Отсутствие приказа «Об организации и ведении гражданской обороны в образовательных организациях»", normative: "постановление Правительства Российской Федерации от 26.11.2007 № 804 «Об утверждении Положения о гражданской обороне в Российской Федерации»" },
    { name: "Отсутствие приказа о назначении уполномоченного на решение задач в области ГО в ОО", normative: "Постановление Правительства Российской Федерации от 10.07.1999 № 782 «О создании (назначении) в организациях структурных подразделений (работников), специально уполномоченных на решение задач в области гражданской обороны»" },
    { name: "Отсутствие Положения об объектовом звене Московской городской территориальной подсистемы Единой государственной системы предупреждения и ликвидации чрезвычайных ситуаций (РСЧС) ОО", normative: "п. 5 Положения о единой государственной системе предупреждения и ликвидации чрезвычайных ситуаций, утвержденного постановлением Правительства Российской Федерации от 30.12.2003 № 794" },
    { name: "Отсутствие приказа об организации подготовки работников ОО по гражданской обороне и защите от чрезвычайных ситуаций (ГО и ЧС) природного и техногенного характера", normative: "постановление Правительства Российской Федерации от 02.11.2000 № 841; постановление Правительства Российской Федерации от 18.09.2020 № 1485" },
    { name: "Отсутствие плана действий по предупреждению и ликвидации ЧС природного и техногенного характера", normative: "постановление Правительства Москвы от 24.02.2009 № 124-ПП «Об организации планирования действий по предупреждению и ликвидации чрезвычайных ситуаций»" },
    { name: "Отсутствие плана основных мероприятий по ГО и ЧС на текущий год", normative: "п. 4 Положения об организации и ведении ГО в муниципальных образованиях и организациях, утвержденного приказом МЧС России от 14.11.2008 № 687" },
    { name: "Отсутствие плана проведения тренировок по ГО и ЧС, отчетных документов о проведенных тренировках", normative: "Методические рекомендации по подготовке и проведению учений и тренировок по гражданской обороне (МЧС России 27.08.2021)" },
    { name: "Отсутствие плана развития и совершенствования учебно-материальной базы по курсу «Основы безопасности и защиты Родины»", normative: "письмо МЧС России от 27.02.2020 № 11-7-604 «О примерном порядке определения состава учебно-материальной базы для подготовки населения в области гражданской обороны и защиты от чрезвычайных ситуаций»" },
    { name: "Не проведены вводный инструктаж по ГО и периодические инструктажи по ЧС, не ведутся журналы учета проведения инструктажей", normative: "постановление Правительства Российской Федерации от 02.11.2000 № 841; постановление Правительства Российской Федерации от 18.09.2020 № 1485" },
    { name: "Отсутствие приказа об итогах подготовки по ГО и защиты от ЧС в 20__ и задачах на 20__ год", normative: "п. «в» статьи 14 Федерального закона № 68-ФЗ; п.п. «а», «в» п. 2, п.п. «а», «в» п. 4, п. 7-12 Положения о подготовке граждан... (постановление № 1485)" },
    { name: "Отсутствие приказа «О Комиссии ОО по предупреждению и ликвидации чрезвычайных ситуаций и обеспечению пожарной безопасности», утверждающего Положение о КЧС и ПБ", normative: "п. 6, 7 Положения о единой государственной системе предупреждения и ликвидации чрезвычайных ситуаций, утвержденного постановлением Правительства Российской Федерации от 30.12.2003 № 794" },
    { name: "Отсутствие документации защитных сооружений гражданской обороны (ЗС ГО) (для ОО, имеющих на балансе ЗС ГО)", normative: "Приказ МЧС России от 15.12.2002 № 583 «Об утверждении и введении в действие Правил эксплуатации защитных сооружений гражданской обороны»" },
    { name: "Отсутствие Актов подключения и рабочей документации по сопряжению объектовой системы оповещения о чрезвычайных ситуациях с региональной системой оповещения населения города Москвы по основному и резервному каналам связи", normative: "постановление Правительства Москвы от 01.12.2015 № 795-ПП «Об организации оповещения города Москвы о чрезвычайных ситуациях»" }
];

// Заполнение адресов
function populateAddresses() {
    const select = document.getElementById('buildingAddress');
    buildingAddresses.forEach(addr => {
        const option = new Option(addr, addr);
        select.appendChild(option);
    });
}

// Заполнение пунктов проверки и обработчик для подстановки норматива
function populateCheckpoints() {
    const select = document.getElementById('checkpoint');
    checklistItems.forEach(item => {
        const option = new Option(item.name, item.name);
        option.dataset.normative = item.normative;
        select.appendChild(option);
    });
    select.addEventListener('change', (e) => {
        const selected = e.target.selectedOptions[0];
        const normative = selected ? selected.dataset.normative : '';
        document.getElementById('normativeBase').value = normative;
    });
}

// ------ ЗАМЕНИТЕ ЭТУ ССЫЛКУ ПОСЛЕ РАЗВЁРТЫВАНИЯ APPS SCRIPT ------
const GOOGLE_SCRIPT_URL = 'ВАШ_URL_GOOGLE_APPS_SCRIPT';

async function sendToSheet(payload) {
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

document.getElementById('checklistForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const address = document.getElementById('buildingAddress').value;
    const checkpoint = document.getElementById('checkpoint').value;
    if (!address || !checkpoint) {
        showNotification('Заполните обязательные поля: Адрес здания и Пункт проверки', 'error');
        return;
    }
    const inspector = document.getElementById('inspectorName').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const normative = document.getElementById('normativeBase').value;
    const now = new Date();
    const dateTime = now.toLocaleString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });

    const payload = {
        dateTime, buildingAddress: address, checkpoint,
        normativeBase: normative, inspectorName: inspector, comment,
        отметка: "", подпись: ""   // пустые поля для печатного чек-листа
    };

    const btn = document.getElementById('submitBtn');
    const front = btn.querySelector('.btn-front');
    const loader = btn.querySelector('.btn-loader');
    front.classList.add('hidden');
    loader.classList.remove('hidden');
    btn.disabled = true;

    const ok = await sendToSheet(payload);
    if (ok) {
        showNotification('✅ Чек-лист отправлен! Данные добавлены в Google Таблицу.', 'success');
        document.getElementById('inspectorName').value = '';
        document.getElementById('comment').value = '';
        // (адрес и пункт остаются, чтобы быстро заполнить следующий)
    } else {
        showNotification('❌ Ошибка отправки. Проверьте интернет и URL скрипта.', 'error');
    }

    front.classList.remove('hidden');
    loader.classList.add('hidden');
    btn.disabled = false;
});

document.addEventListener('DOMContentLoaded', () => {
    populateAddresses();
    populateCheckpoints();
});
