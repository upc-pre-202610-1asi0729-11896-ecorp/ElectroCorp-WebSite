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
        const cleanValue = expirationInput.value.replace(/\D/g, "").slice(0, 4);

        if (cleanValue.length >= 3) {
            expirationInput.value = `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`;
            return;
        }

        expirationInput.value = cleanValue;
    });

    cvvInput.addEventListener("input", () => {
        cvvInput.value = cvvInput.value.replace(/\D/g, "").slice(0, 4);
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

        if (!/^\d{2}\/\d{2}$/.test(expiration)) {
            alert("Ingresa una fecha de vencimiento válida. Ejemplo: 12/29.");
            return;
        }

        if (cvv.length < 3) {
            alert("Ingresa un CVV válido para la simulación.");
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
});