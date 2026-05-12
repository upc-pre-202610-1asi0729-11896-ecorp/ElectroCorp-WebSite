/* Traducciones ES/EN y toggle de idioma (expuesto para onclick en header) */
const translations = {
    es: {
        plans_kicker: "Facturación",
plans_title: "Planes de ElectroCorp",
plans_subtitle: "Elige un plan, completa una validación de tarjeta simulada y continúa hacia la WebApp con tu plan seleccionado.",

starter_plan_name: "Plan Starter",
starter_plan_desc: "Gestión básica de energía para hogares pequeños.",
starter_plan_li1: "Hasta 5 dispositivos inteligentes",
starter_plan_li2: "Panel energético básico",
starter_plan_li3: "Alertas por correo",

professional_plan_name: "Plan Professional",
professional_plan_desc: "Control avanzado para hogares y pequeños negocios.",
professional_plan_li1: "Hasta 20 dispositivos inteligentes",
professional_plan_li2: "Analítica energética avanzada",
professional_plan_li3: "Rutinas de automatización",
professional_plan_li4: "Reportes mensuales",

enterprise_plan_name: "Plan Enterprise",
enterprise_plan_desc: "Plataforma completa para múltiples locales o empresas.",
enterprise_plan_li1: "Múltiples locales comerciales",
enterprise_plan_li2: "Perfiles de acceso para el equipo",
enterprise_plan_li3: "Alertas avanzadas",
enterprise_plan_li4: "Soporte prioritario",

plan_month: "/ mes",
plan_recommended: "Recomendado",
btn_choose_plan: "Elegir plan",

checkout_kicker: "Pago simulado",
checkout_title: "Completa la activación de tu plan",
checkout_selected_plan: "Plan seleccionado",
checkout_holder: "Titular de la tarjeta",
checkout_card_number: "Número de tarjeta",
checkout_expiration: "Vencimiento",
checkout_cvv: "CVV",
checkout_note: "Pago simulado académico. El número completo de tarjeta y el CVV no se envían a la WebApp.",
checkout_continue: "Continuar al registro"
    },
    en: {
        plans_kicker: "Billing",
plans_title: "ElectroCorp Plans",
plans_subtitle: "Choose a plan, complete a simulated card validation, and continue to the WebApp with your plan selected.",

starter_plan_name: "Starter Plan",
starter_plan_desc: "Basic energy management for small homes.",
starter_plan_li1: "Up to 5 smart devices",
starter_plan_li2: "Basic energy dashboard",
starter_plan_li3: "Email alerts",

professional_plan_name: "Professional Plan",
professional_plan_desc: "Advanced control for homes and small businesses.",
professional_plan_li1: "Up to 20 smart devices",
professional_plan_li2: "Advanced energy analytics",
professional_plan_li3: "Automation routines",
professional_plan_li4: "Monthly reports",

enterprise_plan_name: "Enterprise Plan",
enterprise_plan_desc: "Complete platform for companies or multiple locations.",
enterprise_plan_li1: "Multiple business locations",
enterprise_plan_li2: "Team access profiles",
enterprise_plan_li3: "Advanced alerts",
enterprise_plan_li4: "Priority support",

plan_month: "/ month",
plan_recommended: "Recommended",
btn_choose_plan: "Choose plan",

checkout_kicker: "Simulated checkout",
checkout_title: "Complete your plan activation",
checkout_selected_plan: "Selected plan",
checkout_holder: "Card holder",
checkout_card_number: "Card number",
checkout_expiration: "Expiration",
checkout_cvv: "CVV",
checkout_note: "Academic simulated payment. The full card number and CVV are not sent to the WebApp.",
checkout_continue: "Continue to register"
    }
};

let currentLanguage = "en";

function applyTranslations(lang) {
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            if (element.innerHTML.includes('<i class="fa')) {
                const icon = element.querySelector("i").outerHTML;
                element.innerHTML = `${icon} ${translations[lang][key]}`;
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
        const key = element.getAttribute("data-i18n-aria");
        if (key && translations[lang] && translations[lang][key]) {
            element.setAttribute("aria-label", translations[lang][key]);
        }
    });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.placeholder = lang === "en" ? "Search keyword or question" : "Buscar palabra clave o pregunta";
    }

    const langText = document.getElementById("lang-text");
    if (langText) {
        langText.innerText = lang === "en" ? "ES" : "EN";
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === "en" ? "es" : "en";
    applyTranslations(currentLanguage);
}
