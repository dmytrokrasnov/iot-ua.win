document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("consultModal");

    if (!modal) return;

    document.querySelectorAll(".open-consultation").forEach(button => {

        button.addEventListener("click", () => {

            // Загальна консультація
            const serviceText = document.getElementById("selectedServiceText");
            const serviceInput = document.getElementById("serviceInput");

            if (serviceText) {
                serviceText.textContent = "Загальна консультація";
            }

            if (serviceInput) {
                serviceInput.value = "";
            }

            const message = document.getElementById("message");

            if (message) {
                message.value = "";
            }

            modal.classList.add("active");

            document.body.style.overflow = "hidden";

            setTimeout(() => {

                const name = document.getElementById("name");

                if (name) {

                    name.focus();

                }

            },250);

        });

    });

});