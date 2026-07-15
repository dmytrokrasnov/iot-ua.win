const IoTServiceView = {

    modal: null,
    panel: null,

    image: null,
    title: null,
    description: null,
    advantages: null,
    brands: null,

    currentService: null,

    init() {

        this.modal = document.getElementById("serviceView");
        this.panel = this.modal.querySelector(".service-view-panel");

        this.image = document.getElementById("serviceHeroImage");
        this.title = document.getElementById("serviceHeroTitle");
        this.description = document.getElementById("serviceHeroDescription");
        this.advantages = document.getElementById("serviceHeroAdvantages");
        this.brands = document.getElementById("serviceHeroBrands");

        // Закриття кнопкою
        document
            .getElementById("serviceClose")
            .addEventListener("click", () => this.close());

        // Закриття по кліку на фон
        this.modal.addEventListener("click", (e) => {

            if (e.target === this.modal) {

                this.close();

            }

        });

        // Закриття по ESC
        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape" && this.modal.classList.contains("active")) {

                this.close();

            }

        });

        // Клік по картках
        document.querySelectorAll(".service-card").forEach(card => {

            card.addEventListener("click", () => {

                this.open(card.dataset.service);

            });

        });

        // Кнопка консультації
        document
            .getElementById("serviceConsultBtn")
            .addEventListener("click", () => this.openConsultation());

    },

    open(serviceId) {

        const service = IoTData.services[serviceId];

        if (!service) {

            console.error("Послугу не знайдено:", serviceId);

            return;

        }

        this.currentService = service.title;

        this.render(service);

        // Завжди відкривати зверху
        this.panel.scrollTop = 0;

        document.body.classList.add("modal-open");
        document.body.style.overflow = "hidden";

        this.modal.classList.add("active");

    },

    close() {

        this.modal.classList.remove("active");

        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";

    },

    render(service) {

        this.image.src = service.image;
        this.image.alt = service.title;

        this.title.textContent = service.title;

        this.description.textContent = service.description;

        this.renderAdvantages(service);

        this.renderBrands(service);

    },

    renderAdvantages(service) {

        this.advantages.innerHTML = "";

        service.advantages.forEach(item => {

            this.advantages.insertAdjacentHTML(
                "beforeend",

                `
                <div class="service-feature">

                    <div class="service-feature-icon">

                        ✓

                    </div>

                    <span>${item}</span>

                </div>
                `

            );

        });

    },

    renderBrands(service) {

        this.brands.innerHTML = "";

        service.brands.forEach(brand => {

            this.brands.insertAdjacentHTML(
                "beforeend",

                `
                <img
                    src="assets/brands/${brand}.svg"
                    alt="${brand}"
                    title="${brand}">
                `

            );

        });

    },

openConsultation() {

    this.close();

    const serviceText = document.getElementById("selectedServiceText");
    const serviceInput = document.getElementById("serviceInput");
    const message = document.getElementById("message");

    if (serviceText) {
        serviceText.textContent = this.currentService;
    }

    if (serviceInput) {
        serviceInput.value = this.currentService;
    }

    if (message) {
        message.value = "Цікавить послуга: " + this.currentService + ".";
    }

    const modal = document.getElementById("consultModal");

    modal.classList.add("active");

    setTimeout(() => {
        document.getElementById("name").focus();
    }, 250);

}

};

document.addEventListener("DOMContentLoaded", () => {

    IoTServiceView.init();

});