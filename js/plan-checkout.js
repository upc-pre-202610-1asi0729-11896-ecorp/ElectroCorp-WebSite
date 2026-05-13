const WEBAPP_REGISTER_URL = "https://electrocorp-webapp.onrender.com/iam/register";

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("checkout-modal");
    const form = document.getElementById("landing-checkout-form");
    const planNameText = document.getElementById("checkout-plan-name");
    const planPriceText = document.getElementById("checkout-plan-price");

    const holderInput = document.getElementById("checkout-holder");
    const cardInput = document.getElementById("checkout-card");
    const expirationInput = document.getElementById("checkout-expiration");
    const cvvInput = document.getElementById("checkout-cvv");

    if (
        !modal ||
        !form ||
        !planNameText ||
        !planPriceText ||
        !holderInput ||
        !cardInput ||
        !expirationInput ||
        !cvvInput
    ) {
        return;
    }

    let selectedPlan = {
        code: "PROFESSIONAL",
        name: "Professional Plan",
        price: "49.00",
    };

    document.querySelectorAll(".plan-select-btn").forEach((button) => {
        button.addEventListener("click", () => {
            selectedPlan = {
                code: button.dataset.planCode || "PROFESSIONAL",
                name: button.dataset.planName || "Professional Plan",
                price: button.dataset.planPrice || "49.00",
            };

            planNameText.textContent = selectedPlan.name;
            planPriceText.textContent = selectedPlan.price;

            modal.classList.add("open");
            modal.setAttribute("aria-hidden", "false");

            setTimeout(() => holderInput.focus(), 100);
        });
    });

    document.querySelectorAll("[data-close-checkout]").forEach((element) => {
        element.addEventListener("click", closeCheckout);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("open")) {
            closeCheckout();
        }
    });

    cardInput.addEventListener("input", () => {
        const cleanValue = cardInput.value.replace(/\D/g, "").slice(0, 16);
        cardInput.value = cleanValue.replace(/(.{4})/g, "$1 ").trim();
    });

    expirationInput.addEventListener("input", () => {
        expirationInput.value = formatExpirationDate(expirationInput.value);
    });

    cvvInput.addEventListener("input", () => {
        cvvInput.value = cvvInput.value.replace(/\D/g, "").slice(0, 3);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const holderName = holderInput.value.trim();
        const cardDigits = cardInput.value.replace(/\D/g, "");
        const expiration = expirationInput.value.trim();
        const cvv = cvvInput.value.trim();
        const lastFourDigits = cardDigits.slice(-4);

        if (holderName.length < 3) {
            alert("Ingresa el nombre del titular de la tarjeta.");
            return;
        }

        if (cardDigits.length < 12) {
            alert("Ingresa un número de tarjeta válido para la simulación.");
            return;
        }

        if (!isValidExpirationDate(expiration)) {
            alert("Ingresa una fecha válida en formato MM/YY. El mes debe estar entre 01 y 12, y el año debe ser 26 o mayor. Ejemplo: 01/26.");
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            alert("El CVV debe tener exactamente 3 números.");
            return;
        }

        const queryParams = new URLSearchParams({
            planCode: selectedPlan.code,
            planName: selectedPlan.name,
            planPrice: selectedPlan.price,
            source: "landing",
            paymentCollected: "true",
            holderName,
            cardLastFourDigits: lastFourDigits,
        });

        window.location.href = `${WEBAPP_REGISTER_URL}?${queryParams.toString()}`;
    });

    function closeCheckout() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
    }

    function formatExpirationDate(value) {
        let digits = value.replace(/\D/g, "").slice(0, 4);

        if (digits.length === 0) {
            return "";
        }

        if (digits.length === 1 && Number(digits[0]) > 1) {
            digits = `0${digits[0]}`;
        }

        if (digits.length >= 2) {
            let month = Number(digits.slice(0, 2));

            if (month === 0) {
                digits = `01${digits.slice(2)}`;
            }

            if (month > 12) {
                digits = `12${digits.slice(2)}`;
            }
        }

        if (digits.length >= 3) {
            return `${digits.slice(0, 2)}/${digits.slice(2)}`;
        }

        return digits;
    }

    function isValidExpirationDate(value) {
        if (!/^\d{2}\/\d{2}$/.test(value)) {
            return false;
        }

        const [monthText, yearText] = value.split("/");
        const month = Number(monthText);
        const year = Number(yearText);

        if (month < 1 || month > 12) {
            return false;
        }

        return year >= 26;
    }
});